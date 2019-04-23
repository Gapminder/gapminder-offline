(function () {
  const doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
  const pngScale = 5;
  const prefix = {
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xlink: 'http://www.w3.org/1999/xlink',
    svg: 'http://www.w3.org/2000/svg'
  };

  let emptySvg;
  let svgSelect;
  let excludeSelect;

  const setFontForContainer = fontFamily => {
    document.getElementsByClassName('vzb-tool')[0].style.setProperty('font-family', fontFamily, 'important');

    const event = document.createEvent('HTMLEvents');

    event.initEvent('resize', true, true);
    event.eventName = 'resize';
    event.force = true;
    window.dispatchEvent(event);
  };

  const initialize = () => {
    setFontForContainer('Lucida Sans Unicode');

    const documents = [window.document];
    const SVGSources = [];
    const iframes = document.querySelectorAll('iframe');
    const objects = document.querySelectorAll('object');
    const script = document.querySelectorAll('.svg-crowbar');

    svgSelect = script[0].getAttribute('data-svg-select') || 'svg';
    excludeSelect = script[0].getAttribute('data-exclude-element-select');
    // add empty svg element
    emptySvg = window.document.createElementNS(prefix.svg, 'svg');
    window.document.body.appendChild(emptySvg);

    const emptySvgDeclarationComputed = getComputedStyle(emptySvg);

    [].forEach.call(iframes, el => {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch (err) {
        console.log(err);
      }
    });

    [].forEach.call(objects, el => {
      try {
        if (el.contentDocument) {
          documents.push(el.contentDocument);
        }
      } catch (err) {
        console.log(err)
      }
    });

    documents.forEach(doc => {
      const newSources = getSources(doc, emptySvgDeclarationComputed);
      // because of prototype on NYT pages
      for (const newSource of newSources) {
        SVGSources.push(newSource);
      }
    });

    if (SVGSources.length > 0) {
      download(SVGSources[0], script[0].getAttribute('transform'));
    } else {
      console.warn('Couldn’t find any SVG nodes for download.');

      setFontForContainer('Bariol Regular');
      cleanup();
    }
  };

  const cleanup = () => {
    const crowbarElements = document.querySelectorAll('.svg-crowbar');

    [].forEach.call(crowbarElements, el => {
      el.parentNode.removeChild(el);
    });

    emptySvg.parentNode.removeChild(emptySvg);
  };

  const getSources = (doc, emptySvgDeclarationComputed) => {
    const sources = [];
    const svgs = doc.querySelectorAll(svgSelect);
    const offset = 30;

    let width = 0;
    let height = 0;

    let parentClass;

    if (svgs.length > 0) {
      parentClass = svgs[0].parentNode.getAttribute('class');
    }

    [].forEach.call(svgs, svgSource => {
      const svg = svgSource.cloneNode(true);

      svgSource.parentNode.appendChild(svg);

      const excludeElements = svg.querySelectorAll(excludeSelect);

      [].forEach.call(excludeElements, el => {
        el.parentNode.removeChild(el);
      });

      svg.setAttribute('version', '1.1');

      // removing attributes so they aren't doubled up
      svg.removeAttribute('xmlns');
      svg.removeAttribute('xlink');

      // These are needed for the svg
      if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns')) {
        svg.setAttributeNS(prefix.xmlns, 'xmlns', prefix.svg);
      }

      if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns:xlink')) {
        svg.setAttributeNS(prefix.xmlns, 'xmlns:xlink', prefix.xlink);
      }

      setInlineStyles(svg, emptySvgDeclarationComputed);

      const source = (new XMLSerializer()).serializeToString(svg);

      sources.push(source);

      const rect = svg.getBoundingClientRect();

      if (width < rect.width) {
        width = rect.width;
      }

      if (height < rect.height) {
        height = rect.height;
      }

      svgSource.parentNode.removeChild(svg);
    });

    width += offset;
    height += offset;

    return [{
      class: parentClass,
      source: [`${doctype}<svg width="${width}" height="${height}">${sources.join('')}</svg>`]
    }];
  };

  const download = (source, transform) => {
    let filename = 'untitled';

    if (source.id) {
      filename = source.id;
    } else if (source.class) {
      filename = source.class;
    } else if (window.document.title) {
      filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    }

    const dateNow = new Date();
    const y = dateNow.getFullYear();
    const m = ('0' + (dateNow.getMonth() + 1)).slice(-2);
    const d = ('0' + dateNow.getDate()).slice(-2);
    const hh = ('0' + dateNow.getHours()).slice(-2);
    const mm = ('0' + dateNow.getMinutes()).slice(-2);
    const ss = ('0' + dateNow.getSeconds()).slice(-2);
    const dateString = `${y}${m}${d}-${hh}${mm}${ss}`;

    filename = `${dateString}-${filename.match(/-(\S+)/)[1] || filename}`;

    if (transform === 'png') {
      downloadPng(source, filename);
    } else if (transform === 'export') {
      doExport(source);
    } else {
      downloadDefault(source, filename);
    }
  };

  const downloadDefault = (source, filename) => {
    const fs = require('fs');
    const path = require('path');
    const {dialog} = require('electron').remote;

    const svgContent = source.source.join();
    const svgPos = svgContent.indexOf('<svg');
    const normalizedSvg = svgContent.substr(svgPos).replace(/<svg/, '<svg xmlns="' + prefix.svg + '" ');

    setFontForContainer('Bariol Regular');
    cleanup();

    dialog.showSaveDialog({
      title: 'Save charts as ...',
      defaultPath: path.resolve(require('os').homedir(), filename + '.svg'),
      filters: [{name: 'SVG image', extensions: ['svg']}]
    }, fullPath => {
      if (!fullPath) {
        return;
      }

      fs.writeFileSync(fullPath, normalizedSvg);
    });
  };

  const downloadPng = (source, filename) => {
    const fs = require('fs');
    const path = require('path');
    const {dialog} = require('electron').remote;
    const loader = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const go = () => {
      context.drawImage(loader, 0, 0, loader.width, loader.height);

      canvas.toBlob(blob => {
        const reader = new FileReader();

        reader.addEventListener('loadend', () => {
          dialog.showSaveDialog({
            title: 'Save charts as ...',
            defaultPath: path.resolve(require('os').homedir(), filename + '.png'),
            filters: [{name: 'PNG image', extensions: ['png']}]
          }, fullPath => {
            if (!fullPath) {
              return;
            }

            fs.writeFileSync(fullPath, new Buffer(reader.result));
          });
        });

        reader.readAsArrayBuffer(blob);
      });
    };

    const svgContent = source.source.join();

    setFontForContainer('Bariol Regular');
    cleanup();

    const svgPos = svgContent.indexOf('<svg');
    const justSvg = svgContent.substr(svgPos);
    const headerRegexp = /<svg\s+width="(\d+)"\s+height="(\d+)"/;
    const match = headerRegexp.exec(justSvg);
    const width = match[1] * pngScale;
    const height = match[2] * pngScale;
    const normalizedSvg = justSvg.replace(/<svg/, '<svg xmlns="' + prefix.svg + '" ');
    const imgSrc = 'data:image/svg+xml;base64,' + Buffer.from(normalizedSvg).toString('base64');

    loader.width = canvas.width = width;
    loader.height = canvas.height = height;
    loader.onload = go;
    loader.src = imgSrc;
  };

  const doExport = (source) => {
    const loader = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const go = () => {
      context.drawImage(loader, 0, 0, loader.width, actualHeight, 0, 0, canvas.width, actualHeight);
      canvas.toBlob(blob => {
        const reader = new FileReader();

        reader.addEventListener('loadend', () => {
          window.__tmpImage = window.btoa(reader.result);
        });

        reader.readAsBinaryString(blob);
      });
    };

    const svgContent = source.source.join();

    setFontForContainer('Bariol Regular');
    cleanup();

    const svgPos = svgContent.indexOf('<svg');
    const justSvg = svgContent.substr(svgPos);
    const headerRegexp = /<svg\s+width="(\d+)"\s+height="(\d+)"/;
    const match = headerRegexp.exec(justSvg);
    const width = match[1];
    const height = match[2];
    const normalizedSvg = justSvg.replace(/<svg/, '<svg xmlns="' + prefix.svg + '" ');
    const imgSrc = 'data:image/svg+xml;base64,' + Buffer.from(normalizedSvg).toString('base64');
    const actualHeight = width / height < 1.3 ? width / 1.3 : height;

    loader.width = canvas.width = width;
    loader.height = canvas.height = actualHeight;
    loader.onload = go;
    loader.src = imgSrc;
  };

  const setInlineStyles = (svg, emptySvgDeclarationComputed) => {

    const explicitlySetStyle = element => {
      const cSSStyleDeclarationComputed = getComputedStyle(element);

      let i, len, key, value;
      let computedStyleStr = '';

      if (cSSStyleDeclarationComputed['display'] === 'none') {
        return false;
      }

      if (cSSStyleDeclarationComputed['visibility'] === 'hidden') {
        return false;
      }

      if (cSSStyleDeclarationComputed['opacity'] === '0') {
        return false;
      }

      for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
        key = cSSStyleDeclarationComputed[i];
        value = cSSStyleDeclarationComputed.getPropertyValue(key);

        if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
          computedStyleStr += `${key}:${value};`;
        }
      }

      const width = element.getAttribute('width');

      if (width || width === 0) {
        if (cSSStyleDeclarationComputed['width'] === 'auto') {
          computedStyleStr += 'width:' + width + (isNaN(+width) ? '' : 'px') + ';';
        }
      }
      const height = element.getAttribute('height');

      if (height || height === 0) {
        if (cSSStyleDeclarationComputed['height'] === 'auto') {
          computedStyleStr += 'height:' + height + (isNaN(+height) ? '' : 'px') + ';';
        }
      }

      element.setAttribute('style', computedStyleStr);

      return true;
    };

    const traverse = obj => {
      const tree = [];

      const visit = node => {
        if (node && node.hasChildNodes()) {
          let child = node.firstChild;

          while (child) {
            if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
              tree.push(child);
              visit(child);
            }

            child = child.nextSibling;
          }
        }
      };

      tree.push(obj);
      visit(obj);

      return tree;
    };

    // hardcode computed css styles inside svg
    const allElements = traverse(svg);

    let i = allElements.length;

    while (i--) {
      if (!explicitlySetStyle(allElements[i])) {
        allElements[i].parentNode.removeChild(allElements[i]);
      }
    }
  };

  initialize();
})();
