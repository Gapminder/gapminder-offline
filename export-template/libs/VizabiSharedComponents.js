// https://github.com/vizabi/@vizabi/shared-components#readme v1.19.1 build 1635434611877 Copyright 2021 Gapminder Foundation and contributors
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx')) :
  typeof define === 'function' && define.amd ? define(['exports', 'mobx'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VizabiSharedComponents = {}, global.mobx));
}(this, (function (exports, mobx) { 'use strict';

  // source https://github.com/encharm/Font-Awesome-SVG-PNG/tree/master/black/svg

  const ICON_PAINTBRUSH =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1615 0q70 0 122.5 46.5t52.5 116.5q0 63-45 151-332 629-465 752-97 91-218 91-126 0-216.5-92.5t-90.5-219.5q0-128 92-212l638-579q59-54 130-54zm-909 1034q39 76 106.5 130t150.5 76l1 71q4 213-129.5 347t-348.5 134q-123 0-218-46.5t-152.5-127.5-86.5-183-29-220q7 5 41 30t62 44.5 59 36.5 46 17q41 0 55-37 25-66 57.5-112.5t69.5-76 88-47.5 103-25.5 125-10.5z"/></svg>';
  const ICON_SEARCH =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>';
  const ICON_CIRCLE =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1664 896q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>';
  const ICON_EXPAND =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M883 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z"/></svg>';
  const ICON_ASTERISK =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1546 1050q46 26 59.5 77.5t-12.5 97.5l-64 110q-26 46-77.5 59.5t-97.5-12.5l-266-153v307q0 52-38 90t-90 38h-128q-52 0-90-38t-38-90v-307l-266 153q-46 26-97.5 12.5t-77.5-59.5l-64-110q-26-46-12.5-97.5t59.5-77.5l266-154-266-154q-46-26-59.5-77.5t12.5-97.5l64-110q26-46 77.5-59.5t97.5 12.5l266 153v-307q0-52 38-90t90-38h128q52 0 90 38t38 90v307l266-153q46-26 97.5-12.5t77.5 59.5l64 110q26 46 12.5 97.5t-59.5 77.5l-266 154z"/></svg>';
  const ICON_TRAILS =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M 1381.375 17.1875 C 1375.7825 17.176804 1370.1216 17.316078 1364.4375 17.5625 C 1273.4913 21.505489 1197.0982 57.199956 1135.2188 124.6875 C 1076.5961 188.62338 1047.6964 263.96059 1048.5312 350.65625 L 835.71875 433 C 797.77288 391.67699 749.96961 361.96416 692.3125 343.84375 C 604.96227 316.39162 520.95691 323.70366 440.25 365.8125 C 359.5432 407.92133 305.45225 472.64985 278 560 C 250.54783 647.35004 257.89117 731.38694 300 812.09375 C 342.10886 892.80075 406.83755 946.89147 494.1875 974.34375 C 576.9404 1000.3512 657.38873 994.58645 735.5625 957.09375 L 959.28125 1171.4375 L 972.375 1184.4062 C 966.2931 1198.3454 961.94845 1209.2226 959.34375 1217.0625 C 956.73915 1224.9024 953.7186 1236.224 950.25 1251.0312 L 711.03125 1285.1875 C 669.59175 1209.0324 607.72526 1157.2863 525.40625 1129.9375 C 438.51381 1101.0693 354.34933 1107.021 272.96875 1147.8125 C 191.58796 1188.6039 136.49335 1252.4513 107.625 1339.3438 C 78.756758 1426.2362 84.708528 1510.3694 125.5 1591.75 C 166.29138 1673.1307 230.1387 1728.2567 317.03125 1757.125 C 403.92369 1785.9933 488.05682 1780.0415 569.4375 1739.25 C 650.81799 1698.4587 705.94425 1634.6111 734.8125 1547.7188 C 737.41718 1539.8788 740.43763 1528.5573 743.90625 1513.75 L 983.125 1479.5938 C 1024.5644 1555.7487 1086.4309 1607.4948 1168.75 1634.8438 C 1255.6425 1663.7119 1339.8069 1657.7603 1421.1875 1616.9688 C 1502.5682 1576.1772 1557.6631 1512.3299 1586.5312 1425.4375 C 1615.3996 1338.5451 1609.4477 1254.4119 1568.6562 1173.0312 C 1527.8647 1091.6506 1464.0174 1036.5244 1377.125 1007.6562 C 1294.9259 980.34721 1214.5066 984.74084 1135.8438 1020.8125 L 1120.2812 1005.9062 L 898.0625 785.96875 C 902.79653 774.40321 906.33847 765.03422 908.5 758.15625 C 920.42249 720.22 925.7916 682.90194 924.59375 646.21875 L 1130.9688 566.34375 C 1141.2015 577.59424 1149.3796 586.0106 1155.4688 591.59375 C 1222.9566 653.47326 1302.1474 682.44278 1393.0938 678.5 C 1484.04 674.55731 1560.4642 638.83151 1622.3438 571.34375 C 1684.2232 503.85591 1713.1929 424.6337 1709.25 333.6875 C 1705.3072 242.74139 1669.5816 166.34819 1602.0938 104.46875 C 1538.8238 46.456824 1465.2625 17.347946 1381.375 17.1875 z "/></svg>';
  const ICON_LOCK =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"/></svg>';
  const ICON_UNLOCK =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"/></svg>';
  const ICON_UNEXPAND =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z"/></svg>';
  const ICON_AXES =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path d="M430.25,379.655l-75.982-43.869v59.771H120.73V151.966h59.774l-43.869-75.983L92.767,0L48.898,75.983L5.029,151.966h59.775 v271.557c0,15.443,12.52,27.965,27.963,27.965h261.5v59.773l75.982-43.869l75.982-43.867L430.25,379.655z"/></svg>';
  const ICON_GEAR =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"/></svg>';
  const ICON_STACK =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.849 54.849"><g><path d="M54.497,39.614l-10.363-4.49l-14.917,5.968c-0.537,0.214-1.165,0.319-1.793,0.319c-0.627,0-1.254-0.104-1.79-0.318     l-14.921-5.968L0.351,39.614c-0.472,0.203-0.467,0.524,0.01,0.716L26.56,50.81c0.477,0.191,1.251,0.191,1.729,0L54.488,40.33     C54.964,40.139,54.969,39.817,54.497,39.614z"/><path d="M54.497,27.512l-10.364-4.491l-14.916,5.966c-0.536,0.215-1.165,0.321-1.792,0.321c-0.628,0-1.256-0.106-1.793-0.321     l-14.918-5.966L0.351,27.512c-0.472,0.203-0.467,0.523,0.01,0.716L26.56,38.706c0.477,0.19,1.251,0.19,1.729,0l26.199-10.479     C54.964,28.036,54.969,27.716,54.497,27.512z"/><path d="M0.361,16.125l13.662,5.465l12.537,5.015c0.477,0.191,1.251,0.191,1.729,0l12.541-5.016l13.658-5.463     c0.477-0.191,0.48-0.511,0.01-0.716L28.277,4.048c-0.471-0.204-1.236-0.204-1.708,0L0.351,15.41     C-0.121,15.614-0.116,15.935,0.361,16.125z"/></g></svg>';
  const ICON_DRAG =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M896 384q-53 0-90.5 37.5t-37.5 90.5v128h-32v-93q0-48-32-81.5t-80-33.5q-46 0-79 33t-33 79v429l-32-30v-172q0-48-32-81.5t-80-33.5q-46 0-79 33t-33 79v224q0 47 35 82l310 296q39 39 39 102 0 26 19 45t45 19h640q26 0 45-19t19-45v-25q0-41 10-77l108-436q10-36 10-77v-246q0-48-32-81.5t-80-33.5q-46 0-79 33t-33 79v32h-32v-125q0-40-25-72.5t-64-40.5q-14-2-23-2-46 0-79 33t-33 79v128h-32v-122q0-51-32.5-89.5t-82.5-43.5q-5-1-13-1zm0-128q84 0 149 50 57-34 123-34 59 0 111 27t86 76q27-7 59-7 100 0 170 71.5t70 171.5v246q0 51-13 108l-109 436q-6 24-6 71 0 80-56 136t-136 56h-640q-84 0-138-58.5t-54-142.5l-308-296q-76-73-76-175v-224q0-99 70.5-169.5t169.5-70.5q11 0 16 1 6-95 75.5-160t164.5-65q52 0 98 21 72-69 174-69z"/></svg>';
  const ICON_WARN =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.209 512.209"><path d="M507.345,439.683L288.084,37.688c-3.237-5.899-7.71-10.564-13.429-13.988c-5.705-3.427-11.893-5.142-18.554-5.142   s-12.85,1.718-18.558,5.142c-5.708,3.424-10.184,8.089-13.418,13.988L4.859,439.683c-6.663,11.998-6.473,23.989,0.57,35.98   c3.239,5.517,7.664,9.897,13.278,13.128c5.618,3.237,11.66,4.859,18.132,4.859h438.529c6.479,0,12.519-1.622,18.134-4.859   c5.62-3.23,10.038-7.611,13.278-13.128C513.823,463.665,514.015,451.681,507.345,439.683z M292.655,411.132   c0,2.662-0.91,4.897-2.71,6.704c-1.807,1.811-3.949,2.71-6.427,2.71h-54.816c-2.474,0-4.616-0.899-6.423-2.71   c-1.809-1.807-2.713-4.042-2.713-6.704v-54.248c0-2.662,0.905-4.897,2.713-6.704c1.807-1.811,3.946-2.71,6.423-2.71h54.812   c2.479,0,4.62,0.899,6.428,2.71c1.803,1.807,2.71,4.042,2.71,6.704v54.248H292.655z M292.088,304.357   c-0.198,1.902-1.198,3.47-3.001,4.709c-1.811,1.238-4.046,1.854-6.711,1.854h-52.82c-2.663,0-4.947-0.62-6.849-1.854   c-1.908-1.243-2.858-2.807-2.858-4.716l-4.853-130.47c0-2.667,0.953-4.665,2.856-5.996c2.474-2.093,4.758-3.14,6.854-3.14h62.809   c2.098,0,4.38,1.043,6.854,3.14c1.902,1.331,2.851,3.14,2.851,5.424L292.088,304.357z"/></svg>';
  const ICON_PIN =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M800 864v-448q0-14-9-23t-23-9-23 9-9 23v448q0 14 9 23t23 9 23-9 9-23zm672 352q0 26-19 45t-45 19h-429l-51 483q-2 12-10.5 20.5t-20.5 8.5h-1q-27 0-32-27l-76-485h-404q-26 0-45-19t-19-45q0-123 78.5-221.5t177.5-98.5v-512q-52 0-90-38t-38-90 38-90 90-38h640q52 0 90 38t38 90-38 90-90 38v512q99 0 177.5 98.5t78.5 221.5z"/></svg>';
  const ICON_QUESTION =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="17 17 483 483"> <circle stroke-width="40" cx="258.57" cy="258.57" r="220"/> <path d="M299.756,413.021v-61.78c0-3.003-0.966-5.472-2.896-7.401s-4.398-2.896-7.401-2.896h-61.78 c-3.003,0-5.47,0.965-7.4,2.896c-1.932,1.931-2.896,4.398-2.896,7.401v61.78c0,3.002,0.965,5.47,2.896,7.399 c1.931,1.931,4.396,2.896,7.4,2.896h61.779c3.003,0,5.472-0.967,7.401-2.896S299.756,416.021,299.756,413.021z"/> <path d="M382.128,196.789c0-18.877-5.952-36.36-17.856-52.449c-11.905-16.088-26.762-28.53-44.566-37.325 c-17.804-8.795-36.037-13.192-54.7-13.192c-52.127,0-91.919,22.845-119.377,68.537c-3.218,5.148-2.359,9.653,2.574,13.514 l42.474,32.177c1.502,1.287,3.54,1.931,6.114,1.931c3.433,0,6.115-1.287,8.044-3.861c11.369-14.587,20.594-24.454,27.672-29.603 c7.294-5.148,16.519-7.723,27.673-7.723c10.297,0,19.468,2.789,27.513,8.366c8.044,5.578,12.065,11.906,12.065,18.985 c0,8.151-2.146,14.694-6.437,19.628c-4.29,4.934-11.583,9.76-21.881,14.479c-13.514,6.006-25.901,15.284-37.164,27.834 c-11.263,12.549-16.894,26.01-16.894,40.382v11.583c0,3.004,0.965,5.472,2.896,7.401c1.931,1.93,4.396,2.896,7.4,2.896h61.779 c3.003,0,5.471-0.965,7.401-2.896c1.93-1.931,2.896-4.397,2.896-7.401c0-4.075,2.306-9.385,6.917-15.928 c4.612-6.542,10.458-11.852,17.537-15.927c6.863-3.861,12.119-6.918,15.768-9.171c3.646-2.252,8.579-6.008,14.802-11.263 c6.22-5.255,10.993-10.402,14.317-15.443c3.325-5.042,6.328-11.53,9.01-19.467C380.788,214.916,382.128,206.228,382.128,196.789z"/> </svg>';
  const ICON_CLOSE =
    '<svg class="vzb-icon vzb-icon-pin" viewBox="-150 -250 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1149 414q0 26 -19 45l-181 181l181 181q19 19 19 45q0 27 -19 46l-90 90q-19 19 -46 19q-26 0 -45 -19l-181 -181l-181 181q-19 19 -45 19q-27 0 -46 -19l-90 -90q-19 -19 -19 -46q0 -26 19 -45l181 -181l-181 -181q-19 -19 -19 -45q0 -27 19 -46l90 -90q19 -19 46 -19 q26 0 45 19l181 181l181 -181q19 -19 45 -19q27 0 46 19l90 90q19 19 19 46z"/></svg>';
  const ICON_PRESENTATION =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path id="flip-chart-1" d="M334.549,393.834l58.607,68.666h-45.096l-58.709-68.666H334.549z M240.333,462.5h34.333v-68.666h-34.333 V462.5z M360.5,153.5h-34.334v137.334H360.5V153.5z M121.566,462.5h45.113l58.709-68.666h-45.197L121.566,462.5z M206,273.666 h-34.333v17.168H206V273.666z M257.5,239.333h-34.333v51.5H257.5V239.333z M309,205h-34.334v85.834H309V205z M446.334,102h-17.168 v257.5H85.833V102H68.667V50.5h377.667V102z M394.834,102H120.167v223.166h274.667V102z"/></svg>';
  const ICON_ABOUT =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"/></svg>';
  const ICON_REPEAT =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>';
  const ICON_CURSORARROW =
    '<svg class="vzb-icon" viewBox="-200 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1389 1043q31 30 14 69-17 40-59 40h-382l201 476q10 25 0 49t-34 35l-177 75q-25 10-49 0t-35-34l-191-452-312 312q-19 19-45 19-12 0-24-5-40-17-40-59v-1504q0-42 40-59 12-5 24-5 27 0 45 19z"/></svg>';
  const ICON_CURSORPLUS =
    '<svg class="vzb-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 800v64q0 13-9.5 22.5t-22.5 9.5h-224v224q0 13-9.5 22.5t-22.5 9.5h-64q-13 0-22.5-9.5t-9.5-22.5v-224h-224q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h224v-224q0-13 9.5-22.5t22.5-9.5h64q13 0 22.5 9.5t9.5 22.5v224h224q13 0 22.5 9.5t9.5 22.5zm128 32q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 53-37.5 90.5t-90.5 37.5q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>';
  const ICON_CURSORMINUS =
    '<svg class="vzb-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1088 800v64q0 13-9.5 22.5t-22.5 9.5h-576q-13 0-22.5-9.5t-9.5-22.5v-64q0-13 9.5-22.5t22.5-9.5h576q13 0 22.5 9.5t9.5 22.5zm128 32q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 53-37.5 90.5t-90.5 37.5q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/></svg>';
  const ICON_HUNDREDPERCENT =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg"><g transform="translate(18 11)"><text transform="scale(0.9 1)" x="0" y="0">100</text><text transform="scale(0.6 1)" class="percent" x="0" y="0">%</text></g></svg>';
  const ICON_PERCENT =
    '<svg class="vzb-icon" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1408 1280q0-52-38-90t-90-38-90 38-38 90 38 90 90 38 90-38 38-90zm-768-768q0-52-38-90t-90-38-90 38-38 90 38 90 90 38 90-38 38-90zm1024 768q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5zm-96-1088q0 20-13 38l-1056 1408q-19 26-51 26h-160q-26 0-45-19t-19-45q0-20 13-38l1056-1408q19-26 51-26h160q26 0 45 19t19 45zm-672 320q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z"/></svg>';
  const ICON_SIDE =
    '<svg class="vzb-icon" viewBox="-120 -1540 1792 1792" xmlns="http://www.w3.org/2000/svg"><path transform="rotate(-90) scale(1.2)" d="M1024 448q0 -26 -19 -45l-448 -448q-19 -19 -45 -19t-45 19l-448 448q-19 19 -19 45t19 45t45 19h896q26 0 45 -19t19 -45zM1024 832q0 -26 -19 -45t-45 -19h-896q-26 0 -45 19t-19 45t19 45l448 448q19 19 45 19t45 -19l448 -448q19 -19 19 -45z"/></svg>';
  const ICON_CURSORHAND =
    '<svg class="vzb-icon" viewBox="0 -1540 1792 1792" xmlns="http://www.w3.org/2000/svg"><path transform="scale(1,-1)" d="M880 1408q-46 0 -79 -33t-33 -79v-656h-32v528q0 46 -33 79t-79 33t-79 -33t-33 -79v-528v-256l-154 205q-38 51 -102 51q-53 0 -90.5 -37.5t-37.5 -90.5q0 -43 26 -77l384 -512q38 -51 102 -51h688q34 0 61 22t34 56l76 405q5 32 5 59v498q0 46 -33 79t-79 33t-79 -33t-33 -79v-272h-32v528q0 46 -33 79t-79 33t-79 -33t-33 -79v-528h-32v656q0 46 -33 79t-79 33zM880 1536q68 0 125.5 -35.5t88.5 -96.5q19 4 42 4q99 0 169.5 -70.5t70.5 -169.5v-17q105 6 180.5 -64t75.5 -175v-498q0 -40 -8 -83l-76 -404q-14 -79 -76.5 -131t-143.5 -52h-688q-60 0 -114.5 27.5t-90.5 74.5l-384 512q-51 68 -51 154q0 106 75 181t181 75q78 0 128 -34v434q0 99 70.5 169.5t169.5 70.5q23 0 42 -4q31 61 88.5 96.5t125.5 35.5z"/></svg>';
  const ICON_ANGLEDOUBLELEFT =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"/></svg>';
  const ICON_FORECAST =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><g><path d="M560.7,775.2c-8.5,8.4-17.2,17.1-26,25.8C418,917.8,327.5,1039.9,231.9,1209.3c-72.9,129.4-131,262.4-172.5,395.4l171.8,53.7c37.8-120.9,90.8-242.3,157.5-360.7c43.8-77.7,85.9-143.7,128.7-201.7c43.7-59.3,91-114.2,144.6-167.7c11.3-11.3,22.2-22.2,33-32.8L560.7,775.2z"/><path d="M973.7,461.9c-21.4,12.1-43.4,24.8-66.1,38.5c-56.1,33.7-103.4,65.5-145.8,97.2l114.5,139.2c36.3-26.8,76.5-53.6,124-82.1c23.6-14.2,46.3-27.3,68.4-39.7L973.7,461.9z"/><path d="M1448.9,252.3c-37.1,13.4-75.2,27.2-111.3,40.9c-37.6,14.2-76.7,29.6-118,47.2l71.7,165.1c36.5-15.5,72.9-29.8,110.1-44c33.7-12.8,69.4-25.8,104.4-38.4L1448.9,252.3z"/></g></svg>';
  const ICON_ELLIPSIS_V =
    '<svg class="vzb-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792"><g><path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z"/></g></svg>';

  var iconset = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ICON_PAINTBRUSH: ICON_PAINTBRUSH,
    ICON_SEARCH: ICON_SEARCH,
    ICON_CIRCLE: ICON_CIRCLE,
    ICON_EXPAND: ICON_EXPAND,
    ICON_ASTERISK: ICON_ASTERISK,
    ICON_TRAILS: ICON_TRAILS,
    ICON_LOCK: ICON_LOCK,
    ICON_UNLOCK: ICON_UNLOCK,
    ICON_UNEXPAND: ICON_UNEXPAND,
    ICON_AXES: ICON_AXES,
    ICON_GEAR: ICON_GEAR,
    ICON_STACK: ICON_STACK,
    ICON_DRAG: ICON_DRAG,
    ICON_WARN: ICON_WARN,
    ICON_PIN: ICON_PIN,
    ICON_QUESTION: ICON_QUESTION,
    ICON_CLOSE: ICON_CLOSE,
    ICON_PRESENTATION: ICON_PRESENTATION,
    ICON_ABOUT: ICON_ABOUT,
    ICON_REPEAT: ICON_REPEAT,
    ICON_CURSORARROW: ICON_CURSORARROW,
    ICON_CURSORPLUS: ICON_CURSORPLUS,
    ICON_CURSORMINUS: ICON_CURSORMINUS,
    ICON_HUNDREDPERCENT: ICON_HUNDREDPERCENT,
    ICON_PERCENT: ICON_PERCENT,
    ICON_SIDE: ICON_SIDE,
    ICON_CURSORHAND: ICON_CURSORHAND,
    ICON_ANGLEDOUBLELEFT: ICON_ANGLEDOUBLELEFT,
    ICON_FORECAST: ICON_FORECAST,
    ICON_ELLIPSIS_V: ICON_ELLIPSIS_V
  });

  /* eslint no-prototype-builtins: "off" */

  const d3json = function (path, callback) {
    d3.json(path)
      .then(response => callback(null, response))
      .catch(error => callback(error));
  };

  const d3text = function (path, callback) {
    d3.text(path)
      .then(response => callback(null, response))
      .catch(error => callback(error));
  };

  /*
   * Check if value A is in +- proximity of value B
   * @param {Number} a
   * @param {Number} b
   * @param {Number} tolerance
   * @returns {Boolean} true if values are approximately equal or false otherwise
   */
  const approxEqual = function (a, b, tolerance) {
    tolerance = tolerance || 0;
    if (b > 0) {
      return (1 - tolerance) * b <= a && a <= b * (1 + tolerance);
    } else if (b < 0) {
      return (1 + tolerance) * b <= a && a <= b * (1 - tolerance);
    }
    return Math.abs(a) <= tolerance;
  };

  /*
   * prints out a string like this "AUTOCONFIG: axis_x choses armed_conflicts_internal from data to be WHICH"
   */
  const printAutoconfigResult = (function (mdl) {
    console.info(
      "AUTOCONFIG: " + mdl._name
      + (mdl.isHook() ? " of " + mdl._parent._name : "")
      + " choses " + (mdl.dim || mdl.which)
      + " from " + (mdl.dataSource ? mdl.dataSource._name : "<DATA SOURCE MISSING!>")
      + " to be " + (mdl._type === "entities" || mdl._type === "time" ? "DIM" : "WHICH")
    );
  });

  /*
   * returns unique id with optional prefix
   * @param {String} prefix
   * @returns {String} id
   */
  const uniqueId = (function () {
    let id = 0;
    return function (p) {
      return p ? p + (id += 1) : id += 1;
    };
  })();

  /*
   * checks whether obj is a DOM element
   * @param {Object} obj
   * @returns {Boolean}
   * from underscore: https://github.com/jashkenas/underscore/blob/master/underscore.js
   */
  const isElement = function (obj) {
    return !!(obj && obj.nodeType === 1);
  };

  /*
   * checks whether obj is an Array
   * @param {Object} target
   * @returns {Boolean}
   * from underscore: https://github.com/jashkenas/underscore/blob/master/underscore.js
   */
  const isArray = Array.isArray || (target => Object.prototype.toString.call(target) === "[object Array]");

  /*
   * checks whether obj is an object
   * @param {Object} obj
   * @returns {Boolean}
   * from underscore: https://github.com/jashkenas/underscore/blob/master/underscore.js
   */
  const isObject = function (obj) {
    const type = typeof obj;
    return type === "object" && !!obj;
  };

  /*
   * checks whether arg is a date
   * @param {Object} arg
   * @returns {Boolean}
   */
  const isDate = function (arg) {
    return arg instanceof Date;
  };

  /*
   * checks whether arg is a string
   * @param {Object} arg
   * @returns {Boolean}
   */
  const isString = value => typeof value === "string";

  /*
   * checks whether arg is a NaN
   * @param {*} arg
   * @returns {Boolean}
   * from lodash: https://github.com/lodash/lodash/blob/master/lodash.js
   */
  const isNaN$1 = function (arg) {
    // A `NaN` primitive is the only number that is not equal to itself
    return isNumber(arg) && arg !== +arg;
  };

  const isEmpty = function (obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  /*
   * checks whether arg is a number. NaN is a number too
   * @param {*} arg
   * @returns {Boolean}
   * from lodash: https://github.com/lodash/lodash/blob/master/lodash.js
   * dependencies are resolved and included here
   */
  const isNumber = function (arg) {
    return typeof arg === "number" || !!arg && typeof arg === "object" && Object.prototype.toString.call(arg) ===
      "[object Number]";
  };

  /*
   * checks whether obj is a plain object {}
   * @param {Object} obj
   * @returns {Boolean}
   */
  const isPlainObject = function (obj) {
    return obj !== null && Object.prototype.toString.call(obj) === "[object Object]";
  };

  /*
   * checks whether two arrays are equal
   * @param {Array} a
   * @param {Array} b
   * @returns {Boolean}
   */
  const arrayEquals = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const deepArrayEquals = function (a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (let i = 0; i < a.length; ++i) {
      if (isPlainObject(a[i]) && isPlainObject(b[i])) {
        if (!comparePlainObjects(a[i], b[i])) return false;
      } else if (a[i] !== b[i]) return false;
    }
    return true;
  };

  /**
   * Object Comparison
   *
   * http://stamat.wordpress.com/2013/06/22/javascript-object-comparison/
   *
   * No version
   *
   * @param a
   * @param b
   * @returns {boolean} if objects are equal
   */
  const comparePlainObjects = function (a, b) {

    //Returns the object's class, Array, Date, RegExp, Object are of interest to us
    const getClass = function (val) {
      return Object.prototype.toString.call(val)
        .match(/^\[object\s(.*)\]$/)[1];
    };

    //Defines the type of the value, extended typeof
    const whatis = function (val) {

      if (val === undefined) {
        return "undefined";
      }
      if (val === null) {
        return "null";
      }

      let type = typeof val;

      if (type === "object") {
        type = getClass(val).toLowerCase();
      }

      if (type === "number") {
        return val.toString().indexOf(".") > 0 ?
          "float" :
          "integer";
      }

      return type;
    };

    const compare = function (a, b) {
      if (a === b) {
        return true;
      }
      for (const i in a) {
        if (b.hasOwnProperty(i)) {
          if (!equal(a[i], b[i])) {
            return false;
          }
        } else {
          return false;
        }
      }

      for (const i in b) {
        if (!a.hasOwnProperty(i)) {
          return false;
        }
      }
      return true;
    };

    const compareArrays = function (a, b) {
      if (a === b) {
        return true;
      }
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!equal(a[i], b[i])) {
          return false;
        }
      }
      return true;
    };

    const _equal = {};
    _equal.array = compareArrays;
    _equal.object = compare;
    _equal.date = function (a, b) {
      return a.getTime() === b.getTime();
    };
    _equal.regexp = function (a, b) {
      return a.toString() === b.toString();
    };

    /**
     * Are two values equal, deep compare for objects and arrays.
     * @param a {any}
     * @param b {any}
     * @return {boolean} Are equal?
     */
    const equal = function (a, b) {
      if (a !== b) {
        const atype = whatis(a);
        const btype = whatis(b);

        if (atype === btype) {
          return _equal.hasOwnProperty(atype) ? _equal[atype](a, b) : a == b;
        }

        return false;
      }

      return true;
    };

    return compare(a, b);
  };


  const getViewportPosition = function (element) {
    let xPosition = 0;
    let yPosition = 0;

    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }

    return {
      x: xPosition,
      y: yPosition
    };
  };


  const findScrollableAncestor = function (node) {
    const scrollable = ["scroll", "auto"];
    while (node = node.parentNode) {
      const scrollHeight = node.scrollHeight;
      const height = node.clientHeight;
      if (scrollHeight > height && scrollable.indexOf(d3.select(node).style("overflow")) !== -1) {
        return node;
      }
    }
    return null;
  };

  /*
   * transforms a string into a validated fload value
   * @param {string} string to be transformed
   */
  const strToFloat = function (string) {
    return +string.replace(/[^\d.-]/g, "");
  };

  /*
   * loops through an object or array
   * @param {Object|Array} obj object or array
   * @param {Function} callback callback function
   * @param {Object} ctx context object
   */
  const forEach = function (obj, callback, ctx) {
    if (!obj) {
      return;
    }
    let i, size;
    if (isArray(obj)) {
      size = obj.length;
      for (i = 0; i < size; i += 1) {
        const result = callback.apply(ctx, [obj[i], i]);
        if (result === false) {
          break;
        }
      }
    } else {
      const keys = Object.keys(obj);
      size = keys.length;
      for (i = 0; i < size; i += 1) {
        const result = callback.apply(ctx, [obj[keys[i]], keys[i]]);
        if (result === false) {
          break;
        }
      }
    }
  };

  /*
   * extends an object
   * @param {Object} destination object
   * @returns {Object} extented object
   */
  const extend = function (dest) {
    //objects to overwrite dest are next arguments
    const objs = Array.prototype.slice.call(arguments, 1);
    //loop through each obj and each argument, left to right
    forEach(objs, (obj) => {
      forEach(obj, (value, k) => {
        if (obj.hasOwnProperty(k)) {
          dest[k] = value;
        }
      });
    });
    return dest;
  };

  // Deep extend and helper functions
  // https://github.com/unclechu/node-deep-extend/blob/master/lib/deep-extend.js

  function isSpecificValue(val) {
    return Boolean((
      val instanceof Date
      || val instanceof RegExp
    ));
  }

  function cloneSpecificValue(val) {
    if (val instanceof Date) {
      return new Date(val.getTime());
    } else if (val instanceof RegExp) {
      return new RegExp(val);
    }
    throw new Error("Unexpected situation");
  }

  /**
   * Recursive cloning array.
   */
  function deepCloneArray(arr) {
    const clone = [];
    forEach(arr, (item, index) => {
      if (typeof item === "object" && item !== null) {
        if (isArray(item)) {
          clone[index] = deepCloneArray(item);
        } else if (isSpecificValue(item)) {
          clone[index] = cloneSpecificValue(item);
        } else {
          clone[index] = deepExtend({}, item);
        }
      } else {
        clone[index] = item;
      }
    });
    return clone;
  }

  /**
   * Extening object that entered in first argument.
   *
   * Returns extended object or false if have no target object or incorrect type.
   *
   * If you wish to clone source object (without modify it), just use empty new
   * object as first argument, like this:
   *   deepExtend({}, yourObj_1, [yourObj_N]);
   */
  const deepExtend = function (/*obj_1, [obj_2], [obj_N]*/) {
    if (arguments.length < 1 || typeof arguments[0] !== "object") {
      return false;
    }

    if (arguments.length < 2) {
      return arguments[0];
    }

    const target = arguments[0];

    const lastArgIsBool = typeof arguments[arguments.length - 1] === "boolean";
    const overwriteByEmpty = lastArgIsBool && arguments[arguments.length - 1];
    // convert arguments to array and cut off target object
    const args = Array.prototype.slice.call(arguments, 1, (lastArgIsBool ? -1 : arguments.length));

    let val, src;

    forEach(args, obj => {
      // skip argument if it is array or isn't object
      if (typeof obj !== "object" || isArray(obj)) {
        return;
      }

      forEach(Object.getOwnPropertyNames(obj), key => {
        src = target[key]; // source value
        val = obj[key]; // new value

        // recursion prevention
        if (val === target) ; else if (typeof val !== "object" || val === null || val._data) {
          target[key] = val;

          // just clone arrays (and recursive clone objects inside)
        } else if (isArray(val)) {
          target[key] = deepCloneArray(val);

          // custom cloning and overwrite for specific objects
        } else if (isSpecificValue(val)) {
          target[key] = cloneSpecificValue(val);

          // overwrite by new value if source isn't object or array
        } else if (typeof src !== "object" || src === null || isArray(src)) {
          target[key] = deepExtend({}, val);

          // new value is empty object
        } else if (overwriteByEmpty && isEmpty(val)) {
          target[key] = {};

          // source value and new value is objects both, extending...
        } else {
          target[key] = deepExtend(src, val, overwriteByEmpty);
        }
      });
    });

    return target;
  };

  /*
   * merges objects instead of replacing
   * @param {Object} destination object
   * @returns {Object} merged object
   */
  const merge = function (dest) {

    // objects to overwrite dest are next arguments
    const objs = Array.prototype.slice.call(arguments, 1);

    // loop through each obj and each argument, left to right
    forEach(objs, (obj) => {
      forEach(obj, (value, k) => {
        if (obj.hasOwnProperty(k)) {
          if (dest.hasOwnProperty(k)) {
            if (!isArray(dest[k])) {
              dest[k] = [dest[k]];
            }
            dest[k].push(value);
          } else {
            dest[k] = value;
          }
        }
      });
    });
    return dest;

  };

  /*
   * clones an object (shallow copy)
   * @param {Object} src original object
   * @param {Array} arr filter keys
   * @returns {Object} cloned object
   */
  const clone = function (src, arr, exclude) {
    if (isArray(src)) {
      return src.slice(0);
    }
    const clone = {};
    forEach(src, (value, k) => {
      if ((arr && arr.indexOf(k) === -1) || (exclude && exclude.indexOf(k) !== -1)) {
        return;
      }
      if (src.hasOwnProperty(k)) {
        clone[k] = value;
      }
    });
    return clone;
  };

  /*
   * deep clones an object (deep copy)
   * @param {Object} src original object
   * @returns {Object} cloned object
   */
  const deepClone = function (src) {
    let clone = {};
    if (isArray(src)) clone = [];

    forEach(src, (value, k) => {
      if (isObject(value) || isArray(value)) {
        clone[k] = deepClone(value);
      } else {
        clone[k] = value;
      }
    });
    return clone;
  };

  /*
   * Prints message to timestamp
   * @param {Arr} arr
   * @param {Object} el
   */
  const without = function (arr, el) {
    const idx = arr.indexOf(el);
    if (idx !== -1) {
      arr.splice(idx, 1);
    }
    return arr;
  };

  /*
   * unique items in an array
   * @param {Array} arr original array
   * @param {Function} func optional evaluation function
   * @returns {Array} unique items
   * Based on:
   * http://stackoverflow.com/questions/1960473/unique-values-in-an-array
   */
  const unique = (array, map = data => data) => {
    const uniqueValues = {};

    return array.filter(item => {
      const value = map(item);

      if (uniqueValues.hasOwnProperty(value)) {
        return false;
      }

      uniqueValues[value] = 1;

      return true;
    });
  };

  /*
   * unique items in an array keeping the last item
   * @param {Array} arr original array
   * @param {Function} func optional evaluation function
   * @returns {Array} unique items
   * Based on the previous method
   */
  const uniqueLast = function (arr, func) {
    const u = {};
    const a = [];
    if (!func) {
      func = function (d) {
        return d;
      };
    }
    for (let i = 0, l = arr.length; i < l; i += 1) {
      const key = func(arr[i]);
      if (u.hasOwnProperty(key)) {
        a.splice(u[key], 1); //remove old item from array
      }
      a.push(arr[i]);
      u[key] = a.length - 1;
    }
    return a;
  };

  /*
   * returns first value that passes the test
   * @param {Array} arr original collection
   * @returns {Function} func test function
   */
  const find = function (arr, func) {
    let found;
    forEach(arr, i => {
      if (func(i)) {
        found = i;
        return false; //break
      }
    });
    return found;
  };

  /*
   * filters an array based on object properties
   * @param {Array} arr original array
   * @returns {Object} filter properties to use as filter
   */
  const filter = function (arr, filter) {
    let index = -1;
    const length = arr.length;
    let resIndex = -1;
    const result = [];
    const keys = Object.keys(filter);
    const s_keys = keys.length;
    let i;
    let f;
    while ((index += 1) < length) {
      const value = arr[index];
      let match = true;
      for (i = 0; i < s_keys; i += 1) {
        f = keys[i];
        if (!value.hasOwnProperty(f) || value[f] !== filter[f]) {
          match = false;
          break;
        }
      }
      if (match) {
        result[resIndex += 1] = value;
      }
    }
    return result;
  };

  /*
   * filters an array based on object properties.
   * Properties may be arrays determining possible values
   * @param {Array} arr original array
   * @returns {Object} filter properties to use as filter
   */
  const filterAny = function (arr, filter, wildcard) {
    let index = -1;
    const length = arr.length;
    let resIndex = -1;
    const result = [];
    const keys = Object.keys(filter);
    const s_keys = keys.length;
    let i, f;
    while ((index += 1) < length) {
      const value = arr[index];
      //normalize to array
      let match = true;
      for (i = 0; i < s_keys; i += 1) {
        f = keys[i];
        if (!value.hasOwnProperty(f) || !matchAny(value[f], filter[f], wildcard)) {
          match = false;
          break;
        }
      }
      if (match) {
        result[resIndex += 1] = value;
      }
    }
    return result;
  };

  /*
   * checks if the value matches the comparison value or any in array
   * compare may be an determining possible values
   * @param value original value
   * @param compare value or array
   * @param {String} wildc wildcard value
   * @returns {Boolean} try
   */
  const matchAny = function (values, compare, wildc) {
    //normalize value
    if (!isArray(values)) values = [values];
    if (!wildc) wildc = "*"; //star by default
    let match = false;
    for (let e = 0; e < values.length; e++) {
      const value = values[e];

      if (!isArray(compare) && value == compare) {
        match = true;
        break;
      } else if (isArray(compare)) {
        let found = -1;
        for (let i = 0; i < compare.length; i++) {
          const c = compare[i];
          if (!isArray(c) && (c == value || c === wildc)) {
            found = i;
            break;
          } else if (isArray(c)) { //range
            const min = c[0];
            const max = c[1] || min;
            if (value >= min && value <= max) {
              found = i;
              break;
            }
          }
        }
        if (found !== -1) {
          match = true;
          break;
        }
      }
    }
    return match;
  };

  /**
   * prevent scrolling parent scrollable elements for 2 second when element scrolled to end
   * @param node
   */

  const preventAncestorScrolling = function (element) {
    let preventScrolling = false;
    element.on("mousewheel", function (event) {
      const scrollTop = this.scrollTop;
      const scrollHeight = this.scrollHeight;
      const height = element.node().offsetHeight;
      const delta = event.wheelDelta;
      const up = delta > 0;
      const prevent = function () {
        event.stopPropagation();
        event.preventDefault();
        event.returnValue = false;
        return false;
      };

      const scrollTopTween = function (scrollTop) {
        return function () {
          const _this = this;
          const i = d3.interpolateNumber(this.scrollTop, scrollTop);
          return function (t) {
            _this.scrollTop = i(t);
          };
        };
      };
      if (!up) {
        // Scrolling down
        if (-delta > scrollHeight - height - scrollTop && scrollHeight != height + scrollTop) {
          element.transition().delay(0).duration(0).tween("scrolltween", scrollTopTween(scrollHeight));
          //freeze scrolling on 2 seconds on bottom position
          preventScrolling = true;
          setTimeout(() => {
            preventScrolling = false;
          }, 2000);
        } else if (scrollTop == 0) { //unfreeze when direction changed
          preventScrolling = false;
        }
      } else if (up) {
        // Scrolling up
        if (delta > scrollTop && scrollTop > 0) { //
          //freeze scrolling on 2 seconds on top position
          element.transition().delay(0).duration(0).tween("scrolltween", scrollTopTween(0));
          preventScrolling = true;
          setTimeout(() => {
            preventScrolling = false;
          }, 2000);
        } else if (scrollHeight == height + scrollTop) { //unfreeze when direction changed
          preventScrolling = false;
        }
      }
      if (preventScrolling) {
        return prevent();
      }
    });
  };

  /*
   * Converts radius to area, simple math
   * @param {Number} radius
   * @returns {Number} area
   */
  const radiusToArea = function (r) {
    return r * r * Math.PI;
  };

  /*
   * Computes hypotenuse of a right triangle, given the catheti
   * @param {Number} x
   * @param {Number} y
   * @returns {Number} square root of sum of the squares of x and y
   */
  const hypotenuse = function (x, y) {
    return Math.sqrt(x * x + y * y);
  };

  /*
   * Computes cathetus of a right triangle, given the hypotenuse and cathetus
   * @param {Number} h
   * @param {Number} c
   * @returns {Number} square root of difference of the squares of h and c
   */
  const cathetus = function (h, c) {
    return Math.sqrt(h * h - c * c);
  };

  /*
   * Converts area to radius, simple math
   * @param {Number} area
   * @returns {Number} radius
   */
  const areaToRadius = function (a) {
    return Math.sqrt(a / Math.PI);
  };

  /*
   * Prints message to timestamp
   * @param {String} message
   */
  const timeStamp = function (message) {
    if (console && typeof console.timeStamp === "function") {
      console.timeStamp(message);
    }
  };

  /*
   * Prints warning
   * @param {String} message
   */
  const warn = function (message) {
    message = Array.prototype.slice.call(arguments)
      .map(m => m instanceof Object ? JSON.stringify(m, null, 4) : m)
      .join(" ");
    if (console && typeof console.warn === "function") {

      console.warn(message);
    }
    // "return true" is needed to find out if a parent function is exited with warning
    // example:
    // myfunction = function() { if(brokenstuff) return utils.warn("broken stuff found") }
    // if(myfunction()) return; // stopped execution after myfunction finds broken stuff
    // ... or moving on
    return true;
  };

  /*
   * Prints message for group
   * @param {String} message
   */
  const groupCollapsed = function (message) {
    message = Array.prototype.slice.call(arguments).join(" ");
    if (console && typeof console.groupCollapsed === "function") {
      console.groupCollapsed(message);
    }
  };

  /*
   * Prints end of group
   * @param {String} message
   */
  const groupEnd = function () {
    if (console && typeof console.groupEnd === "function") {
      console.groupEnd();
    }
  };

  /*
   * Prints error
   * @param {String} message
   */
  const error = function (err) {
    if (console && typeof console.error === "function") {
      if (err.stack) {
        console.error(err.stack);
      } else {
        console.error(err);
      }
      if (arguments.length > 1) {
        console.error.apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  };

  /*
   * Count the number of decimal numbers
   * @param {Number} number
   */
  const countDecimals = function (number) {
    if (Math.floor(number.valueOf()) === number.valueOf()) {
      return 0;
    }
    return number.toString().split(".")[1].length || 0;
  };

  /*
   * Adds class to DOM element
   * @param {Element} el
   * @param {String} className
   */
  const addClass = function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      //IE<10
      el.className += " " + className;
    }
  };

  /*
   * Remove class from DOM element
   * @param {Element} el
   * @param {String} className
   */
  const removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      //IE<10
      el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
        " ");
    }
  };

  /*
   * Adds or removes class depending on value
   * @param {Element} el
   * @param {String} className
   * @param {Boolean} value
   */
  const classed = function (el, className, value) {
    if (value === true) {
      addClass(el, className);
    } else if (value === false) {
      removeClass(el, className);
    } else {
      return hasClass(el, className);
    }
  };

  /*
   * Checks whether a DOM element has a class or not
   * @param {Element} el
   * @param {String} className
   * @return {Boolean}
   */
  const hasClass = (el, className) => (
    el.classList ?
      el.classList.contains(className) :
      new RegExp("(^| )" + className + "( |$)", "gi").test(el.className)
  );

  /*
   * Throttles a function
   * @param {Function} func
   * @param {Number} ms duration
   * @return {Function}
   * Function recallLast was added to prototype of returned function.
   * Call Function.recallLast() - immediate recall func with last saved arguments,
   *                              else func will be called automaticly after ms duration
   */
  const throttle = function (func, ms) {

    let throttled = false;
    let savedArgs;
    let savedThis;
    let nextTime;

    const __recallLast = function () {
      if (throttled) {
        throttled = false;
        func.apply(savedThis, savedArgs);
      }
    };

    const wrapper = function () {

      if (nextTime > Date.now()) {
        throttled = true;
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      nextTime = Date.now() + ms;
      throttled = false;

      func.apply(this, arguments);

      setTimeout(() => {
        __recallLast();
      }, ms);

    };

    wrapper.recallLast = __recallLast;

    return wrapper;
  };


  /*
   * Returns keys of an object as array
   * @param {Object} arg
   * @returns {Array} keys
   */
  const keys = function (arg) {
    return Object.keys(arg);
  };

  /*
   * returns the values of an object in an array format
   * @param {Object} obj
   * @return {Array}
   */
  const values = function (obj) {
    const arr = [];
    const keys = Object.keys(obj);
    const size = keys.length;
    for (let i = 0; i < size; i += 1) {
      arr.push(obj[keys[i]]);
    }
    return arr;
  };


  /*
   * Computes the minumum value in an array
   * @param {Array} arr
   */
  const arrayMin = function (arr) {
    return arr.reduce((p, v) => (p < v ? p : v));
  };

  /*
   * Computes the minumum value in an array
   * @param {Array} arr
   */
  const arrayMax = function (arr) {
    return arr.reduce((p, v) => (p > v ? p : v));
  };

  /*
   * Computes the mean of an array
   * @param {Array} arr
   */
  const arrayMean = function (arr) {
    return arraySum(arr) / arr.length;
  };

  /*
   * Computes the sum of an array
   * @param {Array} arr
   */
  const arraySum = function (arr) {
    return arr.reduce((a, b) => a + b);
  };

  /*
   * Computes the median of an array
   * @param {Array} arr
   */
  const arrayMedian = arr => {
    arr = arr.sort((a, b) => a - b);
    const middle = Math.floor((arr.length - 1) / 2);

    return arr.length % 2 ?
      arr[middle] :
      (arr[middle] + arr[middle + 1]) / 2;
  };

  /*
   * Returns the last value of array
   * @param {Array} arr
   */
  const arrayLast = function (arr) {
    if (!arr.length) return null;
    return arr[arr.length - 1];
  };

  /*
   * Returns the resulting object of the difference between two objects
   * @param {Object} obj2
   * @param {Object} obj1
   * @returns {Object}
   */
  const diffObject = function (obj2, obj1) {
    const diff = {};
    forEach(obj1, (value, key) => {
      if (!obj2.hasOwnProperty(key) && isPlainObject(value)) {
        diff[key] = diffObject({}, value);
      }
    });
    forEach(obj2, (value, key) => {
      if (!obj1.hasOwnProperty(key)) {
        diff[key] = value;
      } else if (value !== obj1[key]) {
        if (isPlainObject(value) && isPlainObject(obj1[key])) {
          if (isEmpty(value)) {
            if (!isEmpty(obj1[key])) {
              diff[key] = {};
            }
          } else {
            const d = diffObject(value, obj1[key]);
            if (Object.keys(d).length > 0) {
              diff[key] = d;
            }
          }
        } else if (!isArray(value) || !isArray(obj1[key]) || !deepArrayEquals(value, obj1[key])) {
          diff[key] = value;
        }
      }
    });
    return diff;
  };

  /*
   * Defers a function
   * @param {Function} func
   */
  const defer = function (func) {
    setTimeout(func, 1);
  };

  /*
   * Defers a function
   * @param {Function} func
   */
  const delay = function (delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  const clearDelay = function (delayId) {
    return clearTimeout(delayId);
  };

  /*
   * Creates a hashcode for a string or array
   * @param {String|Array} str
   * @return {Number} hashCode
   */
  const hashCode = function (str) {
    if (!isString(str)) {
      str = JSON.stringify(str);
    }
    let hash = 0;
    const size = str.length;
    let c;
    if (size === 0) {
      return hash;
    }
    for (let i = 0; i < size; i += 1) {
      c = str.charCodeAt(i);
      hash = (hash << 5) - hash + c;
      hash &= hash; // Convert to 32bit integer
    }
    return hash.toString();
  };


  /*
   * Converts D3 nest array into the object with key-value pairs, recursively
   * @param {Array} arr - array like this [{key: k, values: [a, b, ...]}, {...} ... {...}]
   * @return {Object} object like this {k: [a, b, ...], ...}
   */
  //
  const nestArrayToObj = function (arr) {
    if (!arr || !arr.length || !arr[0].key) return arr;
    const res = {};
    for (let i = 0; i < arr.length; i++) {
      res[arr[i].key] = nestArrayToObj(arr[i].values);
    }
    return res;
  };

  const nestArrayToObjWithFlatKeys = function (arr, res = {}, keys, key = "") {
    if (!arr || !arr.length || !arr[0].key) {
      if (keys) {
        keys += "]";
        !res[keys] && (res[keys] = {});
        res[keys][key] = arr;
      } else {
        res[key] = arr;
      }
      return arr;
    }
    if (key) keys = keys ? keys + "," + JSON.stringify(key) : ("[" + JSON.stringify(key));
    for (let i = 0; i < arr.length; i++) {
      nestArrayToObjWithFlatKeys(arr[i].values || arr[i].value, res, keys, arr[i].key);
    }
    return res;
  };

  const nestArrayToValues = function (arr, res = []) {
    if (!arr || !arr.length || !arr[0].key) {
      res.push(...arr);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      nestArrayToValues(arr[i].values || arr[i].value, res);
    }
    return res;
  };

  const interpolateVector = function () {

  };

  /*
   * Performs an ajax request
   * @param {Object} options
   * @param {String} className
   * @return {Boolean}
   */
  const ajax = function (options) {
    const request = new XMLHttpRequest();
    request.open(options.method, options.url, true);
    if (options.method === "POST" && !options.json) {
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    } else if (options.method === "POST" && options.json) {
      request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    }
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = options.json ? JSON.parse(request.responseText) : request.responseText;
        if (options.success) {
          options.success(data);
        }
      } else {
        if (options.error) {
          options.error();
        }
      }
    };
    request.onerror = function () {
      if (options.error) {
        options.error();
      }
    };
    request.send(options.data);
  };

  /*
   * Performs a GET http request
   */
  const get = function (url, pars, success, error, json) {
    pars = pars || [];
    forEach(pars, (value, key) => {
      pars.push(key + "=" + value);
    });
    url = pars.length ? url + "?" + pars.join("&") : url;
    ajax({
      method: "GET",
      url,
      success,
      error,
      json
    });
  };

  /*
   * Performs a POST http request
   */
  const post = function (url, pars, success, error, json) {
    ajax({
      method: "POST",
      url,
      success,
      error,
      json,
      data: pars
    });
  };

  /**
   * Make function memoized
   * @param {Function} fn
   * @returns {Function}
   */
  const memoize = function (fn) {
    return function () {
      const args = Array.prototype.slice.call(arguments);
      let hash = "";
      let i = args.length;
      let currentArg = null;

      while (i--) {
        currentArg = args[i];
        hash += (currentArg === Object(currentArg)) ? JSON.stringify(currentArg) : currentArg;
        fn.memoize || (fn.memoize = {});
      }

      return (hash in fn.memoize) ? fn.memoize[hash] : fn.memoize[hash] = fn.apply(this, args);
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  const debounce = function (func, wait, immediate) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const isTouchDevice = function () {
    return !!("ontouchstart" in document.documentElement);
  };

  //return a pruneed tree
  const pruneTree = function (tree, filterCallback) {
    const filteredTree = {};
    let filteredChildrens = [];
    if (tree.hasOwnProperty("children")) {
      filteredChildrens = tree.children.map(childrenTree => pruneTree(childrenTree, filterCallback)).filter(childrenTree => Object.keys(childrenTree).length !== 0);
    }
    if (filteredChildrens.length != 0 || filterCallback(tree)) {
      //copy all the properties to the new tree
      forEach(tree, (value, key) => {
        filteredTree[key] = value;
      });
    }
    if (filteredChildrens.length != 0) {
      filteredTree["children"] = filteredChildrens;
    }
    return filteredTree;
  };

  const eachTree = function (tree, filterCallback, parentTree) {
    if (tree.hasOwnProperty("children")) {
      tree.children.forEach(childrenTree => eachTree(childrenTree, filterCallback, tree));
    }
    filterCallback(tree, parentTree);
  };

  const setIcon = function (element, icon) {
    const svgIcon = element.node().ownerDocument.importNode(
      new DOMParser().parseFromString(icon, "application/xml").documentElement,
      true
    );
    svgIcon.setAttribute("width", "0px");
    svgIcon.setAttribute("height", "0px");

    element.selectAll(".svg-icon").remove();
    element.node().appendChild(svgIcon);
    return element;
  };

  //http://stackoverflow.com/questions/26049488/how-to-get-absolute-coordinates-of-object-inside-a-g-group
  function makeAbsoluteContext(element, svgDocument) {
    return function (x, y) {
      const offset = svgDocument.getBoundingClientRect();
      const matrix = element.getScreenCTM();
      return {
        x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
        y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
      };
    };
  }


  /***
   thenBy.js
   Copyright 2013 Teun Duynstee
   https://github.com/Teun/thenBy.js/blob/master/thenBy.module.js

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
   */
  function firstBy() {

    function identity(v) {
      return v;
    }

    function ignoreCase(v) {
      return typeof (v) === "string" ? v.toLowerCase() : v;
    }

    function makeCompareFunction(f, opt) {
      opt = typeof (opt) === "number" ? {direction: opt} : opt || {};
      if (typeof (f) !== "function") {
        const prop = f;
        // make unary function
        f = function (v1) {
          return v1[prop] ? v1[prop] : "";
        };
      }
      if (f.length === 1) {
        // f is a unary function mapping a single item to its sort score
        const uf = f;
        const preprocess = opt.ignoreCase ? ignoreCase : identity;
        f = function (v1, v2) {
          return preprocess(uf(v1)) < preprocess(uf(v2)) ? -1 : preprocess(uf(v1)) > preprocess(uf(v2)) ? 1 : 0;
        };
      }
      if (opt.direction === -1) return function (v1, v2) {
        return -f(v1, v2);
      };
      return f;
    }

    /* adds a secondary compare function to the target function (`this` context)
     which is applied in case the first one returns 0 (equal)
     returns a new compare function, which has a `thenBy` method as well */
    function tb(func, opt) {
      const x = typeof (this) === "function" ? this : false;
      const y = makeCompareFunction(func, opt);
      const f = x ? function (a, b) {
        return x(a, b) || y(a, b);
      }
        : y;
      f.thenBy = tb;
      return f;
    }

    return tb;
  }

  function transform(node) {

    const {a, b, c, d, e, f} = node.transform.baseVal.consolidate().matrix;

    return (function (a, b, c, d, e, f) {
      let scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * Math.PI / 180,
        skewX: Math.atan(skewX) * Math.PI / 180,
        scaleX,
        scaleY
      };
    })(a, b, c, d, e, f);
  }

  const capitalize = string => string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

  // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  const isMobileOrTablet = (agent = navigator.userAgent || navigator.vendor || window.opera) => /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(agent.substr(0, 4));

  function getKey(d, keysArray) {
    let key = d[keysArray[0]];
    for (let i = 1, j = keysArray.length; i < j; i++) {
      key = key + "," + d[keysArray[i]];
    }
    return key;
  }

  const isFunction = value => typeof value === "function";


  /**
   * This is helper for getting some deep props in object. It's added to remove code like
   * this.show[dimension]
   *   && this.show[dimension]["$in"]
   *   && this.show[dimension]["$in"].indexOf(d[dimension]) !== -1;
   * when you need to get (+check) nested properties.

   * @param {context} object The root object where we start to look for the props
   * @param {Array} props Names of properties for nesting
   * @param {*} defaultValue Default value that will be returned if there is no such properties in object
   * @returns {property} The property we're looking for or a default value

   * Usage:
   * const object = { one: { two: "your value" } };
   * utils.getProp(object, ["one", "two"]); // "your value"
   */
  const getProp = (object, props, defaultValue) => {
    for (let prop of Array.isArray(props) ? props : [props]) {
      if (object.hasOwnProperty(prop)) {
        object = object[prop];
      } else {
        return defaultValue;
      }
    }
    return object;
  };

  const px2num = pixels => (
    isString(pixels) && pixels.endsWith("px") ?
      parseFloat(pixels) :
      console.warn(`Strange pixels value: ${pixels}`) || pixels
  );

  const replaceNumberSpacesToNonBreak = numString => numString ? numString.replace(/\d{1,3}(?: \d{3})+(?=\W)/g, match => match.replace(/ /g, "\xa0")) : numString;

  const getSubtitle = (title = "", shortTitle) => {
    let subtitle = title.replace(shortTitle, "");
    if (subtitle[0] === ",") subtitle = subtitle.slice(1);
    const regexpResult = /^\((.*)\)$|.*/.exec(subtitle.trim());
    return regexpResult[1] || regexpResult[0] || "";
  };

  const getBrowserDetails = () => {

    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = "" + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;
    const isElectron = navigator.userAgent.toLowerCase().indexOf(" electron/") > -1;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt("" + fullVersion, 10);
    if (isNaN$1(majorVersion)) {
      fullVersion = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    return (isElectron ? "Electron " : "") + browserName + " " + majorVersion + " (" + fullVersion + ")";
  };

  const normaliseLink = input => {
    if (!input) return input;
    if (input.indexOf("http://") === 0 || input.indexOf("https://") === 0) return input;
    if (input.indexOf("//") === 0) return "http://" + input.slice(2);
    return "http://" + input;
  };

  const getOSname = () => {
    let OSName = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";

    return OSName;
  };

  // d3.rebind (v3) - Copies a variable number of methods from source to target.
  const rebind = function(target, source) {
    let i = 1, method;
    const n = arguments.length;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };

  // Method is assumed to be a standard D3 getter-setter:
  // If passed with no arguments, gets the value.
  // If passed with arguments, sets the value and returns the target.
  function d3_rebind(target, source, method) {
    return function() {
      const value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }

  var _LegacyUtils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    d3json: d3json,
    d3text: d3text,
    approxEqual: approxEqual,
    printAutoconfigResult: printAutoconfigResult,
    uniqueId: uniqueId,
    isElement: isElement,
    isArray: isArray,
    isObject: isObject,
    isDate: isDate,
    isString: isString,
    isNaN: isNaN$1,
    isEmpty: isEmpty,
    isNumber: isNumber,
    isPlainObject: isPlainObject,
    arrayEquals: arrayEquals,
    deepArrayEquals: deepArrayEquals,
    comparePlainObjects: comparePlainObjects,
    getViewportPosition: getViewportPosition,
    findScrollableAncestor: findScrollableAncestor,
    strToFloat: strToFloat,
    forEach: forEach,
    extend: extend,
    deepExtend: deepExtend,
    merge: merge,
    clone: clone,
    deepClone: deepClone,
    without: without,
    unique: unique,
    uniqueLast: uniqueLast,
    find: find,
    filter: filter,
    filterAny: filterAny,
    matchAny: matchAny,
    preventAncestorScrolling: preventAncestorScrolling,
    radiusToArea: radiusToArea,
    hypotenuse: hypotenuse,
    cathetus: cathetus,
    areaToRadius: areaToRadius,
    timeStamp: timeStamp,
    warn: warn,
    groupCollapsed: groupCollapsed,
    groupEnd: groupEnd,
    error: error,
    countDecimals: countDecimals,
    addClass: addClass,
    removeClass: removeClass,
    classed: classed,
    hasClass: hasClass,
    throttle: throttle,
    keys: keys,
    values: values,
    arrayMin: arrayMin,
    arrayMax: arrayMax,
    arrayMean: arrayMean,
    arraySum: arraySum,
    arrayMedian: arrayMedian,
    arrayLast: arrayLast,
    diffObject: diffObject,
    defer: defer,
    delay: delay,
    clearDelay: clearDelay,
    hashCode: hashCode,
    nestArrayToObj: nestArrayToObj,
    nestArrayToObjWithFlatKeys: nestArrayToObjWithFlatKeys,
    nestArrayToValues: nestArrayToValues,
    interpolateVector: interpolateVector,
    ajax: ajax,
    get: get,
    post: post,
    memoize: memoize,
    debounce: debounce,
    isTouchDevice: isTouchDevice,
    pruneTree: pruneTree,
    eachTree: eachTree,
    setIcon: setIcon,
    makeAbsoluteContext: makeAbsoluteContext,
    firstBy: firstBy,
    transform: transform,
    capitalize: capitalize,
    isMobileOrTablet: isMobileOrTablet,
    getKey: getKey,
    isFunction: isFunction,
    getProp: getProp,
    px2num: px2num,
    replaceNumberSpacesToNonBreak: replaceNumberSpacesToNonBreak,
    getSubtitle: getSubtitle,
    getBrowserDetails: getBrowserDetails,
    normaliseLink: normaliseLink,
    getOSname: getOSname,
    rebind: rebind
  });

  const STATUS = {
    INIT: "init", 
    PENDING: "pending", 
    READY: "fulfilled", 
    ERROR: "rejected"
  };

  function injectIndexes(array) {
    return array.map((m, i) => Object.assign({}, m, {i}));
  }

  function isEntityConcept(concept = {}) {
    return ["entity_set", "entity_domain"].includes(concept.concept_type);
  }

  function getSpaceName(enc, space){
    if(!space) space = enc.data.space;
    if(!isArray(space)) space = [space];
    return space.map(m => enc.data.source.getConcept(m).name).join(", ");
  }

  function getConceptNameCompliment(enc) {
    const dims = enc.data.filter.dimensions;
    if(!dims) Promise.resolve("");

    return requestEntityNames(enc.data.source, Object.keys(dims))
      .then(response => {
        
        return response.map(({data,dim}) => {
          const value = dims[dim][dim];
          //const prefix = getSpaceName(enc, dim);
          return /*prefix + ": " +*/ data.raw.find(f => f[dim]==value).name;
        }).join(", ");
      });
  }

  function requestEntityNames(datasource, dims) {
    if(!isArray(dims)) dims = [dims];

    const promises = dims.map(dim => {
      return datasource.query({
        select: {
          key: [dim],
          value: ["name"]
        },
        from: "entities"
      }).then(data => {
        return { data, dim };
      });
    });

    return Promise.all(promises);
  }

  function getConceptName(enc, localise) {
    const cp = enc.data.conceptProps;

    if (enc.data.isConstant) 
      return localise("indicator/" + enc.data.constant + "/" + enc.scale.modelType);

    return cp.name || cp.concept || localise(enc.name);
  }

  function getConceptShortName(enc, localise) {
    const cp = enc.data.conceptProps;

    if (enc.data.isConstant) 
      return localise("indicator/" + enc.data.constant + "/" + enc.scale.modelType);
      
    return cp.name_short || getConceptName(enc, localise);
  }

  function getConceptNameMinusShortName(enc, localise) {
    const name = getConceptName(enc, localise);
    const shortName = getConceptShortName(enc, localise);

    if (enc.data.isConstant) 
      return name;

    let result = name.replace(shortName,"");

    //remove leading comma if present
    if (result[0] === ",") result = result.slice(1);

    result = result.trim();

    //remove brackets if string starts with "(" and ends with ")"
    const regexpResult = /^\((.*)\)$|.*/.exec(result);
    return regexpResult[1] || regexpResult[0] || "";
  }

  function getConceptUnit(enc) {
    const cp = enc.data.conceptProps;
    return cp && cp.unit || "";
  }

  function getDefaultStateTree(defaultState, component) {
    const _defaultState = getChildrenDefaultState(defaultState, component.DEFAULT_UI);
    component.children.forEach(child => {
      if (child.name) {
        _defaultState[child.name] = getDefaultStateTree(_defaultState[child.name], child);
      } else {
        deepExtend(_defaultState, getDefaultStateTree(_defaultState, child));
      }
    });
    return _defaultState;
  }

  function getChildrenDefaultState(parent, children) {
    const cloneChildren = deepClone(children);
    return deepExtend(cloneChildren, parent);
  }

  function clearEmpties(obj) {
    for (const key in obj) {
      if (!obj[key] || typeof obj[key] !== "object" || obj[key] instanceof Date) {
        continue; // If null or not an object, skip to the next iteration
      }

      // The property is an object
      clearEmpties(obj[key]); // <-- Make a recursive call on the nested object
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key]; // The object had no properties, so delete that property
      }
    }
    return obj;
  }

  function mergeInTarget(target, source) {
    for (const key in source) {
      if (typeof source[key] === "object" && !Array.isArray(source[key]) && source[key] !== null) {
        if (target[key]) {
          mergeInTarget(target[key], source[key]);
        } else {
          target[key] = deepExtend({}, source[key]);
        }
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  function replaceProps(target, source) {
    for (const key in target) {
      if (typeof target[key] === "object" && !Array.isArray(target[key]) && target[key] !== null) {
        replaceProps(target[key], source[key] || {});
      } else {
        if (typeof source[key] !== "undefined") {
          target[key] = source[key];
        } else {
          delete target[key];
        }
      }
    }
    return target;
  }

  var _Utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    STATUS: STATUS,
    injectIndexes: injectIndexes,
    isEntityConcept: isEntityConcept,
    getSpaceName: getSpaceName,
    getConceptNameCompliment: getConceptNameCompliment,
    requestEntityNames: requestEntityNames,
    getConceptName: getConceptName,
    getConceptShortName: getConceptShortName,
    getConceptNameMinusShortName: getConceptNameMinusShortName,
    getConceptUnit: getConceptUnit,
    getDefaultStateTree: getDefaultStateTree,
    getChildrenDefaultState: getChildrenDefaultState,
    clearEmpties: clearEmpties,
    mergeInTarget: mergeInTarget,
    replaceProps: replaceProps
  });

  //d3.axisSmart

  function axisSmart$1(_orient) {

    return (function d3_axis_smart(_super) {

      const VERTICAL = "vertical axis";
      const HORIZONTAL = "horizontal axis";
      const X = "labels stack side by side";
      const Y = "labels stack top to bottom";

      const OPTIMISTIC = "optimistic approximation: labels have different lengths";
      const PESSIMISTIC = "pessimistic approximation: all labels have the largest length";
      const DEFAULT_LOGBASE = 10;

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      function axis(g) {
        const checkDmn = axis.scale().domain();
        const checkRng = axis.scale().range();
        if (!checkDmn.length || !checkRng.length || [...checkDmn, ...checkRng].some(s => s == null || isNaN(s))) {    
          //this catches null, undefined, NaN, Invalid date, but accepts 0 and ""
          return warn(`d3.axisSmart() skips action because of bad domain ${checkDmn} or range ${checkRng} of the attached scale`);
        }

        if (highlightValue != null) {
          axis.highlightValueRun(g);
          return;
        }

        // measure the width and height of one digit
        const widthSampleG = g.append("g").attr("class", "tick widthSampling");
        const widthSampleT = widthSampleG.append("text").text("0M");
        if (!options.cssMargin) options.cssMargin = {};
        options.cssMargin.top = widthSampleT.style("margin-top");
        options.cssMargin.bottom = widthSampleT.style("margin-bottom");
        options.cssMargin.left = widthSampleT.style("margin-left");
        options.cssMargin.right = widthSampleT.style("margin-right");
        options.widthOfOneDigit = widthSampleT.node().getBBox().width * 0.5;
        options.heightOfOneDigit = widthSampleT.node().getBBox().height;
        widthSampleG.remove();

        // run label factory - it will store labels in tickValues property of axis
        axis.labelFactory(options);

        // construct the view (d3 constructor is used)
        let transition = null;
        if (options.transitionDuration > 0) {
          _super(transition = g.transition().duration(options.transitionDuration));
        } else {
          _super(g);
        }

        //remove axis d3v4 hardcoded attributes
        g.attr("fill", null);
        g.attr("font-size", null);
        g.attr("font-family", null);
        g.attr("text-anchor", null);

        //identify the orientation of axis and the direction of labels
        const orient = axis.orient() == "top" || axis.orient() == "bottom" ? HORIZONTAL : VERTICAL;
        const dimension = (orient == HORIZONTAL && axis.pivot() || orient == VERTICAL && !axis.pivot()) ? Y : X;

        //add an invisible element that would represent hovered value
        g.selectAll(".vzb-axis-value")
          .data([null])
          .enter().call(selection => {
            selection.append("g")
              .attr("class", "vzb-axis-value")
              .classed("vzb-hidden", true)
              .append("text")
              .each(function() {
                const textEl = d3.select(this);
                textEl.classed("stroke", true);
                if (!textEl.style("paint-order").length) {
                  textEl.clone().classed("stroke", false);
                }
              });
            selection.append("g")
              .attr("class", "vzb-axis-value vzb-axis-value-shadow")
              .style("opacity", 0)
              .append("text");
          });

        // patch the label positioning after the view is generated
        const padding = axis.tickPadding();
        g.selectAll("text")
          .each(function() {
            if (axis.pivot() == null) return;

            const view = d3.select(this);
            view.attr("transform", "rotate(" + (axis.pivot() ? -90 : 0) + ")");
            view.style("text-anchor", dimension == X ? "middle" : "end");
            view.attr("x", dimension == X ? (orient == VERTICAL ? -padding : 0) : -padding);
            view.attr("y", dimension == X ? (orient == VERTICAL ? 0 : padding) : 0);
            view.attr("dx", dimension == X ? (orient == VERTICAL ? padding : 0) : 0);
            view.attr("dy", dimension == X ? (orient == VERTICAL ? -padding : ".72em") : ".32em");
          });

        //apply label repositioning: first and last visible values would shift away from the borders
        if (axis.repositionLabels() != null) {
          const patchLabelsPosition = () => {
            g.selectAll(".tick")
              .each(function(d) {
                const view = d3.select(this).select("text");
                const shift = axis.repositionLabels()[d] || { x: 0, y: 0 };
                view.attr("x", +view.attr("x") + shift.x);
                view.attr("y", +view.attr("y") + shift.y);
              });
          };
          transition ? transition.on("end", () => patchLabelsPosition()) : patchLabelsPosition();
        }

        //hide axis labels that are outside the available viewport
        const scale = axis.scale();
        if (options.viewportLength) {
          g.selectAll(".tick")
            .classed("vzb-hidden", d => scale(d) < 0 || scale(d) > options.viewportLength);
        }

        // add minor ticks. if none exist add an empty array
        if (axis.tickValuesMinor() == null) axis.tickValuesMinor([]);
        let minorTicks = g.selectAll(".tick-minor").data(tickValuesMinor);
        minorTicks.exit().remove();
        minorTicks = minorTicks.enter().append("line")
          .attr("class", "tick-minor")
          .merge(minorTicks);

        const tickLengthOut = axis.tickSizeMinor().outbound;
        const tickLengthIn = axis.tickSizeMinor().inbound;

        //hide minor ticks that are outside the available viewport (when axis is zoomed ticks may stick out)
        if (options.viewportLength) {
          minorTicks
            .classed("vzb-hidden", d => scale(d) < 0 || scale(d) > options.viewportLength);
        }

        minorTicks
          .attr("y1", orient == HORIZONTAL ? (axis.orient() == "top" ? 1 : -1) * tickLengthIn : scale)
          .attr("y2", orient == HORIZONTAL ? (axis.orient() == "top" ? -1 : 1) * tickLengthOut : scale)
          .attr("x1", orient == VERTICAL ? (axis.orient() == "right" ? -1 : 1) * tickLengthIn : scale)
          .attr("x2", orient == VERTICAL ? (axis.orient() == "right" ? 1 : -1) * tickLengthOut : scale);

        //adjust axis rake
        g.selectAll("path").remove();
        let rake = g.selectAll(".vzb-axis-line").data([0]);
        rake.exit().remove();
        rake = rake.enter().append("line")
          .attr("class", "vzb-axis-line")
          .merge(rake);

        if (options.viewportLength) {
          rake
            .attr("x1", orient == VERTICAL ? 0 : -1)
            .attr("x2", orient == VERTICAL ? 0 : options.viewportLength)
            .attr("y1", orient == HORIZONTAL ? 0 : 0)
            .attr("y2", orient == HORIZONTAL ? 0 : options.viewportLength);
        } else {
          //TODO: this will not work for the "ordinal" scaleType
          rake
            .attr("x1", orient == VERTICAL ? 0 : d3.min(scale.range()) - (options.bump || 0) - 1)
            .attr("x2", orient == VERTICAL ? 0 : d3.max(scale.range()) + (options.bump || 0))
            .attr("y1", orient == HORIZONTAL ? 0 : d3.min(scale.range()) - (options.bump || 0))
            .attr("y2", orient == HORIZONTAL ? 0 : d3.max(scale.range()) + (options.bump || 0));
        }
      }


      axis.highlightValueRun = function(g) {

        //if viewport is defined and HL value is outside then behave as reset HL
        if (options.viewportLength && highlightValue != "none" && (
          axis.scale()(highlightValue) > options.viewportLength ||
          axis.scale()(highlightValue) < 0
        )) highlightValue = "none";

        //identify the orientation of axis and the direction of labels
        const orient = axis.orient() == "top" || axis.orient() == "bottom" ? HORIZONTAL : VERTICAL;
        const dimension = (orient == HORIZONTAL && axis.pivot() || orient == VERTICAL && !axis.pivot()) ? "y" : "x";
        const pivot = axis.pivot() ? -1 : 1;

        //set content and visibility of HL value
        g.select(".vzb-axis-value")
          .classed("vzb-hidden", highlightValue == "none");
        g.select(".vzb-axis-value-shadow").select("text")
          .text(highlightValue == "none" ? "" : options.formatter(highlightValue));

        let bbox;
        const o = {};

        if (highlightValue != "none") {
          // measure its width and height for collision resolving
          bbox = g.select(".vzb-axis-value-shadow").node().getBBox();

          // clone a known options object (because we don't want to overwrite widthOfOneDigit / heightOfOneDigit in the original one
          o.bump = options.bump;
          o.formatter = options.formatter;
          o.viewportLength = options.viewportLength;
          o.toolMargin = options.toolMargin;
          o.cssMargin = options.cssMargin;
          o.widthOfOneDigit = bbox[axis.pivot() ? "height" : "width"] / (options.formatter(highlightValue).length);
          o.heightOfOneDigit = bbox[axis.pivot() ? "width" : "height"];
        }

        // this will give additive shifting for the hovered value in case it sticks out a little outside viewport
        const hlValueShift = (highlightValue == "none" ? { x: 0, y: 0 } :
          repositionLabelsThatStickOut([highlightValue], o, orient, axis.scale(), dimension)[highlightValue])[dimension];

        // this function will help to move the hovered value to the right place
        const getTransform = function() {
          return highlightValue == "none" ? "translate(0,0)" :
            "translate("
              + (orient == HORIZONTAL ? axis.scale()(highlightValue) + hlValueShift * pivot : 0) + ","
              + (orient == VERTICAL ? axis.scale()(highlightValue) + hlValueShift * pivot : 0)
              + ")";
        };

        // this function will help to compute opacity for the axis labels that would overlap with the HL label
        const getOpacity = function(d, t, view) {
          if (highlightValue == "none") return 1;

          const wh = orient == HORIZONTAL ? "width" : "height";
          const shift = ((axis.repositionLabels() || {})[d] || { x: 0, y: 0 })[dimension];

          // opacity depends on the collision between label's boundary boxes
          return axis.hlOpacityScale()(
            // this computes the distance between the box centers, this is a 1-d problem because all labels are along the axis
            // shifts of labels that stick out from the viewport are also taken into account
            Math.abs(axis.scale()(d) + shift * pivot - axis.scale()(highlightValue) -  hlValueShift * pivot)
            // this computes the sides of boundary boxes, each has a half-size to reduce the distance between centers
            - view.getBBox()[wh] / 2 - bbox[wh] / 2
          );
        };

        // apply translation of the HL value and opacity of tick labels
        if (highlightTransDuration) {
          g.select(".vzb-axis-value")
            .transition()
            .duration(highlightTransDuration)
            .ease(d3.easeLinear)
            .attr("transform", getTransform);

          g.select(".vzb-axis-value")
            .selectAll("text")
            .interrupt("text" + (highlightValue == "none" ? "on" : "off"))
            .transition("text" + (highlightValue == "none" ? "off" : "on"))
            .delay(highlightTransDuration)
            .text(highlightValue == "none" ? "" : options.formatter(highlightValue));

          g.selectAll(".tick:not(.vzb-hidden)").each(function(d, t) {
            d3.select(this).select("text")
              .transition()
              .duration(highlightTransDuration)
              .ease(d3.easeLinear)
              .style("opacity", getOpacity(d, t, this));
          });

        } else {
          g.select(".vzb-axis-value")
            .interrupt()
            .attr("transform", getTransform);

          g.select(".vzb-axis-value")
            .selectAll("text")
            .interrupt("texton").interrupt("textoff")
            .text(highlightValue == "none" ? "" : options.formatter(highlightValue));

          g.selectAll(".tick:not(.vzb-hidden)").each(function(d, t) {
            d3.select(this).select("text")
              .interrupt()
              .style("opacity", getOpacity(d, t, this));
          });

        }

        highlightValue = null;
      };


      let hlOpacityScale = d3.scaleLinear().domain([0, 5]).range([0, 1]).clamp(true);
      axis.hlOpacityScale = function(arg) {
        if (!arguments.length) return hlOpacityScale;
        hlOpacityScale = arg;
        return axis;
      };

      let highlightValue = null;
      axis.highlightValue = function(arg) {
        if (!arguments.length) return highlightValue;
        highlightValue = arg;
        return axis;
      };

      let highlightTransDuration = 0;
      axis.highlightTransDuration = function(arg) {
        if (!arguments.length) return highlightTransDuration;
        highlightTransDuration = arg;
        return axis;
      };

      let repositionLabels = null;
      axis.repositionLabels = function(arg) {
        if (!arguments.length) return repositionLabels;
        repositionLabels = arg;
        return axis;
      };

      let pivot = false;
      axis.pivot = function(arg) {
        if (!arguments.length) return pivot;
        pivot = !!arg;
        return axis;
      };

      let tickValuesMinor = [];
      axis.tickValuesMinor = function(arg) {
        if (!arguments.length) return tickValuesMinor;
        tickValuesMinor = arg;
        return axis;
      };

      let tickSizeMinor = {
        outbound: 0,
        inbound: 0
      };
      axis.tickSizeMinor = function(arg1, arg2) {
        if (!arguments.length) return tickSizeMinor;
        tickSizeMinor = {
          outbound: arg1,
          inbound: arg2 || 0
        };
        meow("setting", tickSizeMinor);
        return axis;
      };

      let options = {};
      axis.labelerOptions = function(arg) {
        if (!arguments.length) return options;
        options = arg;
        return axis;
      };

      axis.METHOD_REPEATING = "repeating specified powers";
      axis.METHOD_DOUBLING = "doubling the value";

      axis.labelFactory = function(options) {
        if (options == null) options = {};
        if (options.scaleType != "linear" &&
          options.scaleType != "time" &&
          options.scaleType != "genericLog" &&
          options.scaleType != "log" &&
          options.scaleType != "ordinal") {
          return axis.ticks(options.limitMaxTickNumber)
            .tickFormat(null)
            .tickValues(null)
            .tickValuesMinor(null)
            .pivot(null)
            .repositionLabels(null);
        }
        if (options.scaleType == "ordinal") return axis;

        if (options.logBase == null) options.logBase = DEFAULT_LOGBASE;
        if (options.stops == null) options.stops = [1, 2, 5, 3, 7, 4, 6, 8, 9];


        if (options.removeAllLabels == null) options.removeAllLabels = false;

        if (options.formatter == null) options.formatter = axis.tickFormat() ?
          axis.tickFormat() : function(d) { return d + ""; };
        options.cssLabelMarginLimit = 5; //px

        if (options.cssMargin == null) options.cssMargin = {};
        if (options.cssMargin.left == null || parseInt(options.cssMargin.left) < options.cssLabelMarginLimit)
          options.cssMargin.left = options.cssLabelMarginLimit + "px";
        if (options.cssMargin.right == null || parseInt(options.cssMargin.right) < options.cssLabelMarginLimit)
          options.cssMargin.right = options.cssLabelMarginLimit + "px";
        if (options.cssMargin.top == null || parseInt(options.cssMargin.top) < options.cssLabelMarginLimit)
          options.cssMargin.top = options.cssLabelMarginLimit + "px";
        if (options.cssMargin.bottom == null || parseInt(options.cssMargin.bottom) < options.cssLabelMarginLimit)
          options.cssMargin.bottom = options.cssLabelMarginLimit + "px";
        if (options.toolMargin == null) options.toolMargin = {
          left: 30,
          bottom: 30,
          right: 30,
          top: 30
        };
        if (options.bump == null) options.bump = 0;
        if (options.viewportLength == null) options.viewportLength = 0;

        if (options.pivotingLimit == null) options.pivotingLimit = options.toolMargin[this.orient()];

        if (options.showOuter == null) options.showOuter = false;
        if (options.limitMaxTickNumber == null) options.limitMaxTickNumber = 0; //0 is unlimited

        const orient = this.orient() == "top" || this.orient() == "bottom" ? HORIZONTAL : VERTICAL;

        if (options.isPivotAuto == null) options.isPivotAuto = orient == VERTICAL;

        if (options.cssFontSize == null) options.cssFontSize = "13px";
        if (options.widthToFontsizeRatio == null) options.widthToFontsizeRatio = 0.75;
        if (options.heightToFontsizeRatio == null) options.heightToFontsizeRatio = 1.20;
        if (options.widthOfOneDigit == null) options.widthOfOneDigit =
          parseInt(options.cssFontSize) * options.widthToFontsizeRatio;
        if (options.heightOfOneDigit == null) options.heightOfOneDigit =
          parseInt(options.cssFontSize) * options.heightToFontsizeRatio;
        if (options.fitIntoScale == null || options.fitIntoScale == "pessimistic") options.fitIntoScale = PESSIMISTIC;
        if (options.fitIntoScale == "optimistic") options.fitIntoScale = OPTIMISTIC;


        meow("********** " + orient + " **********");

        const domain = axis.scale().domain();
        const range = axis.scale().range();
        const lengthRange = Math.abs(range[range.length - 1] - range[0]);

        const min = d3.min([domain[0], domain[domain.length - 1]]);
        const max = d3.max([domain[0], domain[domain.length - 1]]);
        const bothSidesUsed = ((options.scaleType == "linear" ? min < 0 : min <= 0) && max >= 0) && options.scaleType != "time";

        let tickValues = options.showOuter ? [min, max] : [];
        let tickValuesMinor = []; //[min, max];
        let ticksNumber = 5;

        function getBaseLog(x, base) {
          if (x == 0 || base == 0) {
            return 0;
          }
          if (base == null) base = options.logBase;
          return Math.log(x) / Math.log(base);
        }

        // estimate the longest formatted label in pixels
        const estLongestLabelLength =
          //take 17 sample values and measure the longest formatted label
          d3.max(d3.range(min, max, (max - min) / 17).concat(max).map(d => options.formatter(d).replace(".", "").length)) * options.widthOfOneDigit + parseInt(options.cssMargin.left);

        const pivot = options.isPivotAuto && (
          (estLongestLabelLength > options.pivotingLimit) && (orient == VERTICAL)
          ||
          !(estLongestLabelLength > options.pivotingLimit) && !(orient == VERTICAL)
        );

        const labelsStackOnTop = (orient == HORIZONTAL && pivot || orient == VERTICAL && !pivot);


        // conditions to remove labels altogether
        const labelsJustDontFit = (!labelsStackOnTop && options.heightOfOneDigit > options.pivotingLimit);
        if (options.removeAllLabels) return axis.tickValues([]);

        // return a single tick if have only one point in the domain
        if (min == max) return axis.tickValues([min]).ticks(1).tickFormat(options.formatter);


        // LABELS FIT INTO SCALE
        // measure if all labels in array tickValues can fit into the allotted lengthRange
        // approximationStyle can be OPTIMISTIC or PESSIMISTIC
        // in optimistic style the length of every label is added up and then we check if the total pack of symbols fit
        // in pessimistic style we assume all labels have the length of the longest label from tickValues
        // returns TRUE if labels fit and FALSE otherwise
        const labelsFitIntoScale = function(tickValues, lengthRange, approximationStyle, rescalingLabels) {
          if (tickValues == null || tickValues.length <= 1) return true;
          if (approximationStyle == null) approximationStyle = PESSIMISTIC;

          if (labelsStackOnTop) {
            //labels stack on top of each other. digit height matters
            return lengthRange >
              tickValues.length * (
                options.heightOfOneDigit +
              parseInt(options.cssMargin.top) +
              parseInt(options.cssMargin.bottom)
              );
          }

          //labels stack side by side. label width matters
          const marginsLR = parseInt(options.cssMargin.left) + parseInt(options.cssMargin.right);
          const maxLength = d3.max(tickValues.map(d => options.formatter(d).length));

          // log scales need to rescale labels, so that 9 takes more space than 2
          if (rescalingLabels == "log") {
            // sometimes only a fragment of axis is used. in this case we want to limit the scope to that fragment
            // yes, this is hacky and experimental
            lengthRange = Math.abs(axis.scale()(d3.max(tickValues)) - axis.scale()(d3.min(tickValues)));

            return lengthRange >
              d3.sum(tickValues.map(d => (
                options.widthOfOneDigit * (approximationStyle == PESSIMISTIC ? maxLength : options.formatter(
                  d).length) + marginsLR
              )
              // this is a logarithmic rescaling of labels
              * (1 + Math.log(d.toString().replace(/([0.])/g, "")[0]) / Math.LN10)));

          }

          return lengthRange >
            tickValues.length * marginsLR + (approximationStyle == PESSIMISTIC ?
              options.widthOfOneDigit * tickValues.length * maxLength : 0) + (approximationStyle == OPTIMISTIC ?
              options.widthOfOneDigit * (
                tickValues.map(d => options.formatter(d)).join("").length
              ) : 0);
        };


        // COLLISION BETWEEN
        // Check is there is a collision between labels ONE and TWO
        // ONE is a value, TWO can be a value or an array
        // returns TRUE if collision takes place and FALSE otherwise
        const collisionBetween = function(one, two) {
          if (two == null || two.length == 0) return false;
          if (!(two instanceof Array)) two = [two];

          for (let i = 0; i < two.length; i++) {
            if (
              one != two[i] && one != 0 &&
              Math.abs(axis.scale()(one) - axis.scale()(two[i])) <
              (labelsStackOnTop ?
                (options.heightOfOneDigit) :
                (options.formatter(one).length + options.formatter(two[i]).length) * options.widthOfOneDigit / 2
              )
            ) return true;

          }
          return false;
        };

        if (options.scaleType == "genericLog" || options.scaleType == "log") {
          const eps = axis.scale().constant ? axis.scale().constant() : 0;

          const spawnZero = bothSidesUsed ? [0] : [];

          // check if spawn positive is needed. if yes then spawn!
          const spawnPos = max < eps ? [] : (
            d3.range(
              Math.floor(getBaseLog(Math.max(eps, min))),
              Math.ceil(getBaseLog(max)),
              1)
              .concat(Math.ceil(getBaseLog(max)))
              .map(d => Math.pow(options.logBase, d))
          );

          // check if spawn negative is needed. if yes then spawn!
          const spawnNeg = min > -eps ? [] : (
            d3.range(
              Math.floor(getBaseLog(Math.max(eps, -max))),
              Math.ceil(getBaseLog(-min)),
              1)
              .concat(Math.ceil(getBaseLog(-min)))
              .map(d => -Math.pow(options.logBase, d))
          );


          // automatic chosing of method if it's not explicitly defined
          if (options.method == null) {
            const coverage = bothSidesUsed ?
              Math.max(Math.abs(max), Math.abs(min)) / eps :
              Math.max(Math.abs(max), Math.abs(min)) / Math.min(Math.abs(max), Math.abs(min));
            options.method = 10 <= coverage && coverage <= 1024 ? this.METHOD_DOUBLING : this.METHOD_REPEATING;
          }


          //meow('spawn pos/neg: ', spawnPos, spawnNeg);


          if (options.method == this.METHOD_DOUBLING) {
            let doublingLabels = [];
            if (bothSidesUsed) tickValues.push(0);
            const avoidCollidingWith = [].concat(tickValues);

            // start with the smallest abs number on the scale, rounded to nearest nice power
            //var startPos = max<eps? null : Math.pow(options.logBase, Math.floor(getBaseLog(Math.max(eps,min))));
            //var startNeg = min>-eps? null : -Math.pow(options.logBase, Math.floor(getBaseLog(Math.max(eps,-max))));

            const startPos = max < eps ? null : 4 * spawnPos[Math.floor(spawnPos.length / 2) - 1];
            const startNeg = min > -eps ? null : 4 * spawnNeg[Math.floor(spawnNeg.length / 2) - 1];

            //meow('starter pos/neg: ', startPos, startNeg);

            if (startPos) {
              for (let l = startPos; l <= max; l *= 2) doublingLabels.push(l);
            }
            if (startPos) {
              for (let l = startPos / 2; l >= Math.max(min, eps); l /= 2) doublingLabels.push(l);
            }
            if (startNeg) {
              for (let l = startNeg; l >= min; l *= 2) doublingLabels.push(l);
            }
            if (startNeg) {
              for (let l = startNeg / 2; l <= Math.min(max, -eps); l /= 2) doublingLabels.push(l);
            }

            doublingLabels = doublingLabels
              .sort(d3.ascending)
              .filter(d => min <= d && d <= max);

            tickValuesMinor = tickValuesMinor.concat(doublingLabels);

            doublingLabels = groupByPriorities(doublingLabels, false); // don't skip taken values

            const tickValues_1 = tickValues;
            for (let j = 0; j < doublingLabels.length; j++) {

              // compose an attempt to add more axis labels
              const trytofit = tickValues_1.concat(doublingLabels[j])
                .filter(d => !collisionBetween(d, avoidCollidingWith))
                .filter(onlyUnique);

              // stop populating if labels don't fit
              if (!labelsFitIntoScale(trytofit, lengthRange, PESSIMISTIC, "none")) break;

              // apply changes if no blocking instructions
              tickValues = trytofit;
            }
          }


          if (options.method == this.METHOD_REPEATING) {

            let spawn = spawnZero.concat(spawnPos).concat(spawnNeg).sort(d3.ascending);

            options.stops.forEach((stop) => {
              tickValuesMinor = tickValuesMinor.concat(spawn.map(d => d * stop));
            });

            spawn = groupByPriorities(spawn);
            const avoidCollidingWith = spawnZero.concat(tickValues);

            let stopTrying = false;

            options.stops.forEach((stop, i) => {
              if (i == 0) {
                for (let j = 0; j < spawn.length; j++) {

                  // compose an attempt to add more axis labels
                  const trytofit = tickValues
                    .concat(spawn[j].map(d => d * stop))
                    // throw away labels that collide with "special" labels 0, min, max
                    .filter(d => !collisionBetween(d, avoidCollidingWith))
                    .filter(d => min <= d && d <= max)
                    .filter(onlyUnique);

                  // stop populating if labels don't fit
                  if (!labelsFitIntoScale(trytofit, lengthRange, PESSIMISTIC, "none")) break;

                  // apply changes if no blocking instructions
                  tickValues = trytofit;
                }

                // flatten the spawn array
                spawn = [].concat(...spawn);
              } else {
                if (stopTrying) return;

                // compose an attempt to add more axis labels
                const trytofit = tickValues
                  .concat(spawn.map(d => d * stop))
                  .filter(d => min <= d && d <= max)
                  .filter(onlyUnique);

                // stop populating if the new composition doesn't fit
                if (!labelsFitIntoScale(trytofit, lengthRange, PESSIMISTIC, "log")) {
                  stopTrying = true;
                  return;
                }
                // stop populating if the number of labels is limited in options
                if (tickValues.length > options.limitMaxTickNumber && options.limitMaxTickNumber != 0) {
                  stopTrying = true;
                  return;
                }

                // apply changes if no blocking instructions
                tickValues = trytofit;
              }
            });


          } //method


        } //logarithmic


        if (options.scaleType == "linear" || options.scaleType == "time") {
          if (bothSidesUsed) tickValues.push(0);
          const avoidCollidingWith = [].concat(tickValues);

          if (labelsStackOnTop) {
            ticksNumber = Math.max(Math.floor(lengthRange / (options.heightOfOneDigit + parseInt(options.cssMargin.top))), 2);
          } else {
            ticksNumber = Math.max(Math.floor(lengthRange / estLongestLabelLength), 2);
          }

          // limit maximum ticks number
          if (options.limitMaxTickNumber != 0 && ticksNumber > options.limitMaxTickNumber) ticksNumber = options.limitMaxTickNumber;

          let addLabels = axis.scale().ticks(ticksNumber)
            .sort(d3.ascending)
            .filter(d => min <= d && d <= max);

          tickValuesMinor = tickValuesMinor.concat(addLabels);

          addLabels = groupByPriorities(addLabels, false);

          const tickValues_1 = tickValues;
          for (let j = 0; j < addLabels.length; j++) {

            // compose an attempt to add more axis labels
            const trytofit = tickValues_1.concat(addLabels[j])
              .filter(d => !collisionBetween(d, avoidCollidingWith))
              .filter(onlyUnique);

            // stop populating if labels don't fit
            if (!labelsFitIntoScale(trytofit, lengthRange, options.fitIntoScale, "none")) break;

            // apply changes if no blocking instructions
            tickValues = trytofit;
          }

          tickValues = tickValues //.concat(addLabels)
            .filter(d => !collisionBetween(d, avoidCollidingWith))
            .filter(onlyUnique);


        }


        if (tickValues != null && tickValues.length < 2 && !bothSidesUsed) {
          //remove min tick if min, max ticks have collision between them
          tickValues = Math.abs(axis.scale()(min) - axis.scale()(max)) < (labelsStackOnTop ?
            (options.heightOfOneDigit) :
            (options.formatter(min).length + options.formatter(max).length) * options.widthOfOneDigit) ? [max] : [min, max];
          if (tickValues.length == 1 && (options.scaleType == "linear" || options.scaleType == "time")) {
            tickValuesMinor = [];
          }
        }

        if (tickValues != null && tickValues.length <= 3 && bothSidesUsed) {
          if (!collisionBetween(0, [min, max])) {
            tickValues = [min, 0, max];
          } else {
            tickValues = [min, max];
          }
        }

        if (tickValues != null) tickValues.sort((a, b) => (orient == HORIZONTAL ? -1 : 1) * (axis.scale()(b) - axis.scale()(a)));

        if (labelsJustDontFit) tickValues = [];
        tickValuesMinor = tickValuesMinor.filter(d => tickValues.indexOf(d) == -1 && min <= d && d <= max);


        meow("final result", tickValues);

        return axis
          .ticks(ticksNumber)
          .tickFormat(options.formatter)
          .tickValues(tickValues)
          .tickValuesMinor(tickValuesMinor)
          .pivot(pivot)
          .repositionLabels(
            repositionLabelsThatStickOut(tickValues, options, orient, axis.scale(), labelsStackOnTop ? "y" : "x")
          );
      };


      // GROUP ELEMENTS OF AN ARRAY, SO THAT...
      // less-prio elements are between the high-prio elements
      // Purpose: enable adding axis labels incrementally, like this for 9 labels:
      // PRIO 1: +--------, concat result: +-------- first we show only 1 label
      // PRIO 2: ----+---+, concat result: +---+---+ then we add 2 more, that are maximally spaced
      // PRIO 3: --+---+--, concat result: +-+-+-+-+ then we fill spaces with 2 more labels
      // PRIO 4: -+-+-+-+-, concat result: +++++++++ then we fill the remaing spaces and show all labels
      // exception: zero jumps to the front, if it's on the list
      // example1: [1 2 3 4 5 6 7] --> [[1][4 7][2 3 5 6]]
      // example2: [1 2 3 4 5 6 7 8 9] --> [[1][5 9][3 7][2 4 6 8]]
      // example3: [-4 -3 -2 -1 0 1 2 3 4 5 6 7] --> [[0][-4][2][-1 5][-3 -2 1 3 4 6 7]]
      // inputs:
      // array - the source array to be processed. Only makes sense if sorted
      // removeDuplicates - return incremental groups (true, default), or return concatinated result (false)
      // returns:
      // the nested array
      function groupByPriorities(array, removeDuplicates) {
        if (removeDuplicates == null) removeDuplicates = true;

        const result = [];
        const taken = [];

        //zero is an exception, if it's present we manually take it to the front
        if (array.indexOf(0) != -1) {
          result.push([0]);
          taken.push(array.indexOf(0));
        }

        for (let k = array.length; k >= 1; k = k < 4 ? k - 1 : k / 2) {
          // push the next group of elements to the result
          result.push(array.filter((d, i) => {
            if (i % Math.floor(k) == 0 && (taken.indexOf(i) == -1 || !removeDuplicates)) {
              taken.push(i);
              return true;
            }
            return false;
          }));
        }

        return result;
      }


      // REPOSITION LABELS THAT STICK OUT
      // Purpose: the outer labels can easily be so large, they stick out of the allotted area
      // Example:
      // Label is fine:    Label sticks out:    Label sticks out more:    Solution - label is shifted:
      //      12345 |           1234|                123|5                   12345|
      // _______.   |      _______. |           _______.|                 _______.|
      //
      // this is what the function does on the first step (only outer labels)
      // on the second step it shifts the inner labels that start to overlap with the shifted outer labels
      //
      // requires tickValues array to be sorted from tail-first
      // tail means left or bottom, head means top or right
      //
      // dimension - which dimension requires shifting
      // X if labels stack side by side, Y if labels stack on top of one another
      //
      // returns the array of recommended {x,y} shifts

      function repositionLabelsThatStickOut(tickValues, options, orient, scale, dimension) {
        if (!tickValues) return null;
        const result = {};

        // make an abstraction layer for margin sizes
        // tail means left or bottom, head means top or right
        const margin =
          orient == VERTICAL ? {
            head: options.toolMargin.top,
            tail: options.toolMargin.bottom
          } : {
            head: options.toolMargin.right,
            tail: options.toolMargin.left
          };

        let range = scale.range();
        let bump = options.bump;

        //when a viewportLength is given: adjust outer VISIBLE tick values
        //this is helpful when the scaled is zoomed, so labels don't get truncated by a viewport svg
        if (options.viewportLength) {
          //remove invisible ticks from the array
          tickValues = tickValues.filter(d => scale(d) >= 0 && scale(d) <= options.viewportLength);
          //overwrite the available range with viewport limits. direction doesn't matter because we take min-max later anyway
          range = [0, options.viewportLength];
          //reset the bump because zoomed axis has no bump
          bump = 0;
        }

        // STEP 1:
        // for outer labels: avoid sticking out from the tool margin
        tickValues.forEach((d, i) => {
          if (i != 0 && i != tickValues.length - 1) return;

          // compute the influence of the axis head
          let repositionHead = Math.min(margin.head, options.widthOfOneDigit * 0.5) + bump
            + (orient == HORIZONTAL ? 1 : 0) * d3.max(range)
            - (orient == HORIZONTAL ? 0 : 1) * d3.min(range)
            + (orient == HORIZONTAL ? -1 : 1) * scale(d)
            - (dimension == "x") * options.formatter(d).length * options.widthOfOneDigit / 2
            - (dimension == "y") * options.heightOfOneDigit / 2
            // we may consider or not the label margins to give them a bit of spacing from the edges
            - (dimension == "x") * parseInt(options.cssMargin.right)
            - (dimension == "y") * parseInt(options.cssMargin.top);

          // compute the influence of the axis tail
          let repositionTail = Math.min(margin.tail, options.widthOfOneDigit * 0.5) + bump
            + (orient == VERTICAL ? 1 : 0) * d3.max(range)
            - (orient == VERTICAL ? 0 : 1) * d3.min(range)
            + (orient == VERTICAL ? -1 : 1) * scale(d)
            - (dimension == "x") * options.formatter(d).length * options.widthOfOneDigit / 2
            - (dimension == "y") * options.heightOfOneDigit / 2
            // we may consider or not the label margins to give them a bit of spacing from the edges
            - (dimension == "x") * parseInt(options.cssMargin.left)
            - (dimension == "y") * parseInt(options.cssMargin.bottom);

          // apply limits in order to cancel repositioning of labels that are good
          if (repositionHead > 0) repositionHead = 0;
          if (repositionTail > 0) repositionTail = 0;

          // add them up with appropriate signs, save to the axis
          result[d] = { x: 0, y: 0 };
          result[d][dimension] = (dimension == "y" && orient == VERTICAL ? -1 : 1) * (repositionHead - repositionTail);
        });


        // STEP 2:
        // for inner labels: avoid collision with outer labels
        tickValues.forEach((d, i) => {
          if (i == 0 || i == tickValues.length - 1) return;

          // compute the influence of the head-side outer label
          let repositionHead =
            // take the distance between head and the tick at hand
            Math.abs(scale(d) - scale(tickValues[tickValues.length - 1]))

            // substract the shift of the head TODO: THE SIGN CHOICE HERE MIGHT BE WRONG. NEED TO TEST ALL CASES
            - (dimension == "y") * (orient == HORIZONTAL ? -1 : 1) * result[tickValues[tickValues.length - 1]][dimension]
            - (dimension == "x") * (orient == HORIZONTAL ? 1 : -1) * result[tickValues[tickValues.length - 1]][dimension]

            // substract half-length of the overlapping labels
            - (dimension == "x") * options.widthOfOneDigit / 2 * options.formatter(d).length
            - (dimension == "x") * options.widthOfOneDigit / 2 * options.formatter(tickValues[tickValues.length - 1]).length
            - (dimension == "y") * options.heightOfOneDigit * 0.7 //TODO remove magic constant - relation of actual font height to BBox-measured height

            // we may consider or not the label margins to give them a bit of spacing from the edges
            - (dimension == "x") * parseInt(options.cssMargin.left)
            - (dimension == "y") * parseInt(options.cssMargin.bottom);

          // compute the influence of the tail-side outer label
          let repositionTail =
            // take the distance between tail and the tick at hand
            Math.abs(scale(d) - scale(tickValues[0]))

            // substract the shift of the tail TODO: THE SIGN CHOICE HERE MIGHT BE WRONG. NEED TO TEST ALL CASES
            - (dimension == "y") * (orient == VERTICAL ? -1 : 1) * result[tickValues[0]][dimension]
            - (dimension == "x") * (orient == VERTICAL ? 1 : -1) * result[tickValues[0]][dimension]

            // substract half-length of the overlapping labels
            - (dimension == "x") * options.widthOfOneDigit / 2 * options.formatter(d).length
            - (dimension == "x") * options.widthOfOneDigit / 2 * options.formatter(tickValues[0]).length
            - (dimension == "y") * options.heightOfOneDigit * 0.7 //TODO remove magic constant - relation of actual font height to BBox-measured height

            // we may consider or not the label margins to give them a bit of spacing from the edges
            - (dimension == "x") * parseInt(options.cssMargin.left)
            - (dimension == "y") * parseInt(options.cssMargin.bottom);

          // apply limits in order to cancel repositioning of labels that are good
          if (repositionHead > 0) repositionHead = 0;
          if (repositionTail > 0) repositionTail = 0;

          // add them up with appropriate signs, save to the axis
          result[d] = { x: 0, y: 0 };
          result[d][dimension] = (dimension == "y" && orient == VERTICAL ? -1 : 1) * (repositionHead - repositionTail);
        });


        return result;
      } // function repositionLabelsThatStickOut()


      axis.copy = function() {
        return d3_axis_smart(d3["axis" + capitalize(_orient)]());
      };

      axis.orient = function() {
        if (!arguments.length) return _orient;
        return axis;
      };

      return rebind(axis, _super,
        "scale", "ticks", "tickArguments", "tickValues", "tickFormat",
        "tickSize", "tickSizeInner", "tickSizeOuter", "tickPadding"
      );


      function meow() {
        if (!axis.labelerOptions().isDevMode) return;
        console.log(...arguments);
      }

    })(d3["axis" + capitalize(_orient)]());

  }

  //d3.svg.collisionResolver

  function collisionResolver$1() {
    return (function collision_resolver() {
      const DURATION = 300;
      let labelHeight = 0;
      // MAINN FUNCTION. RUN COLLISION RESOLVER ON A GROUP g
      function resolver(g) {
        if (selector == null) {
          console.warn("D3 collision resolver stopped: missing a CSS slector");
          return;
        }
        if (height == null) {
          console.warn("D3 collision resolver stopped: missing height of the canvas");
          return;
        }
        if (value == null) {
          console.warn(
            "D3 collision resolver stopped: missing pointer within data objects. Example: value = 'valueY' ");
          return;
        }
        if (KEY == null) {
          console.warn("D3 collision resolver stopped: missing a key for data. Example: key = 'geo' ");
          return;
        }
        if (!g.node()) {
          console.warn("D3 collision resolver stopped: missing the target DOM element", g);
          return;
        }
        labelHeight = g.node().getBBox().height * 0.8;
        //actually reposition the labels
        const data = g.filter(d => filter(d, time))
          .sort((x, y) => d3.ascending(x.valueY, y.valueY))
          .data();
        const keys = {};
        for (let i = 0; i < data.length - 1; i++) {
          const first = data[i];
          const second = data[i + 1];
          if (!first.shiftY) first.shiftY = 0;
          second.shiftY = 0;
          if ((second.valueY - first.valueY - first.shiftY) >= labelHeight) continue;
          let upperAvailable = 0;
          // calculate available space above first element
          if (first.valueY > labelHeight) {
            if (i == 0) {
              upperAvailable = Math.min(labelHeight, first.valueY);
            } else if (first.valueY - data[i - 1].valueY + data[i - 1].shiftY > labelHeight) {
              upperAvailable = Math.min(labelHeight, first.valueY - data[i - 1].valueY + data[i - 1].shiftY);
            }
          }
          first.upperAvailable = upperAvailable;
          let underAvailable = 0;
          // calculate available space under second element
          if (second.valueY < height) {
            if (i == data.length - 2) {
              underAvailable = Math.min(labelHeight, height - second.valueY);
            } else if (data[i + 2].valueY - second.valueY > labelHeight) {
              underAvailable = Math.min(labelHeight, data[i + 2].valueY - second.valueY);
            }
          }
          second.underAvailable = underAvailable;
          const neededSpace = labelHeight - (second.valueY - first.valueY - first.shiftY);
          keys[first[KEY]] = {};
          keys[second[KEY]] = {};
          if (upperAvailable >= neededSpace / 2 && underAvailable >= neededSpace / 2) {
            first.shiftY = -neededSpace / 2;
            second.shiftY = neededSpace / 2;
          } else if (upperAvailable >= neededSpace / 2) {
            second.shiftY = underAvailable;
            first.shiftY = -Math.min(upperAvailable, neededSpace - underAvailable);
          } else if (underAvailable >= neededSpace / 2) {
            first.shiftY -= upperAvailable;
            second.shiftY = Math.min(underAvailable, neededSpace - upperAvailable);
          } else {
            first.shiftY = -upperAvailable;
            second.shiftY = underAvailable;
          }
          keys[first[KEY]].valueY = first.valueY + first.shiftY;
          keys[second[KEY]].valueY = second.valueY + second.shiftY;
        }
        g.each(function(d) {
          if (keys[d[KEY]] && keys[d[KEY]].valueY) {
            d3.select(this).selectAll(selector).transition().duration(DURATION).attr("transform", "translate(0," +
              keys[d[KEY]].valueY + ")");
          }
        });
      }

      // GETTERS AND SETTERS

      let selector = null;
      resolver.selector = function(arg) {
        if (!arguments.length)
          return selector;
        selector = arg;
        return resolver;
      };
      let height = null;
      resolver.height = function(arg) {
        if (!arguments.length)
          return height;
        height = arg;
        return resolver;
      };
      let scale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, 1]);
      resolver.scale = function(arg) {
        if (!arguments.length)
          return scale;
        scale = arg;
        return resolver;
      };
      let value = null;
      resolver.value = function(arg) {
        if (!arguments.length)
          return value;
        value = arg;
        return resolver;
      };
      let time = null;
      resolver.time = function(arg) {
        if (!arguments.length)
          return time;
        time = arg;
        return resolver;
      };
      let filter = function() { return true; };
      resolver.filter = function(arg) {
        if (!arguments.length)
          return filter;
        filter = arg;
        return resolver;
      };
      let fixed = null;
      resolver.fixed = function(arg) {
        if (!arguments.length)
          return fixed;
        fixed = arg;
        return resolver;
      };
      let handleResult = null;
      resolver.handleResult = function(arg) {
        if (!arguments.length)
          return handleResult;
        handleResult = arg;
        return resolver;
      };
      let KEY = null;
      resolver.KEY = function(arg) {
        if (!arguments.length)
          return KEY;
        KEY = arg;
        return resolver;
      };
      return resolver;
    })();
  }

  class TextEllipsis$1 {
    constructor(context) {
      this.context = context;
      this.interact = this._createInteract();
    }

    setTooltip(tooltip) {
      this.tooltip = tooltip;
    }

    _createInteract() {
      const _this = this;
      return {
        mouseOver(event) {
          const mouse = d3.pointer(event);
          _this._setTooltip(d3.select(event.target).attr("data-text"), mouse[0], mouse[1]);
        },
        mouseOut() {
          _this._setTooltip();
        },
        tap() {

        }
      };
    }

    _setTooltip(tooltipText, x, y) {
      if (tooltipText) {

        //position tooltip
        this.tooltip.classed("vzb-hidden", false)
        //.attr("style", "left:" + (mouse[0] + 50) + "px;top:" + (mouse[1] + 50) + "px")
          .selectAll("text")
          .text(tooltipText);

        const contentBBox = this.tooltip.select("text").node().getBBox();
        if (x - contentBBox.width < 0) {
          x += contentBBox.width + 5; // corrective to the block Radius and text padding
        } else {
          x -= 5; // corrective to the block Radius and text padding
        }
        if (y - contentBBox.height < 0) {
          y += contentBBox.height;
        } else {
          y -= 11; // corrective to the block Radius and text padding
        }

        this.tooltip.attr("transform", "translate(" + x + "," + y + ")");

        this.tooltip.selectAll("rect")
          .attr("width", contentBBox.width + 8)
          .attr("height", contentBBox.height * 1.2)
          .attr("x", -contentBBox.width - 4)
          .attr("y", -contentBBox.height * 0.85)
          .attr("rx", contentBBox.height * 0.2)
          .attr("ry", contentBBox.height * 0.2);

      } else {
        this.tooltip.classed("vzb-hidden", true);
      }
    }

    clear(selection) {
      selection.attr("data-text", null);
    }

    wrap(_this, width) {
      const textEl = d3.select(_this);

      const abs = Math.abs;
      let initialText = textEl.attr("data-text");
      if (!initialText) {
        initialText = textEl.text();
        textEl.attr("data-text", initialText);
      }
      textEl.text(initialText);
      let text = initialText;
      let textLength = text.length;
      let textWidth = textEl.node().getComputedTextLength();

      while (width - textWidth <= 0 && text !== "") {
        text = (textWidth >= width) ? text.slice(0, -abs(textLength * 0.5)) : initialText.slice(0, abs(textLength * 0.5));
        textEl.text(text + "…");
        textWidth = textEl.node().getComputedTextLength();
        textLength = text.length;
      }

      if (text !== initialText) {
        if (text === "") {
          textEl.text(initialText[0]);
        }
        textEl
          .on("mouseover.tooltip", this.interact.mouseOver)
          .on("mouseout.tooltip", this.interact.mouseOut)
          .style("pointer-events", "all");
      } else {
        textEl
          .on("mouseover.tooltip", null)
          .on("mouseout.tooltip", null)
          .style("pointer-events", null);
      }
    }

  }

  function detectTouchEvent(element, onTap, onLongTap) {
    var start;
    var coordX;
    var coordY;
    var namespace = onTap ? ".onTap" : ".onLongTap";
    d3.select(element)
      .on("touchstart" + namespace, function(event) {
        start = event.timeStamp;
        coordX = event.changedTouches[0].screenX;
        coordY = event.changedTouches[0].screenY;
      })
      .on("touchend" + namespace, function(event, d) {
        coordX = Math.abs(coordX - event.changedTouches[0].screenX);
        coordY = Math.abs(coordY - event.changedTouches[0].screenY);
        if (coordX < 5 && coordY < 5) {
          if (event.timeStamp - start < 500)
            return onTap ? onTap(event, d) : undefined;
          return onLongTap ? onLongTap(event, d) : undefined;
        } else return undefined;
      });
  }

  //d3.selection.prototype.onTap
  var onTap = function(callback) {
    return this.each(function() {
      detectTouchEvent(this, callback);
    });
  };

  //d3.selection.prototype.onLongTap
  var onLongTap = function(callback) {
    return this.each(function() {
      detectTouchEvent(this, null, callback);
    });
  };

  d3.selection.prototype.onTap = onTap;
  d3.selection.prototype.onLongTap = onLongTap;

  const versionInfo = {version: "1.19.1", build: 1635434611877, package: {"contributors":[{"name":"Jasper","url":"https://github.com/jheeffer"},{"name":"Angie","url":"https://github.com/angieskazka"},{"name":"Dima","url":"https://github.com/dab2000"},{"name":"Ola","url":"https://github.com/olarosling"}],"author":{"name":"Gapminder Foundation","url":"https://www.gapminder.org","email":"info@gapminder.org"},"homepage":"https://github.com/vizabi/@vizabi/shared-components#readme","name":"@vizabi/shared-components","description":"Vizabi shared components"}};
  const Icons = iconset;
  const Utils = _Utils;
  const LegacyUtils = _LegacyUtils;
  const axisSmart = axisSmart$1;
  const collisionResolver = collisionResolver$1;
  const TextEllipsis = TextEllipsis$1;

  class BaseService {

    isService() {return true;}

    constructor(config = {}){
      this.config = config;
      this.setup();
    }

    deconstruct() {}
    setup() {}
  }

  class CapitalVizabiService extends BaseService {

    setup(){
      this.Vizabi = this.config.Vizabi;
    }

    deconstruct() {
      delete this.Vizabi;
    }
  }

  const PROFILES = [
    {
      id: "LARGE",
      min_width: 900,
      min_height: 520
    },
    {
      id: "MEDIUM",
      min_width: 600,
      min_height: 400
    },
    {
      id: "SMALL",
      min_width: 1,
      min_height: 1
    }
  ];

  const CSS_PLACEHOLDER_CLASS = "vzb-tool";
  const CSS_CLASS_PREFIX = "vzb-";
  const CSS_LANDSCAPE_CLASS = "vzb-landscape";
  const CSS_PORTRAIT_CLASS = "vzb-portrait";
  const CSS_PROJECTOR_CLASS = "vzb-presentation";

  class _LayoutService extends BaseService {

    static DEFAULTS = {
      projector: false,
      placeholder: "body"
    }

    setup(){
      this.name = "layout";
      this.status = STATUS.INIT;
      this.width = 1;
      this.height = 1;
      this.size = this.getSize();
      this.profile = "SMALL";
      this.placeholder = this.config.placeholder || this.constructor.DEFAULTS.placeholder;
      this.hGrid = [];
      this.element = d3.select(this.placeholder)
        .classed(CSS_PLACEHOLDER_CLASS, true);
      this._resizeHandler();

      const resizeHandler = this._resizeHandler.bind(this);
      window.addEventListener("resize", resizeHandler);
      this.removeListener = function() {
        window.removeEventListener("resize", resizeHandler);
      };

      this.removeProjectorListener = mobx.autorun(() => {
        this.setProjector.bind(this)();
      }, {name: "Layout.js: setProjector()"});
    }

    deconstruct(){
      this.removeProjectorListener();
      this.removeListener();
      super.deconstruct();
    }

    get projector() {
      return this.config.projector || this.constructor.DEFAULTS.projector;
    }

    set projector(projector) {
      this.config.projector = projector;
    }

    getSize() {
      const { width, height } = this;
      return { width, height };
    }

    _resizeHandler(){
      mobx.action("Layout.js: _resizeHandler()", ()=>{
        this.width = this.element.node().clientWidth;
        this.height = this.element.node().clientHeight;
        const profile = PROFILES.find(p => (this.width >= p.min_width && this.height >= p.min_height));

        if (!profile) {
          this.profile = "SMALL";
          this.status = STATUS.ERROR;
          console.warn(`
          Layout service: nothing should be rendered, because
          placeholder ${this.placeholder} has display:none or is too little: ${this.width} x ${this.height} px
        `);
        } else {
          this.element.classed(CSS_CLASS_PREFIX + this.profile.toLowerCase(), false);
          this.profile = profile.id;
          this.element.classed(CSS_CLASS_PREFIX + this.profile.toLowerCase(), true);
          this.element.classed(CSS_LANDSCAPE_CLASS, this.width > this.height);
          this.element.classed(CSS_PORTRAIT_CLASS, !(this.width > this.height));
          
          this.status = STATUS.READY;
        }
        this.size = this.getSize();
      })();
    }

    getProfileConstants(normalConstants = {}, forProjector = {}){
      if (!this.projector) 
        return normalConstants[this.profile] || {};
      else
        return Object.assign({}, normalConstants[this.profile] || {}, forProjector[this.profile] || {});
    }

    setProjector() {
      this.element.classed(CSS_PROJECTOR_CLASS, this.projector);
      this.size = this.getSize();
    }

    setHGrid(value) {
      mobx.action(() => {
        this.hGrid = value;
      })();
    }
  }

  const LayoutService = mobx.decorate(_LayoutService, {
    "size": mobx.observable.ref, //reference watches when new object is created
    "hGrid": mobx.observable,
    "projector": mobx.computed,
    "width": mobx.observable,
    "height": mobx.observable,
    "profile": mobx.observable,
    "status": mobx.observable
  });

  const FALLBACK_PATH = "./assets/locale/";
  const FALLBACK_ID = "en";
  const RTL_CSS_CLASS = "vzb-rtl";

  class _LocaleService extends BaseService {

    static DEFAULTS = {
      id: FALLBACK_ID,
      path: FALLBACK_PATH,
      placeholder: "body"
    }

    setup(){
      this.status = STATUS.INIT;
      this.path = this.config.path || this.constructor.DEFAULTS.path;
      this.placeholder = this.config.placeholder || this.constructor.DEFAULTS.placeholder;
      this.element = d3.select(this.placeholder);
      this.content = {};

      this.removeLoadFileAutorun = mobx.autorun(this._loadFile.bind(this), {name: "Locale.js: _loadFile()"});
      this.removeApplyRTL = mobx.autorun(this._applyRTL.bind(this), {name: "Locale.js: _applyRTL()"});
    }

    get id() {
      return this.config.id || this.constructor.DEFAULTS.id;
    }

    set id(id) {
      mobx.runInAction(() => {
        this.config.id = id;
        Vizabi.stores.dataSources.getAll().forEach(e => e.config.locale = id);
      });
    }

    deconstruct(){
      this.removeLoadFileAutorun();
      super.deconstruct();
    }

    _applyRTL() {
      if (this.status !== STATUS.READY) return;
      this.element.classed(RTL_CSS_CLASS, this.isRTL());
    }

    _loadFile(){
      this.status = STATUS.PENDING;

      const readers = [d3.json(this.path + this.id + ".json")];
      if (this.id != FALLBACK_ID && !this.content[FALLBACK_ID]) {
        readers.push(d3.json(this.path + FALLBACK_ID + ".json"));
      }
      Promise.all(readers)
        .then((content) => {
          this.content[this.id] = content[0];
          if (content[1]) this.content[FALLBACK_ID] = content[1];
          this._initFormatters();
          this.status = STATUS.READY;
        })
        .catch((error) => {
          this.state = STATUS.ERROR;
          throw error;
        });
    }

    _initFormatters(){
      this.numberF = function (x,  options) {
          
        // share works like rounded if set to SHARE, but multiplies by 100 and suffixes with "%"
        // percent works like rounded if set to PERCENT, but suffixes with "%"
        const SHARE = "share";
        const PERCENT = "percent";
        const NOSUFFIX = "nosuffix";
        const EPSILON = 0.00000000000001;

        if (options === SHARE) x *= 100;
    
        if (Math.abs(x) < EPSILON) return "0";
    
        const format = "r"; //rounded format. use "f" for fixed
        const prec = 3; //round to so many significant digits
    
        let suffix = "";
        if (options === NOSUFFIX) return d3.format("." + prec + format)(x);
    
        //---------------------
        // BEAUTIFIERS GO HOME!
        // don't break formatting please
        //---------------------
        // the tiny constant compensates epsilon-error when doing logarithms
        /* eslint-disable */
        switch (Math.floor(Math.log(Math.abs(x)) / Math.LN10 + EPSILON)) {
          case -13: x *= 1000000000000; suffix = "p"; break; //0.1p
          case -10: x *= 1000000000; suffix = "n"; break; //0.1n
          case -7: x *= 1000000; suffix = "µ"; break; //0.1µ
          case -6: x *= 1000000; suffix = "µ"; break; //1µ
          case -5: x *= 1000000; suffix = "µ"; break; //10µ
          case -4: break; //0.0001
          case -3: break; //0.001
          case -2: break; //0.01
          case -1: break; //0.1
          case 0:  break; //1
          case 1:  break; //10
          case 2:  break; //100
          case 3:  break; //1000
          case 4:  x /= 1000; suffix = "k"; break; //10k
          case 5:  x /= 1000; suffix = "k"; break; //100k
          case 6:  x /= 1000000; suffix = "M"; break; //1M
          case 7:  x /= 1000000; suffix = "M"; break; //10M
          case 8:  x /= 1000000; suffix = "M"; break; //100M
          case 9:  x /= 1000000000; suffix = "B"; break; //1B
          case 10: x /= 1000000000; suffix = "B"; break; //10B
          case 11: x /= 1000000000; suffix = "B"; break; //100B
          case 12: x /= 1000000000000; suffix = "TR"; break; //1TR
          case 13: x /= 1000000000000; suffix = "TR"; break; //10TR
          case 14: x /= 1000000000000; suffix = "TR"; break; //100TR
          //use the D3 SI formatting for the extreme cases
          default: return (d3.format("." + prec + "s")(x)).replace("G", "B");
        }
        /* eslint-enable */
    
        let formatted = d3.format("." + prec + format)(x);
        //remove trailing zeros if dot exists to avoid numbers like 1.0M, 3.0B, 1.500, 0.9700, 0.0
        if (formatted.indexOf(".") > -1) formatted = formatted.replace(/0+$/, "").replace(/\.$/, "");
    
        // use manual formatting for the cases above
        return (formatted + suffix + (options === PERCENT || options === SHARE ? "%" : ""));
      };

      this.dateF = {
        year: d3.timeFormat("%Y"),
        month: d3.timeFormat("%Y-%m"),
        day: d3.timeFormat("%Y-%m-%d"),
        week: d3.timeFormat("%Yw%V"),
        quarter: d3.timeFormat("%Yq%q")
      };

      this.stringF = function(string){
        //the inline conditionals are needed because some translation files are stuck in cache 
        //and don't have the "dictionary" object but have strings in the root instead
        let translated = this.content[this.id].dictionary? this.content[this.id].dictionary[string] : this.content[this.id][string];
        if (translated || translated === "") return translated;
        translated = this.content[FALLBACK_ID].dictionary? this.content[FALLBACK_ID].dictionary[string] : this.content[FALLBACK_ID][string];
        if (translated || translated === "") return translated;
        return string;
      };
    }
    
    getFormattedNumber(arg) {
      return this.numberF(arg);
    }

    getFormattedDate(arg, dateIntervalSize) {
      return this.dateF[dateIntervalSize](arg);
    }
    
    getUIstring(arg) {
      return this.stringF(arg);
    }

    auto(dateIntervalSize = "year"){
      return (function(arg){
        // null, NaN and undefined are bypassing any formatter
        if (!arg && arg !== 0 && arg !== "") return arg;
        if (typeof arg === "number") return this.getFormattedNumber(arg);
        if (arg instanceof Date) return this.getFormattedDate(arg, dateIntervalSize);
        if (typeof arg === "string") return this.getUIstring(arg);
      }).bind(this);
    }

    isRTL(){
      return !!this.content[this.id].rtl;
    }
  }

  const LocaleService = mobx.decorate(_LocaleService, {
    "id": mobx.computed,
    "status": mobx.observable
  });

  function ui(defaults = {}, config = {}, baseConfig = {}) {
    const _ui = {};
    const defaultKeys = Object.getOwnPropertyNames(defaults);
    const configKeys = Object.getOwnPropertyNames(config);
    const baseConfigKeys = Object.getOwnPropertyNames(baseConfig);

    for (let key of new Set([...defaultKeys, ...configKeys, ...baseConfigKeys])) {
      if (typeof defaults[key] !== "function" && (isPlainObject(config[key]) || isPlainObject(baseConfig[key]) || isPlainObject(defaults[key]))) {
        if (!config[key]) mobx.extendObservable(config, {[key] : {}});
                  
        _ui[key] = ui(defaults[key], config[key], baseConfig[key]);
      } else {
        const descriptor = {
          get() {
            return (typeof config[key] !== "undefined") ? config[key] : 
              (typeof baseConfig[key] !== "undefined") ? baseConfig[key] : 
                typeof defaults[key] === "function" ? deepClone(defaults[key]()) : defaults[key];
          },
          set(value) {
            if (typeof config[key] !== "undefined" && value == defaults[key]) {
              delete config[key];
            } else {
              config[key] = value;
            }
          },
          enumerable: true,
          configurable: true
        };
        Object.defineProperty(_ui, key, descriptor);
      }
    }
    return mobx.observable(_ui);
  }

  // export function ui2(defaults = {}, config, parentConfig = {}) {
  //     const _ui = {};
  //     const defaultKeys = Object.keys(defaults);
  //     const configKeys = Object.keys(config);
  //     const parentConfigKeys = Object.keys(config);

  //     for (let key of new Set([...defaultKeys, ...configKeys, ...parentConfigKeys])) {
  //         const descriptor = {
  //             get() {
  //                 if (utils.isPlainObject(config[key]) || utils.isPlainObject(config[key])) {
  //                     return ui2(defaults[key], config[key] || (config[key] = {}), parentConfig[key]);
  //                 }
  //                 return (typeof config[key] !== "undefined") ? config[key] : 
  //                     (typeof parentConfig[key] !== "undefined") ? parentConfig[key] : defaults[key];
  //             },
  //             set(value) { config[key] = value },
  //             enumerable: true,
  //             configurable: true
  //         };
  //         Object.defineProperty(_ui, key, descriptor);
  //     }
  //     return observable(_ui);
  // }

  class _BaseComponent {

    constructor({placeholder, model, services, subcomponents, template, id, parent, root, name, ui, default_ui = {}, state, options }){
      this.id = id || "c0";
      //this.status = STATUS.INIT;
      this.template = template || "";
      this.subcomponents = subcomponents || [];
      this.services = services || {};
      this.model = model;
      this.state = state || {};
      this.parent = parent || null;
      this.children = [];
      this.root = root || this;
      this.name = name || "";
      this.options = options || {};

      this.reactions = new Map();

      //append the template to placeholder
      const scope = this.parent && this.parent.element ? this.parent.element : d3; //d3 would search global scope
      this.element = scope.select(placeholder).html(this.template);
      if(!this.element.node()) console.warn(`
      Vizabi component ${this.constructor.name} id: ${this.id} name: ${this.name} 
      can't find placeholder to render: 
      ${placeholder} 
      Please check that placeholder exists and is correctly specified in the component initialisation.
    `, this);

      this.DEFAULT_UI = deepExtend(default_ui, deepExtend(deepExtend({}, this.constructor.DEFAULT_UI), default_ui));

      this.ui = this.setupUI(this.DEFAULT_UI, ui);

      this.subcomponents.forEach( (comp, index) => {
        if(!comp.type) {
          console.error(`
          Was unable to find a subcomponent "${comp.name}"
          while building a component tree in parent "${this.name}".
          This can be due to a misconfiguration, error in parent "subcomponents" definitions
          or that subcomponent in question isn't registered or available to code. Hard to tell...
        `, comp);
        } else {
          const subcomponent = new comp.type({
            placeholder: comp.placeholder,
            model: comp.model || this.model,
            services: this.services,
            id: this.id + "-" + index,
            parent: this,
            root: this.root,
            ui: this.getUI(comp, ui),
            default_ui: comp.default_ui || this.getUI(comp, default_ui),
            state: comp.state,
            name: comp.name,
            template: comp.template,
            options: comp.options,
          });
          this.children.push(subcomponent);
        }
      });

      this.setup(this.options);
      this.addReaction(this.draw);
      this.addReaction(this.loading, true);
      this.addReaction(this.resize);
    }

    getUI(comp, ui) {
      const name = comp.name;
      if (name && !ui[name]) ui[name] = {};
      return name ? ui[name] : ui;
    }

    setupUI(defaults, ui$1, baseUI) {
      return ui(defaults, ui$1, baseUI);
    }

    addReaction(method, ignoreStatus){
      if(!method) return warn("Basecomponent: addReaction() method not found", method);
      if(!this.reactions.has(method)){
        this.reactions.set(method, 
          mobx.autorun(() => {
            if(ignoreStatus || this.status === STATUS.READY) method.bind(this)();
          }, {
            name: method.name, 
            onError: (err) => {
              this.element.classed("vzb-loading-data", false);
              this.error(err);
            }
          })
        );
      }
    }
    removeReaction(method){
      if(this.reactions.has(method)){
        //kill mobx autoruns and reactions
        this.reactions.get(method)();
        this.reactions.delete(method);
      }
    }
    removeAllReactions(){
      this.reactions.forEach((_disposer, method) => this.removeReaction(method));
    }

    findChild({name, id, type}){
      if (this.name === name || this.id === id || this.constructor.name === type) return this;
      return this.children.find(c => c.findChild({name, id, type}));
    }

    deconstruct(){
      // deconstruct and remove subcomponents
      if (this.children.length) {
        this.children.forEach(c => {
          c.deconstruct(); 
          c = void 0;
        });
      }
      this.removeAllReactions();
      // deconstruct and remove services
      if (this.root == this){
        Object.values(this.services).forEach(s => {
          s.deconstruct();
          s = void 0;
        });
      }
    }

    get status() {
      const dependencies = Object.values(this.services).map((m)=>m.status)
        .concat(this.children.map((m)=>m.status))
        .concat(this.model.state);

      if (dependencies.every(dep => dep === STATUS.READY || dep == undefined))
        return STATUS.READY;
      else if (dependencies.some(dep => dep === STATUS.ERROR))
        return STATUS.ERROR;
      else
        return STATUS.PENDING;
    }

    setup() {}
    draw() {}
    loading() {
      if (this.options.showLoading)
        this.element.classed("vzb-loading-data", this.status == STATUS.PENDING);
    }
    error(err) {console.warn(err);}
    resize() {}
  }

  _BaseComponent.DEFAULT_UI = {};

  const BaseComponent = mobx.decorate(_BaseComponent, {
    //"status": observable,
    "status": mobx.computed,
    "state": mobx.observable
  });

  /*!
   * VIZABI BUTTONLIST
   * Reusable buttonlist component
   */

  //default existing buttons
  const class_active$2 = "vzb-active";
  const class_hidden = "vzb-hidden";
  const class_active_locked = "vzb-active-locked";
  const class_unavailable = "vzb-unavailable";

  class ButtonList extends BaseComponent {

    constructor(config) {

      super(config);
    } 

    setup() {

      this._available_buttons = {
        "find": {
          title: "buttons/find",
          icon: "search",
          required: false
        },
        "show": {
          title: "buttons/show",
          icon: "asterisk",
          required: false
        },
        "moreoptions": {
          title: "buttons/more_options",
          icon: "gear",
          required: true
        },
        "colors": {
          title: "buttons/colors",
          icon: "paintbrush",
          required: false
        },
        "mapcolors": {
          title: "buttons/mapcolors",
          icon: "paintbrush",
          required: false
        },
        "size": {
          title: "buttons/size",
          icon: "circle",
          required: false
        },
        "zoom": {
          title: "buttons/zoom",
          icon: "cursorPlus",
          required: false
        },
        "fullscreen": {
          title: "buttons/expand",
          icon: "expand",
          func: this.toggleFullScreen.bind(this),
          required: true
        },
        "trails": {
          title: "buttons/trails",
          icon: "trails",
          func: this.toggleBubbleTrails.bind(this),
          required: false,
          statebind: "MDL.trail.show",
          statebindfunc: this.setBubbleTrails.bind(this)
        },
        "forecast": {
          title: "buttons/forecast",
          icon: "forecast",
          func: this.toggleTimeForecast.bind(this),
          required: false,
          statebind: "MDL.frame.showForecast",
          statebindfunc: this.setTimeForecast.bind(this)
        },
        "lock": {
          title: "buttons/lock",
          icon: "lock",
          func: this.toggleBubbleLock.bind(this),
          required: false,
          statebind: "root.ui.chart.lockNonSelected",
          statebindfunc: this.setBubbleLock.bind(this)
        },
        "inpercent": {
          title: "buttons/inpercent",
          icon: "percent",
          func: this.toggleInpercent.bind(this),
          required: false,
          statebind: "root.ui.chart.inpercent",
          statebindfunc: this.setInpercent.bind(this)
        },
        "presentation": {
          title: "buttons/presentation",
          icon: "presentation",
          func: this.togglePresentationMode.bind(this),
          required: false,
          statebind: "root.ui.presentation",
          statebindfunc: this.setPresentationMode.bind(this)
        },
        "sidebarcollapse": {
          title: "buttons/sidebar_collapse",
          icon: "angleDoubleLeft",
          func: this.toggleSidebarCollapse.bind(this),
          required: true,
          statebind: "root.ui.sidebarCollapse",
          statebindfunc: this.setSidebarCollapse.bind(this),
          ignoreSize: true
        },
        "about": {
          title: "buttons/about",
          icon: "about",
          required: false
        },
        "repeat": {
          title: "buttons/repeat",
          icon: "repeat",
          required: false
        },
        "axes": {
          title: "buttons/axes",
          icon: "axes",
          required: false
        },
        "axesmc": {
          title: "buttons/axesmc",
          icon: "axes",
          required: false
        },
        "stack": {
          title: "buttons/stack",
          icon: "stack",
          required: false
        },
        "side": {
          title: "buttons/side",
          icon: "side",
          required: false
        },
        "_default": {
          title: "Button",
          icon: "asterisk",
          required: false
        }
      };

      this._active_comp = false;

      // this.model_binds = {
      //   "change:state.marker.select": function(evt, path) {
      //     if (!_this._readyOnce) return;
      //     if (path.indexOf("select.labelOffset") !== -1) return;

      //     _this.setBubbleTrails();
      //     _this.setBubbleLock();
      //     _this._toggleButtons();


      //     //scroll button list to end if bottons appeared or disappeared
      //     // if(_this.entitiesSelected_1 !== (_this.model.state.marker.select.length > 0)) {
      //     //   _this.scrollToEnd();
      //     // }
      //     // _this.entitiesSelected_1 = _this.model.state.marker.select.length > 0;
      //   },
      //   "change:ui.chart": function(evt, path) {
      //     if (!_this._readyOnce) return;

      //     if (path.indexOf("lockActive") > -1 || path.indexOf("lockUnavailable") > -1) {
      //       _this.setBubbleLock();
      //     }
      //   }
      // };

      // config.ui is same as this.model.ui here but this.model.ui is not yet available because constructor hasn't been called.
      // can't call constructor earlier because this.model_binds needs to be complete before calling constructor
      // builds model
      //this._super(config, context);

      this.validatePopupButtons(this.root.ui.buttons.buttons, this.root.ui.dialogs.dialogs);

      this.element.selectAll("div").remove();

      // // // // this.root.findChildByName("gapminder-dialogs").on("close", (evt, params) => {
      // // // //   _this.setButtonActive(params.id, false);
      // // // // });


      // // if button_expand has been passed in with boolean param or array must check and covert to array
      // if (button_expand){
      //   this.model.ui.dialogs.sidebar = (button_expand === true) ? this.model.ui.buttons : button_expand;
      // }

      // if (button_expand && button_expand.length !== 0) {
      //     d3.select(this.root.element).classed("vzb-dialog-expand-true", true);
      // }


      // (button_expand||[]).forEach(function(button) {
      //   if (button_list.indexOf(button) === -1) {
      //     button_list.push(button);
      //   }
      // });

      //this.model.ui.buttons = button_list;

      //add buttons and render components

      //store body overflow
      this._prev_body_overflow = document.body.style.overflow;

      //TODO: maybe do the initial state setting here for all buttons
      if(this.root.ui.buttons.buttons.includes("sidebarcollapse")) this.setSidebarCollapse();

      // this.setBubbleTrails();
      // this.setTimeForecast();
      // this.setBubbleLock();
      // this.setInpercent();
      // this.setPresentationMode();
    }

    draw() {
      this.MDL = {
        frame: this.model.encoding.frame
      };
      this.localise = this.services.locale.auto();

      this._dialogs = this.root.findChild({type: "Dialogs"});
      if(!this._dialogs) console.warn("Buttonlist was unable to find a subcomponent of type 'Dialogs' in root component. Could be that index.js of a tool is lacking a configuration.");

      const button_expand = (this.root.ui.dialogs.dialogs || {}).sidebar || [];
      const button_list = [].concat(this.root.ui.buttons.buttons);
      this._addButtons(button_list, button_expand);
      this.addReaction(this._localiseButtons);
      this.addReaction(this._toggleButtons);

      this.root.ui.buttons.buttons.forEach(buttonId => {
        const button = this._available_buttons[buttonId];
        if (button) {
          if (button.statebind) {
            this.addReaction(() => {
              //_this.model_binds["change:" + button.statebind] = function(evt) {
              //if (!_this._readyOnce) return;
              button.statebindfunc(buttonId, getProp(this, button.statebind.split(".")));
            });
          } else {
            this.addReaction(() => {
              const dialog = this._dialogs.findChild({ name: buttonId});
              if (!dialog) return;
              const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + buttonId + "']");
              btn.classed(class_active$2, dialog.getOpen());
            });
          }
        }
      });

    }

    proceedClick(id) {
      const _this = this;
      const btn_config = _this._available_buttons[id];

      if (btn_config && btn_config.func) {
        btn_config.func(id);
      } else {
        this._dialogs.toggleDialogOpen(id);
      }
    }

    validatePopupButtons(buttons, dialogs) {
      const _this = this;

      const popupDialogs = dialogs.popup;
      const popupButtons = buttons.filter(d => (_this._available_buttons[d] && !_this._available_buttons[d].func));
      for (let i = 0, j = popupButtons.length; i < j; i++) {
        if (popupDialogs.indexOf(popupButtons[i]) == -1) {
          return error('Buttonlist: bad buttons config: "' + popupButtons[i] + '" is missing in popups list');
        }
      }
      return false; //all good
    }

    /*
     * reset buttons show state
     */
    _showAllButtons() {
      // show all existing buttons
      const buttons = this.element.selectAll(".vzb-buttonlist-btn");
      buttons.each(function() {
        const button = d3.select(this);
        button.style("display", "");
      });
    }

    _localiseButtons() {
      const _this = this;
      this.services.locale.id;
      this.element.selectAll("span[data-localise]").each(function() {
        const view = d3.select(this);
        view.text(_this.localise(view.attr("data-localise")));
      });
    }

    /*
    * determine which buttons are shown on the buttonlist
    */
    _toggleButtons() {
      this.services.layout.size;

      const _this = this;
      const root = this.root.element;

      //HERE
      const button_expand = (this.root.ui.dialogs.dialogs || {}).sidebar || [];
      _this._showAllButtons();

      const buttons = this.element.selectAll(".vzb-buttonlist-btn");

      const not_required = [];
      const required = [];

      let button_width = 80;
      let button_height = 80;
      let container_width = this.element.node().getBoundingClientRect().width;
      let container_height = this.element.node().getBoundingClientRect().height;
      let buttons_width = 0;
      let buttons_height = 0;

      buttons.filter(d => !d.ignoreSize).each(function(d) {
        const button_data = d;
        const button = d3.select(this);
        const expandable = button_expand.indexOf(button_data.id) !== -1;
        const button_margin = { top: parseInt(button.style("margin-top")), right: parseInt(button.style("margin-right")), left: parseInt(button.style("margin-left")), bottom: parseInt(button.style("margin-bottom")) };
        button_width = button.node().getBoundingClientRect().width + button_margin.right + button_margin.left;
        button_height = button.node().getBoundingClientRect().height + button_margin.top + button_margin.bottom;

        if (!button.classed(class_hidden)) {
          if (!expandable || _this.services.layout.profile !== "LARGE" || _this.ui.sidebarCollapse) {
            buttons_width += button_width;
            buttons_height += button_height;
            //sort buttons between required and not required buttons.
            // Not required buttons will only be shown if there is space available
            if (button_data.required) {
              required.push(button);
            } else {
              not_required.push(button);
            }
          } else {
            button.style("display", "none");
          }
        }
      });
      const width_diff = buttons_width - container_width;
      const height_diff = buttons_height - container_height;
      let number_of_buttons = 1;

      //check if container is landscape or portrait
      // if portrait small or large with expand, use width
      if (root.classed("vzb-large") && root.classed("vzb-dialog-expand-true")
      || root.classed("vzb-small") && root.classed("vzb-portrait")) {
        //check if the width_diff is small. If it is, add to the container
        // width, to allow more buttons in a way that is still usable
        if (width_diff > 0 && width_diff <= 10) {
          container_width += width_diff;
        }
        number_of_buttons = Math.floor(container_width / button_width) - required.length;
        if (number_of_buttons < 0) {
          number_of_buttons = 0;
        }
      // else, use height
      } else {
        //check if the width_diff is small. If it is, add to the container
        // width, to allow more buttons in a way that is still usable
        if (height_diff > 0 && height_diff <= 10) {
          container_height += height_diff;
        }
        number_of_buttons = Math.floor(container_height / button_height) - required.length;
        if (number_of_buttons < 0) {
          number_of_buttons = 0;
        }
      }
      //change the display property of non required buttons, from right to
      // left
      not_required.reverse();
      const hiddenButtons = [];
      for (let i = 0, j = not_required.length - number_of_buttons; i < j; i++) {
        not_required[i].style("display", "none");
        hiddenButtons.push(not_required[i].attr("data-btn"));
      }

      // const evt = {};
      // evt["hiddenButtons"] = hiddenButtons;
      // _this.trigger("toggle", evt);
      this.element.dispatch("custom-togglebuttons", 
        { detail: { hiddenButtons } });

    }

    /*
     * adds buttons configuration to the components and template_data
     * @param {Array} button_list list of buttons to be added
     */
    _addButtons(button_list, button_expand) {
      const _this = this;
      this._components_config = [];
      const details_btns = [];
      if (!button_list.length) return;
      //add a component for each button
      for (let i = 0; i < button_list.length; i++) {

        const btn = button_list[i];
        const btn_config = this._available_buttons[btn];

        //add template data
        const d = (btn_config) ? btn : "_default";
        const details_btn = clone(this._available_buttons[d]);
        if (d == "_default") {
          details_btn.title = "buttons/" + btn;
        }
        details_btn.id = btn;
        details_btn.icon = iconset["ICON_" + details_btn.icon.toUpperCase()];
        details_btns.push(details_btn);
      }

      this.element.selectAll("button").data(details_btns)
        .enter().append("button")
        .attr("class", d => {
          let cls = "vzb-buttonlist-btn";
          if (button_expand.length > 0) {
            if (button_expand.indexOf(d.id) > -1) {
              cls += " vzb-dialog-side-btn";
            }
          }

          return cls;
        })
        .attr("data-btn", d => d.id)
        .html(btn => `
        <span class='vzb-buttonlist-btn-icon fa'>${btn.icon}</span>
        <span class='vzb-buttonlist-btn-title'>
          <span data-localise='${btn.title}'></span>
        </span>
      `);

      const buttons = this.element.selectAll(".vzb-buttonlist-btn");

      //clicking the button
      buttons.on("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        const id = d3.select(this).attr("data-btn");
        _this.proceedClick(id);
      });

    }


    scrollToEnd() {
      let target = 0;
      const parent = d3.select(".vzb-tool");

      if (parent.classed("vzb-portrait") && parent.classed("vzb-small")) {
        if (this.model.state.marker.select.length > 0) target = this.element.node().scrollWidth;
        this.element.node().scrollLeft = target;
      } else {
        if (this.model.state.marker.select.length > 0) target = this.element.node().scrollHeight;
        this.element.node().scrollTop = target;
      }
    }


    /*
     * RESIZE:
     * Executed whenever the container is resized
     * Ideally, it contains only operations related to size
     */
    resize() {
      //TODO: what to do when resizing?
      if (!this.element.selectAll) return warn("buttonlist resize() aborted because element is not yet defined");

      //toggle presentaion off is switch to 'small' profile
      if (this.services.layout.profile === "SMALL" && this.services.layout.projector) {
        this.togglePresentationMode();
      }
    }

    setButtonActive(id, boolActive) {
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");

      btn.classed(class_active$2, boolActive);
    }

    toggleSidebarCollapse() {
      this.ui.sidebarCollapse = !this.ui.sidebarCollapse;
      this.setSidebarCollapse();
      this.services.layout._resizeHandler();
    }

    setSidebarCollapse() {
      this.root.element.classed("vzb-dialog-expand-true", !this.ui.sidebarCollapse);
    }

    toggleBubbleTrails() {
      if (this.model.encoding) {
        const trail = this.model.encoding.trail;
        trail.setShow(!trail.show);
      }
      this.setBubbleTrails();
    }
    setBubbleTrails() {
      if (!this.model.encoding) return;
      const trail = this.model.encoding.trail;
      if (!trail) return;
      const id = "trails";
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");
      if (!btn.node()) return warn("setBubbleTrails: no button '" + id + "' found in DOM. doing nothing");
      btn.classed(class_active_locked, trail.show);
      const anySelected = this.model.encoding.selected.data.filter.any();
      btn.classed(class_hidden, !anySelected);
    }
    toggleTimeForecast() {
      this.root.ui.chart.showForecast = !this.root.ui.chart.showForecast;
      this.setTimeForecast();
    }
    setTimeForecast() {
      const showForecast = this.root.ui.chart.showForecast;
      if (!showForecast && showForecast !== false) return;
      const id = "forecast";
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");
      if (!btn.node()) return warn("setBubbleTrails: no button '" + id + "' found in DOM. doing nothing");

      btn.classed(class_active_locked, showForecast);
      btn.classed(class_hidden, !this.root.ui.chart.endBeforeForecast);
    }
    toggleBubbleLock() {
      const active = (this.root.ui.chart || {}).lockActive;

      if (!this.model.encoding.selected.data.filter.any() && !active) return;

      let locked = this.root.ui.chart.lockNonSelected;
      const time = this.model.encoding.frame.value;
      locked = locked ? 0 : this.localise(time);
      this.root.ui.chart.lockNonSelected = locked;

      this.setBubbleLock();
    }
    setBubbleLock() {
      let locked = (this.root.ui.chart || {}).lockNonSelected;
      const active = (this.root.ui.chart || {}).lockActive;
      const unavailable = (this.root.ui.chart || {}).lockUnavailable || false;
      if (!locked && locked !== 0) return;

      if (locked !== 0 && this.model.encoding.selected.data.filter.any() && !active) {
        locked = this.root.ui.chart.lockNonSelected = 0;
      }

      const id = "lock";
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");
      if (!btn.node()) return warn("setBubbleLock: no button '" + id + "' found in DOM. doing nothing");

      //btn.classed(class_unavailable, !this.model.encoding.selected.data.filter.any() && !active);
      btn.classed(class_unavailable, unavailable);
      if (typeof active === "undefined") {
        btn.classed(class_hidden, !this.model.encoding.selected.data.filter.any());
      } else {
        btn.classed(class_hidden, !active);
      }

      btn.classed(class_active_locked, locked);

      btn.select(".vzb-buttonlist-btn-icon")
        .html(iconset[locked ? "ICON_LOCK" : "ICON_UNLOCK"]);

      btn.select(".vzb-buttonlist-btn-title>span").text(
        locked ? locked : this.localise("buttons/lock")
      )
        .attr("data-vzb-translate", locked ? null : "buttons/lock");
    }
    toggleInpercent() {
      this.root.ui.chart.inpercent = !this.root.ui.chart.inpercent;
      this.setInpercent();
    }
    setInpercent() {
      if (typeof ((this.root.ui.chart || {}).inpercent) === "undefined") return;
      const id = "inpercent";
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");

      btn.classed(class_active_locked, this.root.ui.chart.inpercent);
    }
    togglePresentationMode() {
      this.services.layout.projector = !this.services.layout.projector;
      this.setPresentationMode();
    }
    setPresentationMode() {
      const id = "presentation";
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");

      btn.classed(class_active_locked, this.services.layout.projector);
    }
    toggleFullScreen(id, emulateClick) {

      if (!window) return;

      let component = this;
      //let pholder = component.placeholder;
      let pholder = component.root.element.node();
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");
      const fs = !this.ui.fullscreen;
      const body_overflow = (fs) ? "hidden" : this._prev_body_overflow;


      //TODO: figure out a way to avoid fullscreen resize delay in firefox
      if (fs) {
        this.resizeInExitHandler = false;
        launchIntoFullscreen(pholder);
        subscribeFullscreenChangeEvent.call(this, this.toggleFullScreen.bind(this, id, true));
      } else {
        this.resizeInExitHandler = !emulateClick;
        exitFullscreen.call(this);
      }

      this.ui.fullscreen = fs;
      btn.classed(class_active_locked, fs);

      btn.select(".vzb-buttonlist-btn-icon").html(iconset[fs ? "ICON_UNEXPAND" : "ICON_EXPAND"]);

      btn.select(".vzb-buttonlist-btn-title").text(
        this.localise("buttons/" + (fs ? "unexpand" : "expand"))
      )
        .attr("data-vzb-translate", "buttons/" + (fs ? "unexpand" : "expand"));

      //restore body overflow
      document.body.style.overflow = body_overflow;

      if (!this.resizeInExitHandler) this.services.layout._resizeHandler();
    }

  }

  ButtonList.DEFAULT_UI = {
    buttons: ["fullscreen"],
    sidebarCollapse: false
  };

  function isFullscreen() {
    if (!window) return false;
    if (window.document.webkitIsFullScreen !== undefined)
      return window.document.webkitIsFullScreen;
    if (window.document.mozFullScreen !== undefined)
      return window.document.mozFullScreen;
    if (window.document.msFullscreenElement !== undefined)
      return window.document.msFullscreenElement;

    return false;
  }

  function exitHandler(emulateClickFunc) {
    if (!isFullscreen()) {
      removeFullscreenChangeEvent.call(this);
      if (!this.resizeInExitHandler) {
        emulateClickFunc();
      } else {
        this.services.layout._resizeHandler();
      }
    }
  }

  function subscribeFullscreenChangeEvent(exitFunc) {
    if (!window) return;
    const doc = window.document;

    this.exitFullscreenHandler = exitHandler.bind(this, exitFunc);
    doc.addEventListener("webkitfullscreenchange", this.exitFullscreenHandler, false);
    doc.addEventListener("mozfullscreenchange", this.exitFullscreenHandler, false);
    doc.addEventListener("fullscreenchange", this.exitFullscreenHandler, false);
    doc.addEventListener("MSFullscreenChange", this.exitFullscreenHandler, false);
  }

  function removeFullscreenChangeEvent() {
    const doc = window.document;

    doc.removeEventListener("webkitfullscreenchange", this.exitFullscreenHandler);
    doc.removeEventListener("mozfullscreenchange", this.exitFullscreenHandler);
    doc.removeEventListener("fullscreenchange", this.exitFullscreenHandler);
    doc.removeEventListener("MSFullscreenChange", this.exitFullscreenHandler);
  }

  function launchIntoFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen && allowWebkitFullscreenAPI()) {
      elem.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen && allowWebkitFullscreenAPI()) {
      document.webkitExitFullscreen();
    } else {
      removeFullscreenChangeEvent.call(this);
      this.resizeInExitHandler = false;
    }
  }

  function allowWebkitFullscreenAPI() {
    return !(navigator.vendor && navigator.vendor.indexOf("Apple") > -1 &&
      navigator.userAgent && !navigator.userAgent.match("CriOS"));
  }

  /*!
   * VIZABI BUBBLE SIZE slider
   * Reusable bubble size slider
   */

  const OPTIONS$6 = {
    EXTENT_MIN: 0,
    EXTENT_MAX: 1,
    BAR_WIDTH: 6,
    THUMB_HEIGHT: 20,
    THUMB_STROKE_WIDTH: 4,
    INTRO_DURATION: 250,
    ROUND_DIGITS: 2,
    value: "extent",
    setValueFunc: null,
    submodel: null,
    submodelFunc: null,

    PROFILE_CONSTANTS: {
      SMALL: {
      },
      MEDIUM: {
      },
      LARGE: {
      }
    },

    PROFILE_CONSTANTS_FOR_PROJECTOR: {
      SMALL: {
      },
      MEDIUM: {
      },
      LARGE: {
      }
    }
  };

  class BrushSlider extends BaseComponent {
    constructor (config) {
      config.template = `
      <div class="vzb-slider-holder">
        <svg class="vzb-slider-svg">
          <g class="vzb-slider-wrap">
            <g class="vzb-slider">
            </g>
          </g>
        </svg>
      </div>  
    `;

      super(config);

      this._setModel = throttle(this._setModel, 50);
    }

    setup(_options) {
      this.type = this.type || "brushslider";

      this.DOM = {
        sliderSvg: this.element.select(".vzb-slider-svg"),
        sliderWrap: this.element.select(".vzb-slider-wrap"),
        slider: this.element.select(".vzb-slider")
      };
      this.DOM.slider.classed("vzb-slider-" + this.constructor.name.toLowerCase(), true);
    
      const options = this.options = deepExtend(deepExtend({}, OPTIONS$6), _options || {});

      this.value = options.value;
      this.submodel = options.submodel;
      this.submodelFunc = options.submodelFunc;
      this.setValueFunc = options.setValueFunc;

      this.padding = this._getPadding();
      
      this.rescaler = d3.scaleLinear()
        .domain([options.EXTENT_MIN, options.EXTENT_MAX])
        .clamp(true);

      this.brushEventListeners = this._getBrushEventListeners();

      this.brush = d3.brushX()
        .handleSize(this._getHandleSize())
        .on("start", this.brushEventListeners.start)
        .on("brush", this.brushEventListeners.brush)
        .on("end", this.brushEventListeners.end);

      this.DOM.sliderThumbs = this.DOM.slider.selectAll(".handle")
        .data([{ type: "w" }, { type: "e" }], d => d.type)
        .enter().append("svg").attr("class", d => "handle handle--" + d.type + " " + d.type)
        .classed("vzb-slider-thumb", true);

      this._createThumbs(
        this.DOM.sliderThumbs.append("g")
          .attr("class", "vzb-slider-thumb-badge")
      );

      this.DOM.slider
        .call(this.brush);

      const barWidth = options.BAR_WIDTH;

      this.DOM.slider.selectAll(".selection,.overlay")
        .attr("height", barWidth)
        .attr("rx", barWidth * 0.25)
        .attr("ry", barWidth * 0.25)
        .attr("transform", "translate(0," + (-barWidth * 0.5) + ")");

    }
    
    get MDL() {
      return {
        model: this._getModel()
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      if(this._updateLayoutProfile()) return;

      this.addReaction(this._updateSize);
      this.addReaction(this._updateView);
    }

    _updateLayoutProfile(){
      this.services.layout.size;

      this.profileConstants = this.services.layout.getProfileConstants(this.options.PROFILE_CONSTANTS, this.options.PROFILE_CONSTANTS_FOR_PROJECTOR);
      this.height = (this.element.node().clientHeight) || 0;
      this.width = (this.element.node().clientWidth) || 0;
      if (!this.height || !this.width) return warn("Slider _updateProfile() abort: container is too little or has display:none");
    }

    _getPadding() {
      const halfThumbHeight = this.options.THUMB_HEIGHT * 0.5;

      return {
        top: this.options.BAR_WIDTH * 0.5,
        left: halfThumbHeight,
        right: halfThumbHeight,
        bottom: halfThumbHeight + this.options.THUMB_STROKE_WIDTH
      };
    }
    
    _getHandleSize() {
      return this.options.THUMB_HEIGHT + this.options.BAR_WIDTH * 2;
    }

    _getComponentWidth() {
      const width = this.element.node().offsetWidth - this.padding.left - this.padding.right;
      return width < 0 ? 0 : width;
    }

    _getComponentHeight() {
      return this.options.BAR_WIDTH;
    }

    _getBrushEventListeners() {
      const _this = this;

      return {
        start: (event) => {
          if (_this.nonBrushChange || !event.sourceEvent) return;
          if (event.selection && event.selection[0] == event.selection[1]) {
            const brushDatum = _this.DOM.slider.node().__brush;
            brushDatum.selection[1][0] += 0.01;
          }
          _this._setFromExtent(false, false, false);
        },
        brush: (event) => {
          if (_this.nonBrushChange || !event.sourceEvent) return;
          if (event.selection && event.selection[0] == event.selection[1]) {
            const brushDatum = _this.DOM.slider.node().__brush;
            brushDatum.selection[1][0] += 0.01;
          }
          _this._setFromExtent(true, false, false); // non persistent change
        },
        end: (event) => {
          if (_this.nonBrushChange || !event.sourceEvent) return;
          _this._setFromExtent(true, true); // force a persistent change
        }
      };
    }

    _createThumbs(thumbsEl) {
      const barWidth = this.options.BAR_WIDTH;
      const halfThumbHeight = this.options.THUMB_HEIGHT * 0.5;
      thumbsEl.append("path")
        .attr("d", "M" + (halfThumbHeight + barWidth) + " " + (halfThumbHeight + barWidth * 1.5) + "l" + (-halfThumbHeight) + " " + (halfThumbHeight * 1.5) + "h" + (halfThumbHeight * 2) + "Z");
    }

    _updateThumbs() {
    }

    _updateSize() {
      this.services.layout.size;

      const svgWidth = this._getComponentWidth() + this.padding.left + this.padding.right;

      this.DOM.sliderSvg
        .attr("height", this._getComponentHeight() + this.padding.top + this.padding.bottom)
        .attr("width", svgWidth);
      this.DOM.sliderWrap
        .attr("transform", this.isRTL ? "translate(" + (svgWidth - this.padding.right) + "," + this.padding.top + ") scale(-1,1)" :
          "translate(" + this.padding.left + "," + this.padding.top + ")");
    
      this._updateRescaler();
    }

    _updateRescaler() {
      const componentWidth = this._getComponentWidth();
      this.rescaler.range([0, componentWidth]);
    }

    _getModel() {
      if (this.submodelFunc) {
        return this.submodelFunc.call(this.model);
      } else if (this.submodel) {
        const model = getProp(this, this.submodel.split("."));
        if (!model) console.error(`Slider inside ${this.parent.name || this.parent.constructor.name} was not able to access part of model ${this.submodel}`);
        return model;
      } else {
        return this.model;
      }
    }

    _updateView() {
      this.services.layout.size;
      const value = this.MDL.model[this.value];

      if (!value && value!==0 && value!==false) 
        console.error(`Slider inside ${this.parent.name || this.parent.constructor.name} was unable to access value ${this.value} in its model`);

      this.DOM.slider.call(this.brush.extent([[0, 0], [this._getComponentWidth(), this._getComponentHeight()]]));
      const extent = this._valueToExtent(value) || [this.options.EXTENT_MIN, this.options.EXTENT_MAX];
      this._moveBrush(extent);
      this._updateThumbs(extent);
    }

    _moveBrush(s) {
      const _s = s.map(this.rescaler);
      this.nonBrushChange = true;
      this.DOM.slider.call(this.brush.move, [_s[0], _s[1] + 0.01]);
      this.nonBrushChange = false;
      this._setFromExtent(false, false, false);
    }

    _valueToExtent(value) {
      return value;
    }

    _extentToValue(extent) {
      return extent;
    }

    /**
     * Prepares setting of the current model with the values from extent.
     * @param {boolean} set model
     * @param {boolean} force force firing the change event
     * @param {boolean} persistent sets the persistency of the change event
     */
    _setFromExtent(setModel, force, persistent) {
      let s = d3.brushSelection(this.DOM.slider.node());
      if (!s) return;
      s = [this.rescaler.invert(s[0]), this.rescaler.invert(+s[1].toFixed(1))];
      this._updateThumbs(s);
      if (setModel) this._setModel(s, force, persistent);
    }

    /**
     * Sets the current value in model. avoid updating more than once in framerate
     * @param {number} value
     * @param {boolean} force force firing the change event
     * @param {boolean} persistent sets the persistency of the change event
     */
    _setModel(value) {
      const roundDigits = this.options.ROUND_DIGITS;
      value = [+value[0].toFixed(roundDigits), +value[1].toFixed(roundDigits)];
      if (this.setValueFunc) {
        this.MDL.model[this.setValueFunc](this._extentToValue(value));
      } else {
        this.MDL.model[this.value] = this._extentToValue(value);
      }
    }

  }

  const decorated$b = mobx.decorate(BrushSlider, {
    "MDL": mobx.computed
  });

  const CIRCLE_RADIUS = 6;

  function updateRainbowLegend(isVisible) {
    const DOM = this.DOM;
    
    //Hide rainbow element if showing minimap or if color is discrete
    DOM.rainbowHolder.classed("vzb-hidden", !isVisible);
    if (!isVisible) return;
    
    const localise = this.localise;
    const colorModel = this.MDL.color.scale;
    const gradientWidth = DOM.rainbow.node().getBoundingClientRect().width;
    const paletteKeys = colorModel.palette.paletteDomain.map(parseFloat);
    const paletteLabels = colorModel.palette.paletteLabels;
    const cScale = colorModel.d3Scale.copy();
      
    const marginLeft = parseInt(DOM.rainbow.style("left"), 10) || 0;
    const marginRight = parseInt(DOM.rainbow.style("right"), 10) || marginLeft;
    
    let domain, range, paletteMax;
    
    if (paletteLabels) {
      domain = paletteLabels.map(val => parseFloat(val));
      paletteMax = d3.max(domain);
      range = domain.map(val => val / paletteMax * gradientWidth);
    } else {
      domain = cScale.domain();
      paletteMax = d3.max(paletteKeys);
      range = paletteKeys.map(val => val / paletteMax * gradientWidth);
    }

    const labelsAxis = axisSmart$1("bottom");
    const labelScale = cScale.copy()
      .interpolate(d3.interpolate)
      .range(range);

    const edgeDomain = d3.extent(domain);

    const domainScale = labelScale.copy()
      .domain(edgeDomain)
      .range(edgeDomain);

    const paletteScaleLinear = d3.scaleLinear()
      .domain(edgeDomain)
      .range([0, 100]);

    updateLabelScale();
    updateRainbowCanvas();
    updateSubtitle();

    if (DOM.rainbowLegend.style("display") !== "none")
      updateColorStops();


    function updateLabelScale(){

      DOM.labelScaleSVG.style("width", marginLeft + gradientWidth + marginRight + "px");
      DOM.labelScaleG.attr("transform", "translate(" + marginLeft + ",2)");
      
      labelsAxis
        .scale(labelScale)
        .tickSizeOuter(5)
        .tickPadding(8)
        .tickSizeMinor(3, -3)
        .labelerOptions({
          scaleType: colorModel.type,
          toolMargin: {
            right: marginRight,
            left: marginLeft
          },
          showOuter: false,
          formatter: localise,
          bump: marginLeft,
          cssFontSize: "8px",
          fitIntoScale: paletteLabels ? "optimistic" : null
        });

      DOM.labelScaleG.call(labelsAxis);
    }


    function updateRainbowCanvas(){
      DOM.rainbow
        .style("top", 3 + CIRCLE_RADIUS + "px");

      DOM.rainbowCanvas
        .attr("width", gradientWidth)
        .attr("height", 1)
        .style("width", gradientWidth + "px")
        .style("height", "100%");

      const context = DOM.rainbowCanvas.node().getContext("2d");
      const image = context.createImageData(gradientWidth, 1);
      for (let i = 0, j = -1, c; i < gradientWidth; ++i) {
        c = d3.rgb(cScale(labelScale.invert(i)));
        image.data[++j] = c.r;
        image.data[++j] = c.g;
        image.data[++j] = c.b;
        image.data[++j] = 255;
      }
      context.putImageData(image, 0, 0);

    }
    
    
    function updateSubtitle(){
      const conceptProps = colorModel.parent.data.conceptProps;
      const subtitle = getSubtitle(conceptProps.name, conceptProps.name_short);
    
      DOM.subtitleText
        .classed("vzb-hidden", subtitle == "")
        .text(subtitle);

      DOM.subtitleReset
        .text(localise("buttons/reset"))
        .classed("vzb-hidden", !Object.keys(colorModel.palette.config.palette).length)
        .on("click", () => {
          mobx.runInAction(()=>{
            Object.keys(colorModel.palette.config.palette)
              .forEach(d => colorModel.palette.removeColor(d));
          });
        });
    }


    function updateColorStops(){

      DOM.rainbowLegend
        .style("width", gradientWidth + "px")
        .style("left", (marginLeft - CIRCLE_RADIUS) + "px")
        .style("top", "3px");

      DOM.labelScale.selectAll(".vzb-axis-value text")
        .attr("dy", "1.5em");

      DOM.rainbowLegendEventArea
        .style("width", gradientWidth + "px")
        .style("top", 3 + CIRCLE_RADIUS + "px")
        .style("left", CIRCLE_RADIUS + "px")
        .on("mousemove", function(event) {
          highlightValue(labelScale.invert(d3.pointer(event)[0]));
        })
        .on("mouseleave", () => highlightValue("none"))
        .on("dblclick", function(event) {
          let x = d3.pointer(event)[0];
          x = x <= (CIRCLE_RADIUS * 2) ? CIRCLE_RADIUS * 2 : x >= (gradientWidth - CIRCLE_RADIUS * 2) ? gradientWidth - CIRCLE_RADIUS * 2 : x;
          const newValue = labelScale.invert(x);
          const color = cScale(newValue);
          const paletteKey = getPaletteKey(newValue);
          colorModel.palette.setColor(color, paletteKey);
        });

      if (!d3.extent(domain).includes(0)) {
        //find tick with zero
        DOM.labelScaleG.selectAll(".tick text")
          .filter(function() { return d3.select(this).text() === "0"; })
          .style("cursor", "pointer")
          .on("dblclick", () => {
            const color = cScale(0);
            const paletteKey = getPaletteKey(0);
            colorModel.palette.setColor(color, paletteKey);
          });
      }

      const value0 = d3.min(domain) < 0 && d3.max(domain) > 0 ? labelScale(0) : null;
      const colorStops = domain.map((val, i) => ({ 
        val, 
        i, 
        value0,
        isEdgePoint: i === 0 || i === domain.length - 1,
        color: cScale.range()[i],
        paletteKey: paletteKeys[i],
        xMin: i - 1 < 0 ? 1 : labelScale(domain[i - 1]) + CIRCLE_RADIUS * 2,
        xMax: i + 1 >= domain.length ? gradientWidth - 1 : labelScale(domain[i + 1]) - CIRCLE_RADIUS * 2
      }));
        

      let dblclick = false;
      let lastClickId;

      let rainbowLegendCircles = DOM.rainbowLegend.selectAll(".vzb-cl-rainbow-legend-circle")
        .data(colorStops, d => d.i);
      rainbowLegendCircles.exit().remove();
      rainbowLegendCircles = rainbowLegendCircles.enter().append("div")
        .attr("class", "vzb-cl-rainbow-legend-circle")
        .style("width", 2 * CIRCLE_RADIUS + "px")
        .style("height", 2 * CIRCLE_RADIUS + "px")
        .style("border", "1px solid #000")
        .each(function(){
          d3.select(this).append("input")
            .attr("type", "color");
        })
        .merge(rainbowLegendCircles);
          
      rainbowLegendCircles
        .style("border-radius", d => d.isEdgePoint ? null : (CIRCLE_RADIUS + "px"))
        .call(dragCircles())
        .on("mouseenter", d => {
          highlightValue(d.val);
        })
        .on("mouseleave", () => {
          highlightValue("none");
        })
        .on("click", function(){
          const input = d3.select(this).select("input").node();
          lastClickId = setTimeout(() => {
            if (!dblclick){
              input.click();
            } else {
              clearTimeout(lastClickId);
              dblclick = false;
            }
          }, 500);
        })
        .on("dblclick", function(event, d){
          dblclick = true;
          if (d.isEdgePoint) return;
          removeColor(d.paletteKey);
        })
        .each(function(d) {
          d3.select(this).select("input").property("value", d.color)
            .on("click", (event)=>{event.stopPropagation();})
            .on("input", function(){
              const value = d3.select(this).property("value");
              setColor(value, d.paletteKey);
            });
          d3.select(this).style("left", (d.x = labelScale(d.val)) + "px");
        });
    }


    function dragCircles() {
      return d3.drag()
        .on("start", function start(event) {

          const circle = d3.select(this);
          let dragged = false;

          circle.classed("dragging", true);

          event.on("drag", drag).on("end", end);

          function drag(event, d) {
            if (d.isEdgePoint) return;
            if (event.x < 0) return;
            if (event.x > gradientWidth) return;
            if (event.x < d.xMin || event.x > d.xMax) return;
            if (!dragged && event.dx !== 0) dragged = true;

            d.x = event.x;
            if (d.value0 !== null) {
              d.x = (d.x < d.value0 - 3 || d.x > d.value0 + 3) ? d.x : d.value0;
            }

            circle.style("left", d.x + "px");

            if (dragged) {
              const newValue = labelScale.invert(d.x);
              const paletteKey = getPaletteKey(newValue);
              highlightValue(newValue);

              if(d.paletteKey !== paletteKey){
                replaceColor(d.color, d.paletteKey, paletteKey);                
                d.val = newValue;
                d.paletteKey = paletteKey;
              }
            }
          }

          function end() {
            circle.classed("dragging", false);
          }
        });
    }


    function getPaletteKey(value){
      return Math.round(+paletteScaleLinear(domainScale(value)));
    }


    function highlightValue(value){
      DOM.labelScaleG.call(labelsAxis.highlightValue(value));
    }


    function setColor(value, key){
      colorModel.palette.setColor(value, key);
    }


    function removeColor(key){
      if (colorModel.palette.defaultPalette[key])
        colorModel.palette.setColor(null, key);    
      else 
        colorModel.palette.removeColor(key);  
    }


    function replaceColor(value, oldKey, newKey){
      mobx.runInAction(()=>{
        removeColor(oldKey);
        setColor(value, newKey);
      });
    }
  }

  /*!
   * VIZABI BUBBLE COLOR LEGEND COMPONENT
   */

  function isTrailBubble(d){
    return !!d[Symbol.for("trailHeadKey")];
  }

  class ColorLegend extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-cl-outer">
        <div class="vzb-cl-holder">
          <div class="vzb-cl-minimap">
            <svg>
              <g></g>
            </svg>
          </div>

          <div class="vzb-cl-colorlist vzb-hidden"></div>

          <div class="vzb-cl-rainbow-holder vzb-hidden">
            <div class="vzb-cl-rainbow">
              <canvas></canvas>
            </div>

            <div class="vzb-cl-rainbow-legend">
              <div class="vzb-cl-rainbow-legend-eventarea"></div>
            </div>

            <div class="vzb-cl-labelscale">
              <svg>
                <g></g>
              </svg>
            </div>

            <div class="vzb-cl-subtitle">
              <span class="vzb-cl-subtitle-text"></span>
              <span class="vzb-cl-subtitle-reset"></span>
            </div>
          </div>
          
          <span class="vzb-cl-more-hint vzb-hidden">click for more options</span>

          <div class="vzb-cl-select-dialog vzb-hidden">
            <div class="vzb-cl-select-dialog-title"></div>
            <div class="vzb-cl-select-dialog-close"></div>
          </div>
      </div>
    `;

      super(config);
    }

    setup(options) {
      this.DOM = {
        wrapper: this.element.select(".vzb-cl-holder"),
      };

      this.DOM.minimap = this.DOM.wrapper.select(".vzb-cl-minimap");
      this.DOM.minimapSVG = this.DOM.minimap.select("svg");
      this.DOM.minimapG = this.DOM.minimapSVG.select("g");

      this.DOM.listColors = this.DOM.wrapper.select(".vzb-cl-colorlist");

      this.DOM.rainbowHolder = this.DOM.wrapper.select(".vzb-cl-rainbow-holder");
      this.DOM.rainbow = this.DOM.rainbowHolder.select(".vzb-cl-rainbow");
      this.DOM.rainbowCanvas = this.DOM.rainbow.select("canvas");
      this.DOM.rainbowLegend = this.DOM.rainbowHolder.select(".vzb-cl-rainbow-legend");
      this.DOM.rainbowLegendEventArea = this.DOM.rainbowLegend.select(".vzb-cl-rainbow-legend-eventarea");

      this.DOM.labelScale = this.DOM.rainbowHolder.select(".vzb-cl-labelscale");
      this.DOM.labelScaleSVG = this.DOM.labelScale.select("svg");
      this.DOM.labelScaleG = this.DOM.labelScaleSVG.select("g");
      this.DOM.subtitleDiv = this.DOM.rainbowHolder.select(".vzb-cl-subtitle");
      this.DOM.subtitleText = this.DOM.subtitleDiv.select(".vzb-cl-subtitle-text");
      this.DOM.subtitleReset = this.DOM.subtitleDiv.select(".vzb-cl-subtitle-reset");

      this.legendModelName = options.legendModelName;
      this.colorModelName = options.colorModelName;
    
      this._initSelectDialog();
    }


    get MDL() {
      return {
        color: this.model.encoding[this.colorModelName],
        selected: this.model.encoding.selected,
        highlighted: this.model.encoding.highlighted,
        superHighlighted: this.model.encoding.superhighlighted,
        legend: this.root.model.markers[this.legendModelName]
      };
    }

    draw() {
      this.localise = this.services.locale.auto();
     
      if (this._legendHasOwnModel() && !this._isLegendModelReady()) return;

      this.KEY = Symbol.for("key");
      this.canShowMap = this.MDL.legend && this._canShowMap();
      this.which = this.MDL.color.data.constant || this.MDL.color.data.concept;

      this.addReaction(this._updateView);
      this.addReaction(this._translateSelectDialog);
      this.addReaction(this.closeSelectDialogOnConceptChange);
    }

    _legendHasOwnModel() {
      return this.MDL.legend
        && !this.MDL.color.data.isConstant 
        && isEntityConcept(this.MDL.color.data.conceptProps);
    }

    _isLegendModelReady() {
      return this.MDL.legend.state == STATUS.READY;
    }

    _canShowMap() {
      if(!this._legendHasOwnModel()) return false;
      const dataArray = this.MDL.legend.dataArray;
      return dataArray.length > 0 && dataArray.every(d => d.map);
    }

    _updateView() {
      if (this._legendHasOwnModel() && !this._isLegendModelReady()) return;

      const individualColors = false;
      this._updateListLegend(this.MDL.color.scale.isDiscrete() && !this.canShowMap && !individualColors);
      this._updateMinimapLegend(this.MDL.color.scale.isDiscrete() && this.canShowMap);
      updateRainbowLegend.bind(this)(!this.MDL.color.scale.isDiscrete());
    }

    _updateListLegend(isVisible) {
      this.DOM.listColors.classed("vzb-hidden", !isVisible);
      if (!isVisible) return;

      const _this = this;
      const cScale = this.MDL.color.scale.d3Scale;

      let colorOptionsArray = [];

      if (this._legendHasOwnModel() && this._isLegendModelReady() && !this.MDL.color.data.isConstant) {
        colorOptionsArray = this.MDL.legend.dataArray;
      } else {
        colorOptionsArray = cScale.domain().map(value => {
          const result = {};
          result[this.which] = value;
          return result;
        });
      }

      let colorOptions = this.DOM.listColors.selectAll(".vzb-cl-option")
        .data(unique(colorOptionsArray, d => d[this.which]), d => d[this.which]);

      colorOptions.exit().remove();

      colorOptions = colorOptions.enter().append("div").attr("class", "vzb-cl-option")
        .each(function() {
          d3.select(this).append("div").attr("class", "vzb-cl-color-sample");
          d3.select(this).append("div").attr("class", "vzb-cl-color-legend");
        })
        .on("mouseover", (event, d) => this._interact().mouseover(d))
        .on("mouseout", () => this._interact().mouseout())
        .on("click", (event, d) => {
          this._bindSelectDialogItems(d);
          this.DOM.selectDialog.classed("vzb-hidden", false);
        })
        .merge(colorOptions);

      colorOptions.each(function(d) {
        d3.select(this).select(".vzb-cl-color-sample")
          .style("background-color", cScale(d[_this.which]))
          .style("border", "1px solid " + cScale(d[_this.which]));
        //Apply names to color legend entries if color is a property
        let label = d["name"];
        if (!label && label !== 0) label = d[_this.which];
        if (_this.MDL.color.data.isConstant) label = _this.localise("indicator/_default/color");
        d3.select(this).select(".vzb-cl-color-legend").text(label);
      });
    }

    _updateMinimapLegend(isVisible) {
      this.DOM.minimap.classed("vzb-hidden", !isVisible);
      if (!isVisible) return;

      if (!this._isLegendModelReady()) return;

      const cScale = this.MDL.color.scale.d3Scale;

      const tempdivEl = this.DOM.minimap.append("div").attr("class", "vzb-temp");

      this.DOM.minimapSVG.attr("viewBox", null);
      this.DOM.minimapSVG.selectAll("g").remove();
      this.DOM.minimapG = this.DOM.minimapSVG.append("g");
      this.DOM.minimapG.selectAll("path")
        .data(this.MDL.legend.dataArray, d => d[this.KEY])
        .enter().append("path")
        .on("mouseover", (event, d) => this._interact().mouseover(d))
        .on("mouseout", () => this._interact().mouseout())
        .on("click", (event, d) => {
          this._bindSelectDialogItems(d);
          this.DOM.selectDialog.classed("vzb-hidden", false);
        })
        .each(function(d) {
          let shapeString = d["map"].trim();

          //check if shape string starts with svg tag -- then it's a complete svg
          if (shapeString.slice(0, 4) == "<svg") {
            //append svg element from string to the temporary div
            tempdivEl.html(shapeString);
            //replace the shape string with just the path data from svg
            //TODO: this is not very resilient. potentially only the first path will be taken!
            shapeString = tempdivEl.select("svg").select("path").attr("d");
          }

          d3.select(this)
            .attr("d", shapeString)
            .style("fill", cScale(d["color"]))
            .append("title").text(d["name"]);

          tempdivEl.html("");
        });

      const gbbox = this.DOM.minimapG.node().getBBox();
      this.DOM.minimapSVG.attr("viewBox", "0 0 " + gbbox.width * 1.05 + " " + gbbox.height * 1.05);
      tempdivEl.remove();

    }

    _interact() {
      const _this = this;

      return {
        mouseover(d) {
          _this.DOM.moreOptionsHint.classed("vzb-hidden", false);

          if (!isEntityConcept(_this.MDL.color.data.conceptProps)) return;
          const concept = _this.MDL.color.data.concept;
          const colorMdlName = _this.MDL.color.name;
          
          const selectArray = _this.model.dataArray?.filter(f => f[colorMdlName] == d[concept]);

          if (!selectArray) return;

          _this.root.ui?.chart?.superhighlightOnMinimapHover && _this.MDL.superHighlighted ?
            _this.MDL.superHighlighted.data.filter.set(selectArray) :
            _this.MDL.highlighted.data.filter.set(selectArray);
        },

        mouseout() {
          _this.DOM.moreOptionsHint.classed("vzb-hidden", true);

          if (!isEntityConcept(_this.MDL.color.data.conceptProps)) return;
          _this.root.ui?.chart?.superhighlightOnMinimapHover && _this.MDL.superHighlighted ?
            _this.MDL.superHighlighted.data.filter.clear() :
            _this.MDL.highlighted.data.filter.clear();
        },
        clickToShow(d) {
          if (!isEntityConcept(_this.MDL.color.data.conceptProps)) return;

          const filter = _this.model.data.filter;
          const colorSpace = _this.model.encoding.color.data.space;
          const concept = _this.MDL.color.data.concept;
          
          filter.config.dimensions[colorSpace][concept] = d[concept];
        },
        clickToSelect(d) {
          if (!isEntityConcept(_this.MDL.color.data.conceptProps)) return;

          const concept = _this.MDL.color.data.concept;
          const colorMdlName = _this.MDL.color.name;
          const selectedFilter = _this.MDL.selected.data.filter;
          
          const selectArray = _this.model.dataArray?.filter(f => !isTrailBubble(f) && f[colorMdlName] == d[concept]);
          
          if (!selectArray) return;

          if (selectArray.every(d => selectedFilter.has(d)))
            mobx.runInAction(() => selectedFilter.delete(selectArray));
          else
            mobx.runInAction(() => selectedFilter.set(selectArray));        
        }
      };
    }

    _initSelectDialog() {
      this.DOM.moreOptionsHint = this.DOM.wrapper.select(".vzb-cl-more-hint");

      this.DOM.selectDialog = this.DOM.wrapper.select(".vzb-cl-select-dialog");
      this.DOM.selectDialogTitle = this.DOM.selectDialog.select(".vzb-cl-select-dialog-title");

      this.DOM.selectDialogClose = this.DOM.selectDialog.select(".vzb-cl-select-dialog-close");
      this.DOM.selectDialogClose
        .html(ICON_CLOSE)
        .on("click", () => this._closeSelectDialog());

      this.DOM.selectAllButton = this.DOM.selectDialog.append("div")
        .attr("class", "vzb-cl-select-dialog-item vzb-clickable");

      this.DOM.removeElseButton = this.DOM.selectDialog.append("div")
        .attr("class", "vzb-cl-select-dialog-item vzb-clickable");

      this.DOM.editColorButton = this.DOM.selectDialog.append("div")
        .attr("class", "vzb-cl-select-dialog-item vzb-cl-select-dialog-item-moreoptions");
      this.DOM.editColorButton.append("label")
        .attr("class", "vzb-clickable")
        .attr("for", "vzb-cl-select-dialog-color-" + this.id);
      this.DOM.editColorButton.append("input")
        .attr("type", "color")
        .attr("class", "vzb-invisible")
        .attr("id", "vzb-cl-select-dialog-color-" + this.id);
      this.DOM.editColorButton.append("span")
        .attr("class", "vzb-clickable");

      this.DOM.editColorButtonTooltip = this.DOM.editColorButton.append("div")
        .attr("class", "vzb-cl-select-dialog-item-tooltip");
    }

    _translateSelectDialog() {
      const t = this.localise;
      this.DOM.moreOptionsHint.text(t("hints/color/more"));
      this.DOM.selectAllButton.text("✅ " + t("dialogs/color/select-all"));
      this.DOM.removeElseButton.text("🗑️ " + t("dialogs/color/remove-else"));
      this.DOM.editColorButton.select("label").text("🎨 " + t("dialogs/color/edit-color"));
      this.DOM.editColorButton.select("span").text(t("buttons/reset"));
      this.DOM.editColorButtonTooltip.text(t("dialogs/color/edit-color-blocked-hint"));
    }
    
    closeSelectDialogOnConceptChange(){
      this.MDL.color.data.concept;
      this._closeSelectDialog();
    }

    _closeSelectDialog() {
      this.DOM.selectDialog.classed("vzb-hidden", true);
    }

    _bindSelectDialogItems(d) {
      const _this = this;
      this.DOM.selectDialogTitle.text(d.name);

      this.DOM.selectAllButton
        .classed("vzb-cl-select-dialog-item-disabled", !isEntityConcept(this.MDL.color.data.conceptProps))
        .on("click", () => {
          this._interact().clickToSelect(d);
          this._closeSelectDialog();
        });

      this.DOM.removeElseButton
        .classed("vzb-cl-select-dialog-item-disabled", !isEntityConcept(this.MDL.color.data.conceptProps))
        .on("click", () => {
          this._interact().clickToShow(d);
          this._closeSelectDialog();
        });

      const isColorSelectable = this.MDL.color.scale.palette.isUserSelectable;
      this.DOM.editColorButtonTooltip.classed("vzb-hidden", isColorSelectable);
      this.DOM.editColorButton.select("span").classed("vzb-hidden", !isColorSelectable);
      this.DOM.editColorButton.classed("vzb-cl-select-dialog-item-disabled", !isColorSelectable);
      
      if (isColorSelectable){
        const colorScaleModel = this.MDL.color.scale;
        const concept = this.MDL.color.data.concept;
        const target = this.MDL.color.data.isConstant ? "_default" : d[concept];
        const colorOld = colorScaleModel.palette.getColor(target);
        const colorDef = colorScaleModel.palette.getColor(target, colorScaleModel.palette.defaultPalette);
        this.DOM.editColorButton.select("input")
          .property("value", colorOld)
          .on("input", function(){
            const value = d3.select(this).property("value");
            colorScaleModel.palette.setColor(value, target);
          })
          .on("change", function(){
            _this._closeSelectDialog();
          });

        //reset color
        this.DOM.editColorButton.select("span")
          .classed("vzb-hidden", colorOld == colorDef)
          .style("color", colorDef)
          .on("click", function(){
            colorScaleModel.palette.removeColor(target);
            _this._closeSelectDialog();
          });
      }
    }
  }

  const decorated$a = mobx.decorate(ColorLegend, {
    "MDL": mobx.computed
  });

  class DateTimeBackground extends BaseComponent {

    setup(conditions) {
      this.DOM = {
        textEl: this.element.append("text").style("font-size", "20px"),
        sampleTextEl: this.element.append("text").style("font-size", "20px").style("opacity", 0)
      };
      
      this.element.classed("vzb-datetime-background", true);

      this.width = 0;
      this.height = 0;
      this.topOffset = 0;
      this.leftOffset = 0;
      this.bottomOffset = 0;
      this.rightOffset = 0;
      this.textWidth = 0;
      this.textHeight = 0;
      this.widthRatio = 0.9;
      this.heightRatio = 0.9;
      this.xAlign = "center";
      this.yAlign = "center";

      if (conditions) {
        this.setConditions(conditions);
      }
    }

    setConditions(conditions) {
      if (!isNaN(parseFloat(conditions.rightOffset)) && isFinite(conditions.rightOffset)) {
        this.rightOffset = conditions.rightOffset;
      }
      if (!isNaN(parseFloat(conditions.leftOffset)) && isFinite(conditions.leftOffset)) {
        this.leftOffset = conditions.leftOffset;
      }
      if (!isNaN(parseFloat(conditions.topOffset)) && isFinite(conditions.topOffset)) {
        this.topOffset = conditions.topOffset;
      }
      if (!isNaN(parseFloat(conditions.bottomOffset)) && isFinite(conditions.bottomOffset)) {
        this.bottomOffset = conditions.bottomOffset;
      }
      if (conditions.xAlign) {
        this.xAlign = conditions.xAlign;
      }
      if (conditions.yAlign) {
        this.yAlign = conditions.yAlign;
      }
      if (!isNaN(parseFloat(conditions.widthRatio)) && conditions.widthRatio > 0 && conditions.widthRatio <= 1) {
        this.widthRatio = conditions.widthRatio;
      }
      if (!isNaN(parseFloat(conditions.heightRatio)) && conditions.heightRatio > 0 && conditions.heightRatio <= 1) {
        this.heightRatio = conditions.heightRatio;
      }
      return this;
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame
      };
    }

    draw() {
      this.localise = this.services.locale.auto(this.MDL.frame.interval);
    }

    resizeText(width, height, topOffset, leftOffset) {
      this.width = parseInt(width, 10) || 0;
      this.height = parseInt(height, 10) || 0;

      if (topOffset) {
        this.topOffset = topOffset;
      }
      if (leftOffset) {
        this.leftOffset = leftOffset;
      }

      this._resizeText();
    }

    setText(text, delay = 0) {
      const {
        textEl,
        sampleTextEl
      } = this.DOM;

      text = this.localise(text);

      const callback = () => {
        sampleTextEl.text(text);
        this._resizeText();
        textEl.text(text);
      };

      const clear = () => {
        clearTimeout(this._text.timeout);
        delete this._text;
      };

      if (!delay) {
        if (this._text) {
          clear();
        }
        callback();
      } else {
        if (this._text) {
          this._text.callback();
          clear();
        }
        this._text = {
          callback,
          timeout: setTimeout(() => {
            callback();
            clear();
          }, delay)
        };
      }

      return this;
    }


    _resizeText() {
      const {
        textEl,
        sampleTextEl
      } = this.DOM;

      const bbox = sampleTextEl.node().getBBox();
      if (!bbox.width || !bbox.height || !this.width || !this.height) return this;

      // method from http://stackoverflow.com/a/22580176
      const widthTransform = this.width * this.widthRatio / bbox.width;
      const heightTransform = this.height * this.heightRatio / bbox.height;
      this.scalar = Math.min(widthTransform, heightTransform);
      textEl.attr("transform", "scale(" + this.scalar + ")");

      this.textHeight = bbox.height * this.scalar;
      this.textWidth = bbox.width * this.scalar;

      switch (this.yAlign) {
      case "bottom": textEl.attr("dy", ".325em"); break;
      case "center": textEl.attr("dy", ".325em"); break;
      case "top": textEl.attr("dy", "0"); break;
      }

      this.element.attr("transform", "translate(" + this._getLeftOffset() + "," + this._getTopOffset() + ")");

      return this;
    }

    _getLeftOffset() {
      switch (this.xAlign) {
      case "right":
        return this.width - this.textWidth / 2 - this.rightOffset;
      case "left":
        return this.textWidth / 2 + this.leftOffset;
      default :
        return this.width / 2;
      }
    }

    _getTopOffset() {
      switch (this.yAlign) {
      case "top":
        return this.textHeight / 2 + this.topOffset;
      case "bottom":
        return this.height - this.textHeight / 2 - this.bottomOffset;
      default :
        return this.height / 2;
      }
    }

  }

  const decorated$9 = mobx.decorate(DateTimeBackground, {
    "MDL": mobx.computed
  });

  class DataNotes extends BaseComponent {

    constructor(config) {
      super(config);
    }


    setup() {
      this.state = {
      };

      this.DOM = {

      };


      this.hidden = true;
      this.showNotes = false;
      this.pinned = false;
      this.left = 0;
      this.top = 0;
      this.encoding = null;


      this.element.classed("vzb-hidden", this.hidden);
      this.element.append("div")
        .html(ICON_CLOSE)
        .on("click", (event) => {
          event.stopPropagation();
          this.close();
        })
        .select("svg")
        .attr("width", "0px")
        .attr("height", "0px")
        .attr("class", "vzb-data-notes-close")
        .classed("vzb-hidden", true);

      this.element.append("div")
        .attr("class", "vzb-data-notes-body vzb-dialog-scrollable");

      this.element.append("div")
        .attr("class", "vzb-data-notes-link");


    }
    
    draw() {
      this.localise = this.services.locale.auto();
      
      this.addReaction(this.setValues);
      this.addReaction(this.resize);
    }

    resize(){
      this.services.layout.size;
      this.close();
    }

    setEncoding(enc) {
      this.encoding = enc;
      this.setValues();
      return this;
    }

    setValues() {
      if (!this.encoding) return;
      const { description, source_url, source } = this.encoding.data.conceptProps;

      this.element.select(".vzb-data-notes-body")
        .classed("vzb-hidden", !description)
        .text(replaceNumberSpacesToNonBreak(description));

      const label = this.localise("hints/source");
      this.element.select(".vzb-data-notes-link")
        .classed("vzb-hidden", !source_url)
        .html("<span>" + (source ? (label + ": ") : "") 
          + '<a href="' + normaliseLink(source_url) + '" target="_blank">' + (source ? source : label) 
          + "</a></span>");

      this.showNotes = source_url || description;
    }

    setPos(_left, _top, force) {
      this.left = _left;
      this.top = _top;
      if (this.pinned && !force) return this;
      const parentHeight = this.parent.element.node().offsetHeight;
      const width = this.element.node().offsetWidth;
      const height = this.element.node().offsetHeight;
      let leftMove;
      let topMove;
      let leftPos = this.left - width;
      let topPos = this.top;
      if (leftPos < 10) {
        leftPos = 10;
        leftMove = true;
      }
      if ((topPos + height + 10) > parentHeight) {
        topPos = parentHeight - height - 10;
        topMove = true;
      }

      if (leftMove && topMove) {
        topPos = this.top - height - 30;
      }

      this.element.style("top", topPos + "px");
      this.element.style("left", leftPos + "px");

      return this;
    }

    pin(arg) {
      if (this.hidden) return this;
      this.pinned = !this.pinned;
      if (arg != null) this.pinned = arg;
      this.element.select(".vzb-data-notes-close").classed("vzb-hidden", !this.pinned);
      this.element.classed("vzb-data-notes-pinned", this.pinned);
      this.element.select(".vzb-data-notes-body").node().scrollTop = 0;

      return this.showNotes ?
        this.setPos(this.left, this.top, true) :
        this.hide();
    }

    toggle(arg) {
      if (this.pinned) return this;
      if (arg == null) arg = !this.hidden;
      this.hidden = arg;
      this.element.classed("vzb-hidden", this.hidden || !this.showNotes);
      return this;
    }

    show() {
      return this.toggle(false);
    }

    hide() {
      return this.toggle(true);
    }

    close() {
      if (!this.hidden) {
        this.pin(false).hide();
      }
    }  

  }

  let hidden$2 = true;
  const HIDE_WHEN_SMALLER_THAN = 100; //px
  class _DataWarning extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-data-warning-background"></div>
      <div class="vzb-data-warning-box">
        <div class="vzb-data-warning-link"></div>
        <div class="vzb-data-warning-title"></div>
        <div class="vzb-data-warning-body vzb-dialog-scrollable"></div>
      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        background: this.element.select(".vzb-data-warning-background"),
        container: this.element.select(".vzb-data-warning-box"),
        icon: this.element.select(".vzb-data-warning-link"),
        close: this.element.select(".vzb-data-warning-close"),
        title: this.element.select(".vzb-data-warning-title"),
        body: this.element.select(".vzb-data-warning-body"),
        button: d3.select(this.options.button)
      };
      
      this.element.classed("vzb-hidden", true);

      this.setupDialog();
      this.setupTiggerButton();
      this.setOptions();
    }

    setupDialog() {
      this.DOM.background
        .on("click", () => {
          this.toggle(true);
        });

      this.DOM.container.append("div")
        .html(ICON_CLOSE)
        .on("click", () => {
          this.toggle();
        })
        .select("svg")
        .attr("width", "0px")
        .attr("height", "0px")
        .attr("class", "vzb-data-warning-close");

      this.DOM.icon.html(ICON_WARN)
        .append("div");
    }

    setupTiggerButton() {
      if(!this.DOM.button.size()) return warn("quit setupTiggerButton of DataWarning because no button provided");
      
      setIcon(this.DOM.button, ICON_WARN)
        .append("text")
        .attr("text-anchor", "end")
        .on("click", () => {
          this.toggle();
        })
        .on("mouseover", () => {
          this.updateButtonOpacity(1);
        })
        .on("mouseout", () => {
          this.updateButtonOpacity();
        });
    }

    get MDL(){
      return {
        frame: this.model.encoding.frame,
        selected: this.model.encoding.selected
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      this.addReaction(this.updateUIstrings);
      this.addReaction(this.updateButtonOpacityScale);
      this.addReaction(this.updateButtonOpacity);
      this.addReaction(this.updateButtonPosition);
    }

    updateUIstrings(){
      if (this.DOM.button) this.DOM.button.select("text")
        .text(this.localise("hints/dataWarning"));

      this.DOM.icon.select("div")
        .text(this.localise("hints/dataWarning"));

      const title = this.localise("datawarning/title/" + this.root.name);
      this.DOM.title.html(title)
        .classed("vzb-hidden", !title || title == ("datawarning/title/" + this.root.name));

      this.DOM.body.html(this.localise("datawarning/body/" + this.root.name));
    }

    toggle(arg) {
      if (arg == null) arg = !hidden$2;
      hidden$2 = arg;
      this.element.classed("vzb-hidden", hidden$2);

      this.root.children.forEach(c => {
        c.element.classed("vzb-blur", c != this && !hidden$2);
      });
    }

    updateButtonOpacityScale() {
      this.wScale = this.MDL.frame.scale.d3Scale.copy()
        .domain(this.ui.doubtDomain.map(m => this.MDL.frame.parseValue("" + m)))
        .range(this.ui.doubtRange)
        .clamp(true);
    }

    updateButtonOpacity(opacity) {
      if(!this.DOM.button.size()) return warn("quit updateButtonOpacity of DataWarning because no button provided");

      if (opacity == null) opacity = this.wScale(this.MDL.frame.value);
      if (this.MDL.selected.data.filter.any()) opacity = 1;
      this.DOM.button.style("opacity", opacity);
    }

    updateButtonPosition() {
      if(!this.DOM.button.size()) return warn("quit updateButtonPosition of DataWarning because no button provided");
      const {vertical, horizontal, width, height, wLimit} = this;
      const {top, bottom, left, right} = this;

      // reset font size to remove jumpy measurement
      const dataWarningText = this.DOM.button.select("text")
        .style("font-size", null);

      // reduce font size if the caption doesn't fit
      let warnBB = dataWarningText.node().getBBox();
      const dataWarningWidth = warnBB.width + warnBB.height * 3;
      if (wLimit > 0 && dataWarningWidth > wLimit) {
        const font = parseInt(dataWarningText.style("font-size")) * wLimit / dataWarningWidth;
        dataWarningText.style("font-size", font + "px");
      }

      // position the warning icon
      warnBB = dataWarningText.node().getBBox();
      this.DOM.button.select("svg")
        .attr("width", warnBB.height * 0.75)
        .attr("height", warnBB.height * 0.75)
        .attr("x", -warnBB.width - warnBB.height * 1.2)
        .attr("y", -warnBB.height * 0.65);

      // position the whole group
      warnBB = this.DOM.button.node().getBBox();
      this.DOM.button
        .classed("vzb-hidden", this.services.layout.projector || wLimit && wLimit < HIDE_WHEN_SMALLER_THAN)
        .attr("transform", `translate(${
        horizontal == "left" ? (left + warnBB.width) : (width - right)
      }, ${
        vertical == "top" ? (top + warnBB.height) : (height - bottom)
      })`);
    }

    setOptions({
      //container size
      width = 0,
      height = 0,
      //alignment
      vertical = "top", 
      horizontal = "right", 
      //margins
      top = 0,
      bottom = 0,
      left = 0,
      right = 0,
      //size limit
      wLimit = null
    } = {}) {
      mobx.runInAction(() => {
        this.vertical = vertical;
        this.horizontal = horizontal;
        this.width = width;
        this.height = height;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
        this.wLimit = wLimit || width;
      });
    }

  }

  _DataWarning.DEFAULT_UI = {
    doubtDomain: [],
    doubtRange: []
  };

  //export default BubbleChart;
  const DataWarning = mobx.decorate(_DataWarning, {
    "MDL": mobx.computed,
    "vertical": mobx.observable, 
    "horizontal": mobx.observable, 
    "width": mobx.observable, 
    "height": mobx.observable, 
    "top": mobx.observable, 
    "bottom": mobx.observable, 
    "left": mobx.observable, 
    "right": mobx.observable, 
    "wLimit": mobx.observable
  });

  const CollectionMixin$2 = superClass => class extends superClass {
    //static _collection = {};
    static add(name, addedClass) {
      this._collection[name] = addedClass;
    }
    static get(name) { return CollectionMixin$2._collection[name];}
  };

  CollectionMixin$2._collection = {};

  class Button extends CollectionMixin$2(BaseComponent) {
    constructor (config) {
      super(config);

      const {title, icon, func, required, statebind, statebindfunc, ignoreSize} = config;
      this.title = title;
      this.icon = icon;
      this.func = func;
      this.required = required;
      this.statebind = statebind;
      this.statebindfunc = statebindfunc;
      this.ignoreSize = ignoreSize;
    }
  }

  Button.BaseClass = Button;

  /*!
   * VIZABI INDICATOR PICKER
   * Reusable indicator picker component
   */

  class IndicatorPicker extends BaseComponent {
    constructor(config) {
      config.template = `
      <span class="vzb-ip-holder">
        <span class="vzb-ip-select"></span>
        <span class="vzb-ip-info"></span>
      </span>
    `;

      super(config);
    }

    setup(options) {
      this.targetProp = options.targetProp;
      this.submodel = options.submodel;
      this.submodelFunc = options.submodelFunc;
      this.showHoverValues = options.showHoverValues || false;

      this.DOM = {
        select: this.element.select(".vzb-ip-select"),
        info: this.element.select(".vzb-ip-info")
      };

      this.DOM.select.on("click", () => {
        const rect = this.DOM.select.node().getBoundingClientRect();
        const rootEl = this.root.element;
        const rootRect = rootEl.node().getBoundingClientRect();
        const treemenuComp = this.root.findChild({type: "TreeMenu"});
        const treemenuColWidth = treemenuComp.profileConstants.col_width;
        const treemenuWrapper = treemenuComp.element.select(".vzb-treemenu-wrap");
        const treemenuPaddLeft = parseInt(treemenuWrapper.style("padding-left"), 10) || 0;
        const treemenuPaddRight = parseInt(treemenuWrapper.style("padding-right"), 10) || 0;
        const topPos = rect.bottom - rootRect.top;
        const leftPos = rect.left - rootRect.left - (treemenuPaddLeft + treemenuPaddRight + treemenuColWidth - rect.width) * 0.5;

        if (this._isEncoding()) {
          treemenuComp
            .alignX("left")
            .alignY("top")
            .top(topPos)
            .left(leftPos)
            .encoding(this.targetProp)
            //.updateView()
            .toggle();
        }
      });

      //TODO: continue with Info
    }

    draw() {
      this.MDL = {
        model: this._getModel()
      };
      if (this.showHoverValues) {
        this.MDL.highlighted = this.model.encoding.highlighted;
      }

      this.localise = this.services.locale.auto();
      this.addReaction(this._updateView);
    }

    _getModel() {
      if (this.submodel === "encoding") {
        return this.model.encoding[this.targetProp];
      }
      if (!this.submodel && !this.submodelFunc) return this.model;
      return this.submodelFunc ? this.submodelFunc() : getProp(this, this.submodel.split("."));
    }

    _updateView() {
      let selectText;

      if (this._isEncoding()) {
        if (this.MDL.model.data.isConstant) {
          const constant = this.MDL.model.data.constant;
          const scaleModelType = this.MDL.model.scale.config.modelType;
          selectText = this.localise("indicator/" + constant + (scaleModelType ? "/" + scaleModelType : ""));
        } else if (this.showHoverValues && this.MDL.highlighted.data.filter.any()) {
          const highlightedMarkers = this.MDL.highlighted.data.filter.markers;
          const [key, payload] = highlightedMarkers.entries().next().value;
          const hoverKey = (this.model.dataMap.getByStr(key) || (payload !== true && JSON.parse(payload)) || {})[this.targetProp];

          if (["entity_domain", "entity_set"].includes(this.MDL.model.data.conceptProps.concept_type)){
            // entity domain or set and may gave an extra model to resolve names from  
            if (this.state.hoverKeyLabels && this.state.hoverKeyLabels[hoverKey] != null)
              selectText = this.state.hoverKeyLabels[hoverKey];
            else
              selectText = this.localise(hoverKey);
          } else {        
            selectText = this.localise(hoverKey);
          }
            
        } else {
          selectText = getConceptShortName(this.MDL.model, this.localise);
        }
      }
      this.treemenu = this.root.findChild({type: "TreeMenu"});
      this.DOM.select
        .classed("vzb-disabled", this.treemenu.state.ownReadiness !== STATUS.READY)
        .text(selectText);
    }

    _isEncoding() {
      return !!this.MDL.model.marker;
    }

    _setModel(value) {
      this.MDL.model[this.checkbox] = value;
    }

  }

  function key(d) {return d[Symbol.for("key")];}

  const PROFILE_CONSTANTS$3 = {
    SMALL: {
      minLabelTextSize: 7,
      maxLabelTextSize: 21,
      defaultLabelTextSize: 12,
      labelLeashCoeff: 0.4
    },
    MEDIUM: {
      minLabelTextSize: 7,
      maxLabelTextSize: 30,
      defaultLabelTextSize: 15,
      labelLeashCoeff: 0.3
    },
    LARGE: {
      minLabelTextSize: 6,
      maxLabelTextSize: 48,
      defaultLabelTextSize: 20,
      labelLeashCoeff: 0.2
    }
  };

  const PROFILE_CONSTANTS_FOR_PROJECTOR$3 = {
    MEDIUM: {
      minLabelTextSize: 15,
      maxLabelTextSize: 35,
      defaultLabelTextSize: 15,
      labelLeashCoeff: 0.3
    },
    LARGE: {
      minLabelTextSize: 20,
      maxLabelTextSize: 55,
      defaultLabelTextSize: 20,
      labelLeashCoeff: 0.2
    }
  };


  const OPTIONS$5 = {
    LABELS_CONTAINER_CLASS: "",
    LINES_CONTAINER_CLASS: "",
    LINES_CONTAINER_SELECTOR: "",
    CSS_PREFIX: "",
    SUPPRESS_HIGHLIGHT_DURING_PLAY: true
  };

  class Labels extends BaseComponent {

    setup(options){
      this.context = this.parent;

      this._xScale = null;
      this._yScale = null;
      this._closeCrossHeight = 0;
      this.labelSizeTextScale = null;
      
      this.cached = {};
      this.label = this.LABEL(this);

      this.options = extend({}, OPTIONS$5);
      if(options) this.setOptions(options);
      this.label.setCssPrefix(this.options.CSS_PREFIX);

      this.labelsContainer = this.context.element.select("." + this.options.LABELS_CONTAINER_CLASS);
      this.linesContainer = this.context.element.select("." + this.options.LINES_CONTAINER_CLASS);
      this.tooltipEl = this.labelsContainer
        .append("g").attr("class", this.options.CSS_PREFIX + "-tooltip");
    }

    setOptions(newOptions) {
      extend(this.options, newOptions);
    }

    get MDL() { 
      return {
        frame: this.model.encoding.frame,
        selected: this.model.encoding.selected.data.filter,
        highlighted: this.model.encoding.highlighted.data.filter,
        size: this.model.encoding.size,
        size_label: this.model.encoding.size_label,
        color: this.model.encoding.color,
        label: this.model.encoding.label
      };
    }

    draw() {
      this.addReaction(this._updateLayoutProfile);

      //this._clearInitialFontSize();
      this.addReaction(this.selectDataPoints);
      this.addReaction(this.updateSizeTextScale);
      this.addReaction(this.updateLabelSizeLimits);
      this.addReaction(this.updateLabelsOnlyTextSize);
    }

    readyOnce() {
      //const _this = this;

      // this.model.on("change:marker.select", (evt, path) => {
      //   if (!_this.context._readyOnce) return;
      //   if (path.indexOf("select.labelOffset") !== -1) return;

      //   //console.log("EVENT change:entities:select");
      //   _this.selectDataPoints();
      // });

      // if (this.model.marker.size_label)
      //   this.model.on("change:marker.size_label.extent", (evt, path) => {
      //     //console.log("EVENT change:marker:size:max");
      //     if (!_this.context._readyOnce) return;
      //     _this.updateLabelSizeLimits();
      //     if (_this.model.time.splash) return;
      //     _this.updateLabelsOnlyTextSize();
      //   });

      // if (this.model.ui.chart.labels.hasOwnProperty("removeLabelBox"))
      //   this.model.on("change:ui.chart.labels.removeLabelBox", (evt, path) => {
      //     //console.log("EVENT change:marker:size:max");
      //     if (!_this.context._readyOnce) return;
      //     _this.updateLabelsOnlyTextSize();
      //   });

      // if (this.model.ui.chart.labels.hasOwnProperty("enabled"))
      //   this.model.on("change:ui.chart.labels.enabled", (evt, path) => {
      //     if (!_this.context._readyOnce) return;
      //     _this.selectDataPoints();
      //   });
      
    }



    updateLabelSizeLimits() {
      if (!this.MDL.size_label) return;

      this.services.layout.size;

      const extent = this.MDL.size_label.scale.extent || [0, 1];

      const minLabelTextSize = this.profileConstants.minLabelTextSize;
      const maxLabelTextSize = this.profileConstants.maxLabelTextSize;
      const minMaxDelta = maxLabelTextSize - minLabelTextSize;

      this.minLabelTextSize = Math.max(minLabelTextSize + minMaxDelta * extent[0], minLabelTextSize);
      this.maxLabelTextSize = Math.max(minLabelTextSize + minMaxDelta * extent[1], minLabelTextSize);

      if (this.MDL.size_label.data.isConstant) {
        // if(!this.MDL.size_label.which) {
        //   this.maxLabelTextSize = this.profileConstants.defaultLabelTextSize;
        //   this.MDL.size_label.set({'domainMax': (this.maxLabelTextSize - minLabelTextSize) / minMaxDelta, 'which': '_default'});
        //   return;
        // }
        if (extent[1] === null) {
          this.minLabelTextSize = this.maxLabelTextSize = this.profileConstants.defaultLabelTextSize;
        } else {
          this.minLabelTextSize = this.maxLabelTextSize;
        }
      }

      this.labelSizeTextScale.range([this.minLabelTextSize, this.maxLabelTextSize]);
    }

    updateSizeTextScale() {

      //scales
      if (this.MDL.size_label) {
        this.labelSizeTextScale = this.MDL.size_label.scale.d3Scale;
      }
    }

    setScales(xScale, yScale) {
      this._xScale = xScale;
      this._yScale = yScale;
    }

    setCloseCrossHeight(closeCrossHeight) {
      if (this._closeCrossHeight != closeCrossHeight) {
        this._closeCrossHeight = closeCrossHeight;
        this.updateLabelCloseGroupSize(this.entityLabels.selectAll("." + this.options.CSS_PREFIX + "-label-x"), this._closeCrossHeight);
      }
    }

    xScale(x) {
      return this._xScale ? this._xScale(x) : (x * this.context.width);
    }

    yScale(y) {
      return this._yScale ? this._yScale(y) : (y * this.context.height);
    }

    selectDataPoints() {
      const _this = this;
      const _cssPrefix = this.options.CSS_PREFIX;

      //const select = _this.model.dataArray.filter(d => this.MDL.selected.has(d));
      const select = [...this.MDL.selected.markers.keys()]
        .filter(key => _this.model.dataMap.hasByStr(key))
        .map(selectedKey => ({[Symbol.for("key")]: selectedKey}));
      this.entityLabels = this.labelsContainer.selectAll("." + _cssPrefix + "-entity")
        .data(select, key);
      this.entityLines = this.linesContainer.selectAll("g.entity-line." + _cssPrefix + "-entity")
        .data(select, key);

      this.entityLabels.exit()
        .each(d => {
          if (_this.cached[key(d)] != null) {
            _this.cached[key(d)] = void 0;
          }
        })
        .remove();
      this.entityLines.exit()
        .remove();

      this.entityLines = this.entityLines
        .enter().insert("g", function(d) {
          return this.querySelector("." + _this.options.LINES_CONTAINER_SELECTOR_PREFIX + CSS.escape(key(d)));
        })
        .attr("class", (d) => _cssPrefix + "-entity entity-line line-" + key(d))
        .each(function() {
          _this.label.line(d3.select(this));
        })
        .merge(this.entityLines)
        .classed("vzb-hidden", !this.ui.enabled);

      this.entityLabels = this.entityLabels
        .enter().append("g")
        .attr("class", (d) => _cssPrefix + "-entity label-" + key(d))
        .each(function(d) {
          _this.cached[key(d)] = { _new: true };
          _this.label(d3.select(this));
        })
        .merge(this.entityLabels)
        .classed("vzb-hidden", !this.ui.enabled);
    
      Object.keys(this.ui.offset).forEach(key => {
        if (!this.MDL.selected.has(key)) {
          delete this.ui.offset[key];
        }
      });
    }

    showCloseCross(d, show) {
      //show the little cross on the selected label
      this.entityLabels
        .filter(f => d ? key(f) == key(d) : true)
        .select("." + this.options.CSS_PREFIX + "-label-x")
        .classed("vzb-transparent", !show || isTouchDevice());
    }

    highlight(d, highlight) {
      let labels = this.entityLabels;
      if (d) {
        labels = labels.filter(f => d ? key(f) == key(d) : true);
      }
      labels.classed("vzb-highlighted", highlight);
    }

    updateLabel(d, cache, valueX, valueY, valueS, valueC, valueL, valueLST, duration, showhide) {
      const _this = this;
      if (key(d) == this.dragging) return;

      const _cssPrefix = this.options.CSS_PREFIX;

      // only for selected entities
      if (this.MDL.selected.has(d)  && this.entityLabels != null) {
        if (this.cached[key(d)] == null) this.selectDataPoints();

        const cached = this.cached[key(d)];
        if (cache) extend(cached, cache);


        if (cached.scaledS0 == null || cached.labelX0 == null || cached.labelY0 == null) { //initialize label once
          this._initNewCache(cached, valueX, valueY, valueS, valueC, valueL, valueLST);
        }

        if (cached.labelX_ == null || cached.labelY_ == null) {
          const labelOffset = this.ui.offset[key(d)];
          cached.labelOffset = (labelOffset && labelOffset.slice(0)) || [0, 0];
        }

        const brokenInputs = !cached.labelX0 && cached.labelX0 !== 0 || !cached.labelY0 && cached.labelY0 !== 0 || !cached.scaledS0 && cached.scaledS0 !== 0;

        const lineGroup = this.entityLines.filter(f => key(f) == key(d));
        // reposition label
        this.entityLabels.filter(f => key(f) == key(d))
          .each(function() {

            const labelGroup = d3.select(this);

            if (brokenInputs) {
              labelGroup.classed("vzb-invisible", brokenInputs);
              lineGroup.classed("vzb-invisible", brokenInputs);
              return;
            }

            const text = labelGroup.selectAll("." + _cssPrefix + "-label-content")
              .text(valueL || cached.labelText);

            _this._updateLabelSize(d, null, labelGroup, valueLST, text);

            _this.positionLabel(d, null, this, duration, showhide, lineGroup);
          });
      }
    }

    _initNewCache(cached, valueX, valueY, valueS, valueC, valueL, valueLST) {
      if (valueS || valueS === 0) cached.scaledS0 = areaToRadius(this.context.sScale(valueS));
      cached.valueS0 = valueS;
      cached.labelX0 = valueX;
      cached.labelY0 = valueY;
      cached.labelText = valueL;
      cached.valueLST = valueLST;
      cached.scaledC0 = valueC != null ? this.context.cScale(valueC) : this.context.COLOR_WHITEISH;
    }



    setTooltip(d, tooltipText, tooltipCache, labelValues) {
      if (tooltipText) {
        let position = 0;
        const _cssPrefix = this.options.CSS_PREFIX;
        this.tooltipEl.raise().text(null);
        this.label(this.tooltipEl, true);
        if (d) {
          const cache = {};
          this._initNewCache(cache, labelValues.valueX, labelValues.valueY, labelValues.valueS, labelValues.valueC, "", labelValues.valueLST);
          this.tooltipEl
            .classed(this.options.CSS_PREFIX + "-tooltip", false)
            .classed(this.options.CSS_PREFIX + "-entity", true)
            .selectAll("." + _cssPrefix + "-label-content")
            .text(labelValues.labelText);
          this._updateLabelSize(d, cache, this.tooltipEl, labelValues.valueLST);
          position = this.positionLabel(d, cache, this.tooltipEl.node(), 0, null, this.tooltipEl.select(".lineemptygroup"));
        }
        this.tooltipEl
          .classed(this.options.CSS_PREFIX + "-entity", false)
          .classed(this.options.CSS_PREFIX + "-tooltip", true)
          .selectAll("." + _cssPrefix + "-label-content")
          .text(tooltipText);
        this._updateLabelSize(d, tooltipCache, this.tooltipEl, null);
        this.positionLabel(d, tooltipCache, this.tooltipEl.node(), 0, null, this.tooltipEl.select(".lineemptygroup"), position);
      } else {
        this.tooltipEl.text(null);
      }
    }

    setTooltipFontSize(fontSize) {
      this.tooltipEl.style("font-size", fontSize);
    }

    _updateLabelSize(d, cache, labelGroup, valueLST, text) {
      const _this = this;
      const cached = cache || _this.cached[key(d)];


      const _cssPrefix = this.options.CSS_PREFIX;

      const labels = this.root.ui.chart.labels;
      labelGroup.classed("vzb-label-boxremoved", labels.removeLabelBox);

      const _text = text || labelGroup.selectAll("." + _cssPrefix + "-label-content");

      if (_this.labelSizeTextScale) {
        if (valueLST != null) {
          const range = _this.labelSizeTextScale.range();
          const fontSize = range[0] + Math.sqrt((_this.labelSizeTextScale(valueLST) - range[0]) * (range[1] - range[0]));
          _text.attr("font-size", fontSize + "px");
          cached.fontSize = fontSize;
          if (!cached.initFontSize) cached.initFontSize = fontSize;
        } else {
          _text.attr("font-size", null);
          cached.fontSize = parseFloat(_text.style("font-size"));
          if (!cached.initFontSize) cached.initFontSize = cached.fontSize;
        }
      } else {
        cached.fontSize = parseFloat(_text.style("font-size"));
        if (!cached.initFontSize) cached.initFontSize = cached.fontSize;
      }

      let contentBBox;
      //if (!cached.initTextBBox) {
      //turn off stroke because ie11/edge return stroked bounding box for text
      _text.style("stroke", "none");
      cached.initTextBBox = _text.node().getBBox();
      _text.style("stroke", null);
      contentBBox = cached.textBBox = {
        width: cached.initTextBBox.width,
        height: cached.initTextBBox.height
      };
      //}

      const scale = cached.fontSize / cached.initFontSize;
      cached.textBBox.width = cached.initTextBBox.width * scale;
      cached.textBBox.height = cached.initTextBBox.height * scale;

      contentBBox = cached.textBBox;

      const rect = labelGroup.selectAll("rect");

      if (!cached.textWidth || cached.textWidth != contentBBox.width) {
        cached.textWidth = contentBBox.width;

        const labelCloseHeight = _this._closeCrossHeight || contentBBox.height;//_this.profileConstants.infoElHeight * 1.2;//contentBBox.height;

        const isRTL = _this.services.locale.isRTL();
        const labelCloseGroup = labelGroup.select("." + _cssPrefix + "-label-x")
          .attr("transform", "translate(" + (isRTL ? -contentBBox.width - 4 : 4) + "," + (-contentBBox.height * 0.85) + ")");

        this.updateLabelCloseGroupSize(labelCloseGroup, labelCloseHeight);

        //cache label bound rect for reposition
        const rectBBox = cached.rectBBox = {
          x: -contentBBox.width - 4,
          y: -contentBBox.height * 0.85,
          width: contentBBox.width + 8,
          height: contentBBox.height * 1.2
        };
        cached.rectOffsetX = rectBBox.width + rectBBox.x;
        cached.rectOffsetY = rectBBox.height + rectBBox.y;

        rect.attr("width", rectBBox.width)
          .attr("height", rectBBox.height)
          .attr("x", rectBBox.x)
          .attr("y", rectBBox.y)
          .attr("rx", contentBBox.height * 0.2)
          .attr("ry", contentBBox.height * 0.2);
      }

      const glowRect = labelGroup.select(".vzb-label-glow");
      if (glowRect.attr("stroke") !== cached.scaledC0) {
        glowRect.attr("stroke", cached.scaledC0);
      }
    }

    _clearInitialFontSize() {
      forEach(this.cached, cache => {
        if (!cache) return;
        cache.initFontSize = null;
        cache.initTextBBox = null;
      });
    }

    updateLabelCloseGroupSize(labelCloseGroup, labelCloseHeight) {
      labelCloseGroup.select("circle")
        .attr("cx", /*contentBBox.height * .0 + */ 0)
        .attr("cy", 0)
        .attr("r", labelCloseHeight * 0.5);

      labelCloseGroup.select("svg")
        .attr("x", -labelCloseHeight * 0.5)
        .attr("y", labelCloseHeight * -0.5)
        .attr("width", labelCloseHeight)
        .attr("height", labelCloseHeight);

    }

    updateLabelsOnlyTextSize() {
      const _this = this;
      this.MDL.size_label.scale.extent;
      this.services.layout.size;

      this.entityLabels.each(function(d) {
        _this._updateLabelSize(d, null, d3.select(this), _this.model.dataMap.getByStr(d[Symbol.for("key")]).size_label);
        if (_this.cached[key(d)]._new) return;
        const lineGroup = _this.entityLines.filter(f => key(f) == key(d));
        _this.positionLabel(d, null, this, 0, null, lineGroup);
      });
    }

    updateLabelOnlyPosition(d, index, cache) {
      const _this = this;
      const cached = this.cached[key(d)];
      if (cache) extend(cached, cache);

      const lineGroup = _this.entityLines.filter(f => key(f) == key(d));

      this.entityLabels.filter(f => key(f) == key(d))
        .each(function() {
          _this.positionLabel(d, null, this, 0, null, lineGroup);
        });
    }

    updateLabelOnlyColor(d, index, cache) {
      const _this = this;
      const cached = this.cached[key(d)];
      if (cache) extend(cached, cache);

      const labelGroup = _this.entityLabels.filter(f => key(f) == key(d));

      _this._updateLabelSize(d, null, labelGroup, null);

    }

    positionLabel(d, cache, context, duration, showhide, lineGroup, position) {
      if (key(d) == this.dragging) return;
      
      const cached = cache || this.cached[key(d)];

      const lockPosition = (position || position === 0);
      const hPos = (position || 0) & 1;
      const vPos = ((position || 0) & 2) >> 1;
      let hPosNew = 0;
      let vPosNew = 0;
      const viewWidth = this.context.width;
      const viewHeight = this.context.height;

      const resolvedX0 = this.xScale(cached.labelX0);
      const resolvedY0 = this.yScale(cached.labelY0);

      const offsetX = cached.rectOffsetX;
      const offsetY = cached.rectOffsetY;

      if (!cached.labelOffset) cached.labelOffset = [0, 0];

      cached.labelX_ = cached.labelOffset[0] || (-cached.scaledS0 * 0.75 - offsetX) / viewWidth;
      cached.labelY_ = cached.labelOffset[1] || (-cached.scaledS0 * 0.75 - offsetY) / viewHeight;

      //check default label position and switch to mirror position if position
      //does not bind to visible field
      let resolvedX = resolvedX0 + cached.labelX_ * viewWidth;
      let resolvedY = resolvedY0 + cached.labelY_ * viewHeight;
      if (cached.labelOffset[0] + cached.labelOffset[1] == 0) {
        if ((!lockPosition && (resolvedY - cached.rectBBox.height + offsetY <= 0)) || vPos) { // check top
          vPosNew = 1;
          cached.labelY_ = (cached.scaledS0 * 0.75 + cached.rectBBox.height - offsetY) / viewHeight;
          resolvedY = resolvedY0 + cached.labelY_ * viewHeight;
        }
        //  else if (resolvedY + 10 > viewHeight) { //check bottom
        //   cached.labelY_ = (viewHeight - 10 - resolvedY0) / viewHeight;
        //   resolvedY = resolvedY0 + cached.labelY_ * viewHeight;
        // }

        if ((!lockPosition && (resolvedX - cached.rectBBox.width + offsetX <= 0)) || hPos) { //check left
          hPosNew = 1;
          cached.labelX_ = (cached.scaledS0 * 0.75 + cached.rectBBox.width - offsetX) / viewWidth;
          resolvedX = resolvedX0 + cached.labelX_ * viewWidth;
          if (resolvedX > viewWidth) {
            hPosNew = 0;
            vPosNew = (vPosNew == 0 && (resolvedY0 - offsetY * 0.5 - cached.scaledS0) < cached.rectBBox.height) ? 1 : vPosNew;
            cached.labelY_ = vPosNew ? -offsetY * 0.5 + cached.rectBBox.height + cached.scaledS0 : -offsetY * 1.5 - cached.scaledS0;
            cached.labelY_ /= viewHeight;
            resolvedY = resolvedY0 + cached.labelY_ * viewHeight;
            cached.labelX_ = (cached.rectBBox.width - offsetX - resolvedX0) / viewWidth;
            resolvedX = resolvedX0 + cached.labelX_ * viewWidth;
          }

        }
        //  else if (resolvedX + 15 > viewWidth) { //check right
        //   cached.labelX_ = (viewWidth - 15 - resolvedX0) / viewWidth;
        //   resolvedX = resolvedX0 + cached.labelX_ * viewWidth;
        // }
      }

      if (lockPosition) {
        let topCornerCase = false;
        if (resolvedX - cached.rectBBox.width + offsetX <= 0) {
          const deltaX = resolvedX0 - cached.rectBBox.width;
          const deltaY = deltaX > 0 ? cathetus(cached.scaledS0, deltaX) : cached.scaledS0;
          resolvedY = vPosNew ?
            resolvedY0 + cached.rectBBox.height - offsetY * 0.5 + deltaY
            :
            resolvedY0 - offsetY * 1.5 - deltaY;
          if (resolvedY - cached.rectBBox.height < 0) {
            topCornerCase = true;
          }
        }
        if (resolvedY - cached.rectBBox.height + offsetY <= 0) {
          const deltaY = resolvedY0 - cached.rectBBox.height;
          const deltaX = deltaY > 0 ? cathetus(cached.scaledS0, deltaY) : cached.scaledS0;
          resolvedX = hPosNew ?
            resolvedX0 + cached.rectBBox.width + deltaX
            :
            resolvedX0 - offsetX * 2 - deltaX;
          if (resolvedX - cached.rectBBox.width < 0 || resolvedX > viewWidth) {
            topCornerCase = true;
          }
        }
        if (topCornerCase) {
          vPosNew++;
          const deltaX = resolvedX0 - cached.rectBBox.width;
          resolvedY = resolvedY0 + cached.rectBBox.height - offsetY * 0.5 + (deltaX > 0 ? cathetus(cached.scaledS0, deltaX) : cached.scaledS0);
        }
      }

      this.label._repositionLabels(d, cache, context, resolvedX, resolvedY, resolvedX0, resolvedY0, duration, showhide, lineGroup);

      return vPosNew * 2 + hPosNew;
    }

    _updateLayoutProfile(){
      this.services.layout.size;

      this.profileConstants = this.services.layout.getProfileConstants(PROFILE_CONSTANTS$3, PROFILE_CONSTANTS_FOR_PROJECTOR$3);
      this.height = (this.element.node().clientHeight) || 0;
      this.width = (this.element.node().clientWidth) || 0;
      if (!this.height || !this.width) return warn("Chart _updateProfile() abort: container is too little or has display:none");
    }





    LABEL(context) {

      return (function d3_label() {

        const _this = context;

        let _cssPrefix;
        label.setCssPrefix = function(cssPrefix) {
          _cssPrefix = cssPrefix;
          return label;
        };

        const labelDragger = d3.drag()
          .on("start", event => {
            event.sourceEvent.stopPropagation();
          })
          .on("drag", function(event, d) {
            if (!_this.ui.dragging) return;
            if (!_this.dragging) _this.dragging = key(d);
            const cache = _this.cached[key(d)];
            cache.labelFixed = true;

            const viewWidth = _this.context.width;
            const viewHeight = _this.context.height;

            cache.labelX_ += event.dx / viewWidth;
            cache.labelY_ += event.dy / viewHeight;

            const resolvedX = _this.xScale(cache.labelX0) + cache.labelX_ * viewWidth;
            const resolvedY = _this.yScale(cache.labelY0) + cache.labelY_ * viewHeight;

            const resolvedX0 = _this.xScale(cache.labelX0);
            const resolvedY0 = _this.yScale(cache.labelY0);

            const lineGroup = _this.entityLines.filter(f => key(f) == key(d));

            label._repositionLabels(d, null, this, resolvedX, resolvedY, resolvedX0, resolvedY0, 0, null, lineGroup);
          })
          .on("end", (event, d) => {
            if (_this.dragging) {
              const cache = _this.cached[key(d)];
              _this.dragging = null;
              cache.labelOffset[0] = cache.labelX_;
              cache.labelOffset[1] = cache.labelY_;
              //marker model is a wrong place to save those, maybe labels ui is a better place
              //in form of this.ui.offset = {"geo-afg":[dx, dy]} 
              //_this.model.setLabelOffset(d, [cache.labelX_, cache.labelY_]);
              _this.ui.offset = Object.assign(_this.ui.offset, {[key(d)]: [cache.labelX_, cache.labelY_]});
              //_this.ui.offset[key(d)] = [cache.labelX_, cache.labelY_];
              //_this.ui.offset = {[key(d)]: [cache.labelX_, cache.labelY_]};
            }
          });

        function label(container, isTooltip) {

          container
            .each(function(d) {
              const view = d3.select(this);

              // Ola: Clicking bubble label should not zoom to countries boundary #811
              // It's too easy to accidentally zoom
              // This feature will be activated later, by making the label into a "context menu" where users can click Split, or zoom,.. hide others etc....

              view.append("rect")
                .attr("class", "vzb-label-glow")
                .attr("filter", "url(" + location.pathname + "#vzb-glow-filter)");
              view.append("rect")
                .attr("class", "vzb-label-fill vzb-tooltip-border");
              //          .on("click", function(event, d) {
              //            //default prevented is needed to distinguish click from drag
              //            if(event.defaultPrevented) return;
              //
              //            var maxmin = _this.cached[key(d)].maxMinValues;
              //            var radius = utils.areaToRadius(_this.sScale(maxmin.valueSmax));
              //            _this._panZoom._zoomOnRectangle(_this.element,
              //              _this.xScale(maxmin.valueXmin) - radius,
              //              _this.yScale(maxmin.valueYmin) + radius,
              //              _this.xScale(maxmin.valueXmax) + radius,
              //              _this.yScale(maxmin.valueYmax) - radius,
              //              false, 500);
              //          });

              const text = view.append("text").attr("class", _cssPrefix + "-label-content stroke");
              if (!view.style("paint-order").length) {
                view.insert("text", `.${_cssPrefix}-label-content`)
                  .attr("class", _cssPrefix + "-label-content " + _cssPrefix + "-label-shadow vzb-noexport");

                text.classed("stroke", false);
              }

              if (!isTooltip) {
                const cross = view.append("g").attr("class", _cssPrefix + "-label-x vzb-transparent");
                setIcon(cross, ICON_CLOSE);

                cross.insert("circle", "svg");

                cross.select("svg")
                  .attr("class", _cssPrefix + "-label-x-icon")
                  .attr("width", "0px")
                  .attr("height", "0px");

                cross.on("click", event => {
                  //default prevented is needed to distinguish click from drag
                  if (event.defaultPrevented) return;
                  event.stopPropagation();
                  _this.MDL.highlighted.delete(d);
                  _this.MDL.selected.delete(d);
                });
              }

            });

          if (!isTooltip) {
            container
              .call(labelDragger)
              .on("mouseenter", function(event, d) {
                if (isTouchDevice() || _this.dragging) return;
                _this.MDL.highlighted.set(d);
                // hovered label should be on top of other labels: if "a" is not the hovered element "d", send "a" to the back
                _this.entityLabels.sort((a) => key(a) != key(d) ? -1 : 1);
                d3.select(this).selectAll("." + _cssPrefix + "-label-x")
                  .classed("vzb-transparent", false);
              })
              .on("mouseleave", function(event, d) {
                if (isTouchDevice() || _this.dragging) return;
                _this.MDL.highlighted.delete(d);
                d3.select(this).selectAll("." + _cssPrefix + "-label-x")
                  .classed("vzb-transparent", true);
              })
              .on("click", function(event, d) {
                if (!isTouchDevice()) return;
                const cross = d3.select(this).selectAll("." + _cssPrefix + "-label-x");
                const hidden = cross.classed("vzb-transparent");
                if (hidden) {
                  // hovered label should be on top of other labels: if "a" is not the hovered element "d", send "a" to the back
                  _this.entityLabels.sort((a) => key(a) != key(d) ? -1 : 1);
                  _this.showCloseCross(null, false);
                }
                cross.classed("vzb-transparent", !hidden);
                if (!_this.options.SUPPRESS_HIGHLIGHT_DURING_PLAY || !_this.MDL.frame.playing) {
                  if (hidden) {
                    _this.MDL.highlighted.set(d);
                  } else {
                    _this.MDL.highlighted.delete(d);
                  }
                }
              });
          }

          return label;
        }

        label.line = function(container) {
          container.append("line").attr("class", _cssPrefix + "-label-line");
        };


        label._repositionLabels = _repositionLabels;
        function _repositionLabels(d, _cache, labelContext, _X, _Y, _X0, _Y0, duration, showhide, lineGroup) {

          const cache = _cache || _this.cached[key(d)];

          const labelGroup = d3.select(labelContext);

          //protect label and line from the broken data
          const brokenInputs = !_X && _X !== 0 || !_Y && _Y !== 0 || !_X0 && _X0 !== 0 || !_Y0 && _Y0 !== 0;
          if (brokenInputs) {
            labelGroup.classed("vzb-invisible", brokenInputs);
            lineGroup.classed("vzb-invisible", brokenInputs);
            return;
          }

          const viewWidth = _this.context.width;
          const viewHeight = _this.context.height;
          const rectBBox = cache.rectBBox;
          const height = rectBBox.height;
          const offsetX = cache.rectOffsetX;
          const offsetY = cache.rectOffsetY;

          //apply limits so that the label doesn't stick out of the visible field
          if (_X + rectBBox.x <= 0) { //check left
            _X = -rectBBox.x;
            cache.labelX_ = (_X - _this.xScale(cache.labelX0)) / viewWidth;
          } else if (_X + offsetX > viewWidth) { //check right
            _X = viewWidth - offsetX;
            cache.labelX_ = (_X - _this.xScale(cache.labelX0)) / viewWidth;
          }
          if (_Y + rectBBox.y <= 0) { // check top
            _Y = -rectBBox.y;
            cache.labelY_ = (_Y - _this.yScale(cache.labelY0)) / viewHeight;
          } else if (_Y + offsetY > viewHeight) { //check bottom
            _Y = viewHeight - offsetY;
            cache.labelY_ = (_Y - _this.yScale(cache.labelY0)) / viewHeight;
          }
          // if (_Y - height * 0.75 <= 0) { // check top
          //   _Y = height * 0.75;
          //   cache.labelY_ = (_Y - _this.yScale(cache.labelY0)) / viewHeight;
          // } else if (_Y + height * 0.35 > viewHeight) { //check bottom
          //   _Y = viewHeight - height * 0.35;
          //   cache.labelY_ = (_Y - _this.yScale(cache.labelY0)) / viewHeight;
          // }

          if (duration == null) duration = _this.context.duration;
          if (cache._new) {
            duration = 0;
            delete cache._new;
          }
          if (duration) {
            if (showhide && !d.hidden) {
              //if need to show label

              labelGroup.classed("vzb-invisible", d.hidden);
              labelGroup
                .attr("transform", "translate(" + _X + "," + _Y + ")")
                .style("opacity", 0)
                .transition().duration(duration).ease(d3.easeExp)
                .style("opacity", 1)
              //i would like to set opactiy to null in the end of transition.
              //but then fade in animation is not working for some reason
                .on("interrupt", () => {
                  labelGroup
                    .style("opacity", 1);
                });
              lineGroup.classed("vzb-invisible", d.hidden);
              lineGroup
                .attr("transform", "translate(" + _X + "," + _Y + ")")
                .style("opacity", 0)
                .transition().duration(duration).ease(d3.easeExp)
                .style("opacity", 1)
              //i would like to set opactiy to null in the end of transition.
              //but then fade in animation is not working for some reason
                .on("interrupt", () => {
                  lineGroup
                    .style("opacity", 1);
                });

            } else if (showhide && d.hidden) {
              //if need to hide label

              labelGroup
                .style("opacity", 1)
                .transition().duration(duration).ease(d3.easeExp)
                .style("opacity", 0)
                .on("end", () => {
                  labelGroup
                    .style("opacity", 1) //i would like to set it to null. but then fade in animation is not working for some reason
                    .classed("vzb-invisible", d.hidden);
                });
              lineGroup
                .style("opacity", 1)
                .transition().duration(duration).ease(d3.easeExp)
                .style("opacity", 0)
                .on("end", () => {
                  lineGroup
                    .style("opacity", 1) //i would like to set it to null. but then fade in animation is not working for some reason
                    .classed("vzb-invisible", d.hidden);
                });

            } else {
              // just update the position

              labelGroup
                .transition().duration(duration).ease(d3.easeLinear)
                .attr("transform", "translate(" + _X + "," + _Y + ")");
              lineGroup
                .transition().duration(duration).ease(d3.easeLinear)
                .attr("transform", "translate(" + _X + "," + _Y + ")");
            }

          } else {
            labelGroup
              .interrupt()
              .attr("transform", "translate(" + _X + "," + _Y + ")")
              .transition();
            lineGroup
              .interrupt()
              .attr("transform", "translate(" + _X + "," + _Y + ")")
              .transition();
            if (showhide) labelGroup.classed("vzb-invisible", d.hidden);
            if (showhide) lineGroup.classed("vzb-invisible", d.hidden);
          }

          const diffX1 = _X0 - _X;
          const diffY1 = _Y0 - _Y;
          const textBBox = cache.textBBox;
          let diffX2 = -textBBox.width * 0.5;
          let diffY2 = -height * 0.2;
          const labels = _this.root.ui.chart.labels;

          const bBox = labels.removeLabelBox ? textBBox : rectBBox;

          const FAR_COEFF = _this.profileConstants.labelLeashCoeff || 0;

          const lineHidden = circleRectIntersects({ x: diffX1, y: diffY1, r: cache.scaledS0 },
            { x: diffX2, y: diffY2, width: (bBox.height * 2 * FAR_COEFF + bBox.width), height: (bBox.height * (2 * FAR_COEFF + 1)) });
          lineGroup.select("line").classed("vzb-invisible", lineHidden);
          if (lineHidden) return;

          if (labels.removeLabelBox) {
            const angle = Math.atan2(diffX1 - diffX2, diffY1 - diffY2) * 180 / Math.PI;
            const deltaDiffX2 = (angle >= 0 && angle <= 180) ? (bBox.width * 0.5) : (-bBox.width * 0.5);
            const deltaDiffY2 = (Math.abs(angle) <= 90) ? (bBox.height * 0.55) : (-bBox.height * 0.45);
            diffX2 += Math.abs(diffX1 - diffX2) > textBBox.width * 0.5 ? deltaDiffX2 : 0;
            diffY2 += Math.abs(diffY1 - diffY2) > textBBox.height * 0.5 ? deltaDiffY2 : (textBBox.height * 0.05);
          }

          const longerSideCoeff = Math.abs(diffX1) > Math.abs(diffY1) ? Math.abs(diffX1) : Math.abs(diffY1);
          lineGroup.select("line").style("stroke-dasharray", "0 " + (cache.scaledS0) + " " + ~~(longerSideCoeff) * 2);

          lineGroup.selectAll("line")
            .attr("x1", diffX1)
            .attr("y1", diffY1)
            .attr("x2", diffX2)
            .attr("y2", diffY2);

        }

        /*
        * Adapted from
        * http://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection
        *
        * circle {
        *  x: center X
        *  y: center Y
        *  r: radius
        * }
        *
        * rect {
        *  x: center X
        *  y: center Y
        *  width: width
        *  height: height
        * }
        */
        function circleRectIntersects(circle, rect) {
          const circleDistanceX = Math.abs(circle.x - rect.x);
          const circleDistanceY = Math.abs(circle.y - rect.y);
          const halfRectWidth = rect.width * 0.5;
          const halfRectHeight = rect.height * 0.5;

          if (circleDistanceX > (halfRectWidth + circle.r)) { return false; }
          if (circleDistanceY > (halfRectHeight + circle.r)) { return false; }

          if (circleDistanceX <= halfRectWidth) { return true; }
          if (circleDistanceY <= halfRectHeight) { return true; }

          const cornerDistance_sq = Math.pow(circleDistanceX - halfRectWidth, 2) +
                              Math.pow(circleDistanceY - halfRectHeight, 2);

          return (cornerDistance_sq <= Math.pow(circle.r, 2));
        }

        return label;
      })();
    }
  }


  Labels.DEFAULT_UI = {
    offset: () => ({}),
    enabled: true,
    dragging: true,
    removeLabelBox: false
  };

  const decorated$8 = mobx.decorate(Labels, {
    "MDL": mobx.computed
  });

  const CollectionMixin$1 = superClass => class extends superClass {
    //static _collection = {};
    static add(name, addedClass) {
      CollectionMixin$1._collection[name] = addedClass;
    }
    static get(name) { return CollectionMixin$1._collection[name];}
  };

  CollectionMixin$1._collection = {};

  class Chart extends CollectionMixin$1(BaseComponent) {}

  class Facet extends BaseComponent {
    // constructor(config) {
    //   const facet = config.model.encoding.get("facet");

    //   const {
    //     COMP_CSSNAME,
    //     COMP_TYPE
    //   } = config.options;
    //   const templateArray  = [];
    //   const subcomponents = [];
    //   const baseUI = config.baseUI;
    //   config.baseUI = {};

    //   const lastIndex = facet.filters.length;
    //   for (let index = 0; index < lastIndex; index++) {
    //     templateArray.push(
    //       '<div class="' + COMP_CSSNAME + ' ' + COMP_CSSNAME + subcomponents.length + '"></div>'
    //     )
    //     subcomponents.push({
    //       type: COMP_TYPE,
    //       placeholder: "." + COMP_CSSNAME + subcomponents.length,
    //       model: config.model,
    //       name: "chart_" + index,
    //       state: {
    //         facet: {
    //           index
    //         },
    //         alias: facet.alias
    //       },
    //       ui: config.ui,
    //     });
    //     config.baseUI["chart_" + index] = baseUI;
    //   }

    //   config.subcomponents = subcomponents;
    //   config.template = templateArray.join("\n");

    //   super(config);
    // }
    get MDL() {
      return ({
        facet: this.model.encoding.facet
      })
    }

    draw() {
      const facet = this.MDL.facet;
      const rowEncoding = this.model.encoding[facet.rowEncoding];
      const columnEncoding = this.model.encoding[facet.columnEncoding];

      console.log(rowEncoding.data.dataDomain);
      console.log(columnEncoding.data.dataDomain);
    }

    loading() {
      this.addReaction(()=> {
        this.element.style("grid-template-columns", Array(this.ui.columns).fill("1fr").join(" "));
        this.element.style("grid-template-rows", Array(this.ui.rows).fill("1fr").join(" "));
        this.element.style("grid-auto-flow", this.ui.direction);
      });
    }

    resize() {
      this.services.layout.size;

      this.elementHeight = (this.element.node().clientHeight) || 0;
      this.elementWidth = (this.element.node().clientWidth) || 0;

      // this.ui.viewWH = { 
      //   width: this.elementWidth / facet.column.length,
      //   height: this.elementHeight / facet.row.length
      // };
      this.ui.viewWH.width = this.elementWidth / this.ui.columns,
      this.ui.viewWH.height = this.elementHeight / this.ui.rows;

    }

    addClass() {
      this.ui.rows - 1;
      this.ui.columns - 1;
      const lastIndex = facet.filters.length;
      for (let index = 0; index < lastIndex; index++) {
        index % this.ui.rows;
        index % this.ui.columns;
      }



    }
  //' vzb-sm-chart ' + classed + '
  }

  Facet.DEFAULT_UI = {
    viewWH: {
      width: 0,
      height: 0
    },
    row: 1,
    column: 1,
    direction: "column"
  };

  /*!
   * VIZABI DIALOG
   * Reusable Dialog component
   */

  const PROFILE_CONSTANTS$2 = {
    SMALL: {},
    MEDIUM: {},
    LARGE: {}
  };


  const PROFILE_CONSTANTS_FOR_PROJECTOR$2 = {
    SMALL: {},
    MEDIUM: {},
    LARGE: {}
  };


  const CollectionMixin = superClass => class extends superClass {
    //static _collection = {};
    static add(name, addedClass) {
      CollectionMixin._collection[name] = addedClass;
    }
    static get(name) { return CollectionMixin._collection[name];}
  };

  CollectionMixin._collection = {};

  class Dialog extends CollectionMixin(BaseComponent) {
    constructor(config) {

      super(config);
    } 

    setup() {
      this.DOM = {
        dialog: this.element.select(".vzb-dialog-modal"),
        title: this.element.select(".vzb-dialog-modal>.vzb-dialog-title"),
        buttons: d3.select(this.element.selectAll(".vzb-dialog-modal>.vzb-dialog-buttons").nodes().pop()),
        content: this.element.select(".vzb-dialog-modal > .vzb-dialog-content"),
        dragHandler: this.element.select("[data-click='dragDialog']"),
        pinIcon: this.element.select("[data-click='pinDialog']")
      };
      this.transitionEvents = ["webkitTransitionEnd", "transitionend", "msTransitionEnd", "oTransitionEnd"];

      this.state["opened"] = false;

      const _this = this;

      this.DOM.dragHandler.html(ICON_DRAG);
      this.DOM.pinIcon.html(ICON_PIN);
      this.DOM.pinIcon.on("click", () => {
        this.setPin(!this.getPin());
      });

      const dg = dialogDrag(this.element, this.root.element, 10);
      const dragBehavior = d3.drag()
        .on("start", (event) => {
          const topPos = _this.element.node().offsetTop;
          _this.element.style("top", topPos + "px");
          _this.element.style("bottom", "auto");
          _this.element.dispatch("custom-dragstart");
          dg.dragStart(event);
        })
        .on("drag", (event) => {
          _this.element.dispatch("custom-drag");
          dg.drag(event);
        })
        .on("end", () => {
          _this.rightPos = _this.element.style("right");
          _this.topPos = _this.element.style("top");
          _this.element.dispatch("custom-dragend");
        });
      this.DOM.dragHandler.call(dragBehavior);
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame,
        selected: this.model.encoding.selected,
        highlighted: this.model.encoding.highlighted
      };
    }


    draw() {
      this.localise = this.services.locale.auto();

      this._localiseDialogTexts();

      if (this._updateLayoutProfile()) return; //return if exists with error
      this.addReaction(this._pinButtonUpdate);
      this.addReaction(this._updateSize);
    }

    resize() {
      
    }

    _localiseDialogTexts() {
      const _this = this;
      this.element.selectAll("span[data-localise]").each(function() {
        const view = d3.select(this);
        view.text(_this.localise(view.attr("data-localise")));
      });
    }

    _updateLayoutProfile(){
      this.services.layout.size;

      this.profileConstants = this.services.layout.getProfileConstants(PROFILE_CONSTANTS$2, PROFILE_CONSTANTS_FOR_PROJECTOR$2);
      this.height = this.element.node().clientHeight || 0;
      this.width = this.element.node().clientWidth || 0;
      if (!this.height || !this.width) return warn("Dialog _updateProfile() abort: container is too little or has display:none");
    }

    _updateSize() {
      this.services.layout.size;
      
      if (this.element.classed("vzb-top-dialog")) {
        this.element.classed("notransition", true);

        const profile = this.services.layout.profile;

        if (profile !== "SMALL") {
          const chartWidth = this.root.element.node().offsetWidth || 0;
          const chartHeight = this.root.element.node().offsetHeight || 0;
          const dialogWidth = parseInt(this.element.style("width"), 10) || 0;
          const dialogHeight = parseInt(this.element.style("height"), 10) || 0;

          const dialogRight = parseInt(this.rightPos, 10);
          const dialogTop = parseInt(this.topPos, 10);
          const dialogRightMargin = parseInt(this.element.style("margin-right"), 10) || 0;
          if (isNumber(dialogRight) && dialogRight > chartWidth - dialogWidth - dialogRightMargin) {
            if (this.rightPos) {
              this.rightPos = (chartWidth - dialogWidth - dialogRightMargin) + "px";
              if (this.isOpen) this.element.style("right", this.rightPos);
            }
          }
          if (isNumber(dialogTop) && isNumber(dialogHeight) && dialogTop >= 0 && dialogTop > chartHeight - dialogHeight) {
            if (this.topPos) {
              this.topPos = ((chartHeight - dialogHeight) > 0 ? (chartHeight - dialogHeight) : 0)  + "px";
              if (this.isOpen) this.element.style("top", this.topPos);
            }
          }

          if (this.topPos && (profile === "LARGE" && this.root.element.classed("vzb-dialog-expand-true"))) {
            this.element.style("bottom", "auto");
          }

          if (this.root.element.classed("vzb-landscape")) ;
          //this.element.style('top', this.topPos);
          this.DOM.dialog.style("max-height", "");
        } else {
          this.rightPos = "";
          this.topPos = "";
          this.element.attr("style", "");
          // var totalHeight = this.root.element.offsetHeight;
          // if(this.root.element.classed('vzb-portrait')) totalHeight = totalHeight - 50;
          // this.DOM.dialog.style('max-height', (totalHeight - 10) + 'px');
        }

        this.DOM.dragHandler.classed("vzb-hidden", profile === "SMALL");
        this.DOM.pinIcon.classed("vzb-hidden", profile === "SMALL");

        this._setMaxHeight();
      }
    }

    _setMaxHeight() {
      let totalHeight = this.root.element.node().offsetHeight;
      const profile = this.services.layout.profile;
      if (profile !== "SMALL") {
        if (!this.topPos && (profile === "LARGE" && this.root.element.classed("vzb-dialog-expand-true"))) {
          const dialogBottom = parseInt(this.element.style("bottom"), 10);
          totalHeight -= dialogBottom;
        } else {
          const topPos = this.topPos ? parseInt(this.topPos, 10) : this.element.node().offsetTop;
          totalHeight -= topPos;
        }
      } else {
        totalHeight = this.root.element.classed("vzb-portrait") ? totalHeight - 50 : totalHeight - 10;
      }

      this.DOM.dialog.style("max-height", totalHeight + "px");

      //set 'max-height' to content for IE11
      const contentHeight = totalHeight - this.DOM.title.node().offsetHeight - ((this.DOM.buttons.node() || {}).offsetHeight || 0);
      this.DOM.content.style("max-height", contentHeight + "px");
    }

    beforeOpen() {
      const _this = this;

      this.transitionEvents.forEach(event => {
        _this.element.on(event, _this._transitionEnd.bind(_this, event));
      });

      this.element.classed("notransition", true);

      this.element.style("top", ""); // issues: 369 & 442
      this.element.style("bottom", ""); // issues: 369 & 442

      if (this.topPos && this.services.layout.profile === "LARGE" && this.root.element.classed("vzb-dialog-expand-true")) {
        const topPos = this.element.node().offsetTop;
        this.element.style("top", topPos + "px"); // issues: 369 & 442
        this.element.style("bottom", "auto"); // issues: 369 & 442
      } else if (this.services.layout.profile !== "SMALL") ;

      this.element.node().offsetTop;
      this.element.classed("notransition", false);

      if (this.services.layout.profile === "SMALL") {
        this.element.style("top", ""); // issues: 369 & 442
      } else if (this.root.element.classed("vzb-landscape")) ;

    }

    /**
     * User has clicked to open this dialog
     */
    open() {
      this.isOpen = true;
      if (this.services.layout.profile !== "SMALL") {
        if (this.topPos) {
          this.element.style("top", this.topPos);
          this.element.style("right", this.rightPos);
        }
      }
    }

    beforeClose() {
      //issues: 369 & 442
      if (this.root.element.classed("vzb-portrait") && this.services.layout.profile === "SMALL") {
        this.element.style("top", "auto"); // issues: 369 & 442
      }
      if (this.services.layout.profile === "LARGE" && this.root.element.classed("vzb-dialog-expand-true")) {
        this.topPos0 = this.topPos ? (this.element.node().parentNode.offsetHeight - this.element.node().offsetHeight) + "px" : "";
      }
      this.element.classed("notransition", false);
      this.element.node().offsetHeight; // trigger a reflow (flushing the css changes)
    }

    /**
     * User has closed this dialog
     */
    close() {
      //issues: 369 & 442
      if (!(this.root.element.classed("vzb-portrait") && this.services.layout.profile === "SMALL")) {
        this.element.style("top", ""); // issues: 369 & 442
        this.element.style("right", ""); // issues: 369 & 442
      }

      if (this.services.layout.profile === "LARGE" && this.root.element.classed("vzb-dialog-expand-true")) {
        this.element.style("top", this.topPos0);
        this.element.style("right", "");
      }
      this.isOpen = false;
      //this.trigger("close");
    }

    _transitionEnd() {
      const _this = this;

      this.transitionEvents.forEach(event => {
        _this.element.on(event, null);
      });
      if (this.isOpen) {
        this.element.classed("notransition", true);
      }
    }

    setOpen(state) {
      this.ui.opened = state;
    }

    getOpen() {
      return this.ui.opened;
    }

    setPin(state) {
      this.ui.pinned = state;
    }

    getPin() {
      return this.ui.pinned;
    }

    _pinButtonUpdate() {
      this.element.classed("pinned", this.getPin());
    }  
  }

  Dialog.DEFAULT_UI = {
    opened: false,
    pinned: false
  };

  const decorated$7 = mobx.decorate(Dialog, {
    "MDL": mobx.computed
  });

  function dialogDrag(element, container, xOffset) {
    let posX, posY, divTop, divRight, marginRight, marginLeft, xOffsetRight, xOffsetLeft, eWi, eHe, cWi, cHe, diffX, diffY;

    return {
      move(x, y) {
        element.style("right", x + "px");
        element.style("top", y + "px");
      },

      dragStart(evt) {
        if (!isTouchDevice()) {
          posX = evt.sourceEvent.clientX;
          posY = evt.sourceEvent.clientY;
        } else {
          const touchCoord = d3.pointer(container.node());
          posX = touchCoord[0][0];
          posY = touchCoord[0][1];
        }
        divTop = parseInt(element.style("top")) || 0;
        divRight = parseInt(element.style("right")) || 0;
        marginLeft = parseInt(element.style("margin-left")) || 0;
        marginRight = parseInt(element.style("margin-right")) || 0;
        xOffsetLeft = Math.min(xOffset, marginLeft);
        xOffsetRight = Math.min(xOffset, marginRight);
        eWi = (parseInt(element.style("width"), 10) + marginLeft - xOffsetLeft) || 0;
        eHe = parseInt(element.style("height"), 10) || 0;
        cWi = (container.node().offsetWidth - marginRight) || 0;
        cHe = container.node().offsetHeight || 0;
        diffX = posX + divRight;
        diffY = posY - divTop;
      },

      drag(evt) {
        if (!isTouchDevice()) {
          posX = evt.sourceEvent.clientX;
          posY = evt.sourceEvent.clientY;
        } else {
          const touchCoord = d3.pointer(container.node());
          posX = touchCoord[0][0];
          posY = touchCoord[0][1];
        }
        let aX = -posX + diffX,
          aY = posY - diffY;
        if (aX < -xOffsetRight) aX = -xOffsetRight;
        if (aY < 0) aY = 0;
        if (aX + eWi > cWi) aX = cWi - eWi;
        if (aY + eHe > cHe) aY = cHe - eHe;

        this.move(aX, aY);
      }
    };
  }

  /*!
   * VIZABI DIALOGS
   * Reusable dialogs component
   */

  //default existing dialogs
  const class_active$1 = "vzb-active";

  class Dialogs extends BaseComponent {
    constructor(config) {
      const { sidebar = [], popup = []} = deepExtend(deepExtend({}, config.ui.dialogs), config.default_ui.dialogs);
      const subcomponents = [];
      const templateArray  = [];

      const dialogList = unique([...sidebar, ...popup]);

      dialogList.forEach(dlg => {      
        subcomponents.push({
          type: decorated$7.get(dlg),
          placeholder: '.vzb-dialogs-dialog[data-dlg="' + dlg + '"]',
          model: config.model,
          name: dlg,
        });

        templateArray.push(
          `<div data-dlg="${dlg}" class="vzb-top-dialog vzb-dialogs-dialog vzb-dialog-shadow"></div>`
        );
      });

      config.subcomponents = subcomponents;
      config.template = templateArray.join("\n");
      super(config);
    } 

    setup() {
      this.DOM = {

      };

      const _this = this;
      this._curr_dialog_index = 20;
      
      this.element.selectAll(".vzb-top-dialog").data(this.children.map(c => ({ 
        name: c.name
      })))
        .on("custom-dragstart", function(event, d) {
          _this.bringForward(d.name);
        })
        .select(".vzb-top-dialog>.vzb-dialog-modal>.vzb-dialog-buttons>[data-click='closeDialog']")
        .on("click", (event, d) => {
          this.toggleDialogOpen(d.name, false);
        });
    }

    resize() {
      const _this = this;
      const profile = this.services.layout.profile;

      this.children.forEach(childComp => {
        const dialogEl = childComp.element;
        let cls = dialogEl.attr("class").replace(" vzb-popup", "").replace(" vzb-sidebar", "");

        if (profile === "LARGE" && _this.ui.dialogs.sidebar.indexOf(childComp.name) > -1) {
          cls += _this.root.ui.buttons.sidebarCollapse ? " vzb-popup" : " vzb-sidebar";
          if (!_this.root.ui.buttons.sidebarCollapse) dialogEl.style("z-index", null);
        } else if (_this.ui.dialogs.popup.indexOf(childComp.name) > -1) {
          cls += " vzb-popup";
        }

        dialogEl.attr("class", cls);
      });

    }

    toggleDialogOpen(name, forceState) {
      mobx.runInAction(() => {
        const dialog = this.findChild({ name });
        if (!dialog) return;
        const newState = forceState ? forceState : !dialog.getOpen();
        dialog.setOpen(newState);

        if(newState) {
          this.openDialog(name);
        } else {
          this.closeDialog(name);
        }
      });
    }

    //TODO: make opening/closing a dialog via update and model
    /*
     * Activate a dialog
     * @param {String} id dialog id
     */
    openDialog(name) {
      //close pinned dialogs for small profile
      const forceClose = this.services.layout.profile === "SMALL";
      
      //TODO
      this.closeAllDialogs(forceClose);

      const dialog = this.element.selectAll(".vzb-popup.vzb-dialogs-dialog[data-dlg='" + name + "']");

      this._active_comp = this.findChild({ name });

      this._active_comp.beforeOpen();
      //add classes
      dialog.classed(class_active$1, true);

      this.bringForward(name);

      //call component function
      this._active_comp.open();
    }

    /*
     * Closes a dialog
     * @param {String} id dialog id
     */
    closeDialog(name) {
      const dialog = this.element.selectAll(".vzb-popup.vzb-dialogs-dialog[data-dlg='" + name + "']");

      this._active_comp = this.findChild({ name });

      if (this._active_comp && !this._active_comp.isOpen) return;

      if (this._active_comp.getPin())
        this._active_comp.setPin(false);

      if (this._active_comp) {
        this._active_comp.beforeClose();
      }
      //remove classes
      dialog.classed(class_active$1, false);

      //call component close function
      if (this._active_comp) {
        this._active_comp.close();
      }
      this._active_comp = false;

    }

    /*
    * Close all dialogs
    */
    closeAllDialogs(forceclose) {
      const _this = this;
      //remove classes
      const dialogClass = forceclose ? ".vzb-popup.vzb-dialogs-dialog.vzb-active" : ".vzb-popup.vzb-dialogs-dialog.vzb-active:not(.pinned)";
      const all_dialogs = this.element.selectAll(dialogClass);
      all_dialogs.each(d => {
        _this.toggleDialogOpen(d.name);
      });
    }

    bringForward(name) {
      const dialog = this.element.select(".vzb-popup.vzb-dialogs-dialog[data-dlg='" + name + "']");
      dialog.style("z-index", this._curr_dialog_index);
      this._curr_dialog_index += 10;
    }
  }

  class _Repeater extends BaseComponent {

    get MDL(){
      return {
        repeat: this.model.encoding.repeat
      };
    }


    loading(){
      this.addReaction(this.addRemoveSubcomponents, true);
    }


    addRemoveSubcomponents(){
      const {componentCssName} = this.options;
      const {rowcolumn, ncolumns, nrows} = this.MDL.repeat;
      const repeat = this.MDL.repeat;

      //The fr unit sets size of track as a fraction of the free space of grid container
      //We need as many 1fr as rows and columns to have cells equally sized (grid-template-columns: 1fr 1fr 1fr;)
      this.element
        .style("grid-template-rows", "1fr ".repeat(nrows))
        .style("grid-template-columns", "1fr ".repeat(ncolumns));

      let sections = this.element.selectAll("div." + componentCssName)
        .data(rowcolumn, d => repeat.getName(d));

      sections.exit()
        .each(d => this.removeSubcomponent(d))
        .remove();      

      sections.enter().append("div")
        .attr("class", d => `${componentCssName} vzb-${repeat.getName(d)}`)
        .each(d => this.addSubcomponent(d))
        .merge(sections)      
        .style("grid-row-start", (_, i) => repeat.getRowIndex(i) + 1)
        .style("grid-column-start", (_, i) => repeat.getColumnIndex(i) + 1);

      this.services.layout._resizeHandler();
    }


    addSubcomponent(d){
      const {ComponentClass} = this.options;
      const name = this.MDL.repeat.getName(d);

      const subcomponent = new ComponentClass({
        placeholder: ".vzb-" + name,
        model: this.model,
        name,
        parent: this,
        root: this.root,
        state: {alias: d},
        services: this.services,
        ui: this.ui,
        default_ui: this.DEFAULT_UI
      });
      this.children.push(subcomponent);
    }


    removeSubcomponent(d){
      const subcomponent = this.findChild({name: this.MDL.repeat.getName(d)});
      if(subcomponent) {
        subcomponent.deconstruct();
      }
    }
  }

  _Repeater.DEFAULT_UI = {
  };

  const Repeater = mobx.decorate(_Repeater, {
    "MDL": mobx.computed
  });

  const OPTIONS$4 = {
    checkbox: null,
    setCheckboxFunc: null,
    submodel: null,
    submodelFunc: null,
    prefix: "",
  };

  class SimpleCheckbox extends BaseComponent {
    constructor(config) {
      config.template = `
      <span class="vzb-sc-holder vzb-dialog-checkbox"><input type="checkbox"><label></label></span>    
    `;
      super(config);
    }

    setup(_options) {
      this.DOM = {
        check: this.element.select("input"),
        label: this.element.select("label")
      };
      
      this.options = deepExtend(deepExtend({}, OPTIONS$4), _options || {});

      const _this = this;

      const id = "-check-" + this.id;
      this.DOM.label.attr("for", id);
      this.DOM.check.attr("id", id)
        .on("change", function() {
          _this._setModel(d3.select(this).property("checked"));
        });

    }

    draw() {
      this.MDL = {
        model: this._getModel()
      };

      this.localise = this.services.locale.auto();
      this.addReaction(this._updateView);
    }

    _getModel() {
      const {
        submodel,
        submodelFunc
      } = this.options;
      
      if (!submodel && !submodelFunc) return this.model;
      return submodelFunc ? submodelFunc() : getProp(this, submodel.split("."));
    }

    _updateView() {
      const model = this.MDL.model;
      const {
        checkbox,
        prefix
      } = this.options;
      const modelExists = model && (model[checkbox] || model[checkbox] === false);

      this.DOM.label.classed("vzb-hidden", !modelExists);
      if (modelExists) {
        this.DOM.label.text(this.localise("check/" + (prefix ? prefix + "/" : "") + checkbox));
        this.DOM.check.property("checked", !!model[checkbox]);
      }
    }

    _setModel(value) {
      if (this.options.setCheckboxFunc) {
        this.MDL.model[this.options.setCheckboxFunc](value);
      } else {
        this.MDL.model[this.options.checkbox] = value;
      }
    }

  }

  function spacesAreEqual$2(a, b){
    return a.concat().sort().join() === b.concat().sort().join();
  }

  function getMatchingSpace(spaces, targetSpace){
    return spaces.find(s => spacesAreEqual$2(s, targetSpace));
  }

  function getSubspaces(spaces, targetSpace){
    return spaces.filter(s => s.every(dim => targetSpace.includes(dim)))
      //sort longest first
      .sort((a,b) => b.length - a.length);
  }

  function getSuperspaces(spaces, targetSpace){
    return spaces.filter(s => targetSpace.every(dim => s.includes(dim)))
      //sort shortest first
      .sort((a,b) => a.length - b.length);
  }

  function getPartiallyOverlappingSpaces(spaces, targetSpace){
    return spaces.filter(s => targetSpace.some(dim => s.includes(dim)))
      //sort shortest first
      .sort((a,b) => a.length - b.length);
  }

  function removeDulicates(array){
    const result = [];
    array.forEach(space => {
      if(!result.some(s => spacesAreEqual$2(s, space)))
        result.push(space);
    });
    return result;
  }

  let hidden$1 = true;
  class _SpaceConfig extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-spaceconfig-background"></div>
      <div class="vzb-spaceconfig-box">
        <div class="vzb-spaceconfig-title"></div>
        <div class="vzb-spaceconfig-body vzb-dialog-scrollable">
          <div class="vzb-spaceconfig-marker">
            <label for="vzb-spaceconfig-select"></label>
            <select id="vzb-spaceconfig-select"></select>
          </div>
          <div class="vzb-spaceconfig-encodings"></div>
        </div>
        <div class="vzb-spaceconfig-buttons">
        <div class="vzb-spaceconfig-button-apply"></div>
        <div class="vzb-spaceconfig-button-cancel"></div>
        </div>
      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        background: this.element.select(".vzb-spaceconfig-background"),
        container: this.element.select(".vzb-spaceconfig-box"),
        close: this.element.select(".vzb-spaceconfig-close"),
        title: this.element.select(".vzb-spaceconfig-title"),
        body: this.element.select(".vzb-spaceconfig-body"),
        marker: this.element.select(".vzb-spaceconfig-marker"),
        encodings: this.element.select(".vzb-spaceconfig-encodings"),
        buttoncancel: this.element.select(".vzb-spaceconfig-button-cancel"),
        buttonapply: this.element.select(".vzb-spaceconfig-button-apply"),
        button: d3.select(this.options.button)
      };
      
      this.element.classed("vzb-hidden", true);

      this.setupDialog();
      this.setupTiggerButton();
    }

    setupDialog() {
      this.DOM.background
        .on("click", () => {
          this.toggle(true);
        });

      this.DOM.container.append("div")
        .html(ICON_CLOSE)
        .on("click", () => {
          this.toggle();
        })
        .select("svg")
        .attr("width", "0px")
        .attr("height", "0px")
        .attr("class", "vzb-spaceconfig-close");

    }

    setupTiggerButton() {
      if(!this.DOM.button.size()) return warn("quit setupTiggerButton of SpaceConfig because no button provided");
      
      setIcon(this.DOM.button, ICON_ELLIPSIS_V)
        .attr("title", "Configure marker space")
        .on("click", () => {
          this.toggle();
        });
    }

    get MDL(){
      return {
        frame: this.model.encoding.frame
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      this.addReaction(this.updateUIstrings);
      this.addReaction(this.drawContent);

    }

    drawContent(){
      if (this.element.classed("vzb-hidden")) return;

      this.addReaction(this.updateMarker);
      this.addReaction(this.updateEncodigns);
      this.addReaction(this.updateApplyCancelButtons);
    }

    updateUIstrings(){
      this.DOM.title.html(this.localise("Space config"));
      this.DOM.marker.select("label").text(this.localise("Marker space"));
      this.DOM.buttoncancel.text("Cancel");
      this.DOM.buttonapply.text("Apply");
      //this.DOM.body.html(this.localise("datawarning/body/" + this.root.name));
    }

    toggle(arg) {
      if (arg == null) arg = !hidden$1;
      hidden$1 = arg;
      this.element.classed("vzb-hidden", hidden$1);

      this.root.children.forEach(c => {
        c.element.classed("vzb-blur", c != this && !hidden$1);
      });

      this.drawContent();
    }

    _getDataModels(dsConfig) {
      return Object.keys(dsConfig).map(dsName => this.services.Vizabi.Vizabi.stores.dataSources.get(dsName));
    }

    _getAvailability(){
      const items = [];
      this._getDataModels(this.root.model.config.dataSources).forEach(ds => {
        ds.availability.data.forEach(kv => {
          items.push({ key: kv.key, value: ds.getConcept(kv.value), source: ds });
        });
      });
      return items;
    }

    _getSpaceAvailability(){
      const items = [];
      this._getDataModels(this.root.model.config.dataSources).forEach(ds => {
        ds.availability.keyLookup.forEach(val => {
          items.push(val);
        });
      });
      return items;
    }

    _nestAvailabilityByConcepts(availability){
      return availability.reduce((map, kv) => {
        const key = kv.value;
        const space = kv.key;
        if (!map.has(key)) map.set(key, {source: kv.source, spaces: new Set()});
        map.get(key).spaces.add(space);
        return map;
      }, new Map());
    }

    //returns concepts and their spaces (availbility keys), 
    //such that only strict superspaces, strict subspaces and matching spaces remain
    _conceptsCompatibleWithMarkerSpace(availabilityMapByConcepts, markerSpace){
      const filteredValueLookup = new Map();
      const markerSpaceSet = new Set(markerSpace);
      const intersect = (a,b) => a.filter(e => b.has(e));
      for (const [concept, {source, spaces}] of availabilityMapByConcepts) {  
        const filteredSpaces = [...spaces].filter(space => {
          const intersection = intersect(space, markerSpaceSet);
          return intersection.length == markerSpaceSet.size || intersection.length == space.length;
        });
        if (filteredSpaces.length) filteredValueLookup.set(concept, {source, spaces: filteredSpaces});
      }
      return filteredValueLookup;
    }

    _convertConceptMapToArray(conceptmap){
      return [...conceptmap].map(([concept, {source, spaces}]) => ({concept, source, spaces: [...spaces]}));
    }


    updateMarker(){
      const _this = this;

      const frameConcept = this.MDL.frame.data.concept;
      const spaceAvailability = removeDulicates(this._getSpaceAvailability().filter(f => f.includes(frameConcept)));
      const selector = this.DOM.marker.select("select");
      const options = selector.selectAll("option").data(spaceAvailability, d => d.sort().join());
      options.exit().remove();
      options.enter().append("option")
        .text(d => d.join())
        .merge(options)
        .property("selected", d => spacesAreEqual$2(d, this.model.data.space));

      selector
        .on("change", function() {
          const space = d3.select(this.options[this.selectedIndex]).datum();
          _this.proposedSpace = space;
          _this.updateEncodigns();
          _this.updateApplyCancelButtons();
          //_this.model.config.data.space = space;
        });

    }

    getEncodings(){
      const encs = this.model.encoding;
      return Object.keys(encs).filter(enc => {
        if (!this.model.requiredEncodings || this.model.requiredEncodings.includes(enc)) return true;
        if (enc == "color") return true;
        if (enc == "label") return true;
      });
    }

    updateEncodigns(){
      const _this = this;
      const encs = this.model.encoding;

      const nest = this._nestAvailabilityByConcepts(this._getAvailability());
      //const filtervl = this._conceptsCompatibleWithMarkerSpace(nest, this.model.data.space);
      this.concepts = this._convertConceptMapToArray(nest);
      console.log(this.concepts);
      this.encNewConfig = {};

      this.DOM.encodings
        .html("")
        .selectAll("div")
        .data(this.getEncodings(), d=>d)
        .enter().append("div")
        .each(function(enc){
          const view = d3.select(this);

          const encoding = encs[enc];
          const status = _this.getSpaceCompatibilityStatus(encoding);
          const concept = _this.concepts.find(f => f.concept.concept == encoding.data.concept);
          const isSpaceSet = encoding.data.config.space;
          const newConfig = _this.encNewConfig[enc] = {};

          view.append("div")
            .attr("class", "vzb-spaceconfig-enc-status")
            .attr("title", status.status)
            .text(_this.statusIcons(status));

          view.append("div")
            .attr("class", "vzb-spaceconfig-enc-name")
            .text(enc);

          if(status.status == "constant"){
            view.append("div")
              .attr("class", "vzb-spaceconfig-enc-concept")
              .text("constant: " + encoding.data.constant);
          }else {

            view.append("div")
              .attr("class", "vzb-spaceconfig-enc-concept")
              .text(concept.concept.name);

            view.append("div")
              .attr("for", "vzb-spaceconfig-enc-space-current")
              .text("current space: " + encoding.data.space.join() + (isSpaceSet? " (set)" : " (inherited)") );

            if(status.status == "alreadyInSpace" || status.status == "entityPropertyDataConfig") {
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("new space: will reset to marker space if set");

              if(isSpaceSet) newConfig["space"] = null;
              if(encoding.data.config.filter) newConfig["filter"] = {};
            }

            if(status.status == "matchingSpaceAvailable") {
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("new space: " + status.spaces[0].join() + (isSpaceSet? " (set)" : " (inherited)"));

              if(isSpaceSet) newConfig["space"] = null;
              if(encoding.data.config.filter) newConfig["filter"] = {};
            }     
            
            if(status.status == "subspaceAvailable") {
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("new space: " + status.spaces[0].join() + " (set)");

              newConfig["space"] = status.spaces[0];
              if(encoding.data.config.filter) newConfig["filter"] = {};
            }  

            if(status.status == "superspaceAvailable") {
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("new space: " + status.spaces[0].join() + " (set)");
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("suggest constants for compliment dimensions!");

              newConfig["space"] = status.spaces[0];
              if(encoding.data.config.filter) newConfig["filter"] = {};
            }  


            if(status.status == "patialOverlap" || status.status == "noOverlap") {
              view.append("div")
                .attr("for", "vzb-spaceconfig-enc-space-new")
                .text("new space: not avaiable");

              view.append("label")
                .attr("for", "vzb-spaceconfig-enc-space-select")
                .text("select concept:");

              const filtervl = _this._conceptsCompatibleWithMarkerSpace(nest, _this.proposedSpace);
              const concepts = _this._convertConceptMapToArray(filtervl);
    
              const select = view.append("select")
                .attr("class", "vzb-spaceconfig-enc-concept-new")
                .attr("id", "vzb-spaceconfig-enc-space-select")
                .on("change", function(){
                  newConfig["concept"] = d3.select(this).property("value");
                  newConfig["space"] = null;
                  newConfig["filter"] = {};
                })
                .selectAll("option")
                .data(concepts)
                .enter().append("option")
                .attr("value", option => option.concept.concept)
                .text(option => option.concept.name);

              select.property("selectedIndex", -1);
              
    
            }  

          }
        });
    }

    statusIcons(compatibility){
      return {
        true: "⚫",
        constant: "✳️",
        alreadyInSpace: "♻️", //reset filter on enc
        entityPropertyDataConfig: "🏷", //reset filter on enc
        matchingSpaceAvailable: "➡️",
        subspaceAvailable: "↘️",
        superspaceAvailable: "↗️", //request connstants 
        patialOverlap: "🚧", //request another concept
        noOverlap: "🚧", //request another concept
        false: "❌"
      }[""+compatibility.status];
    }

    getSpaceCompatibilityStatus(encoding){
      const spaces = this.concepts.find(f => f.concept.concept == encoding.data.concept)?.spaces;
      const proposedSpace = this.proposedSpace;

      if (!proposedSpace) return {status: true, spaces: []};
      if (encoding.data.isConstant) return {status: "constant"};

      if (encoding.data.config.modelType == "entityPropertyDataConfig")
        return {status: "entityPropertyDataConfig", spaces: [proposedSpace]};

      if (spacesAreEqual$2(encoding.data.space, proposedSpace)) 
        return {status: "alreadyInSpace", spaces: [proposedSpace]};

      if (getMatchingSpace(spaces, proposedSpace)) 
        return {status: "matchingSpaceAvailable", spaces: [proposedSpace]};

      const subspaces = getSubspaces(spaces, proposedSpace);
      if (subspaces.length > 0) 
        return {status: "subspaceAvailable", spaces: subspaces};

      const superspaces = getSuperspaces(spaces, proposedSpace);
      if (superspaces.length > 0) 
        return {status: "superspaceAvailable", spaces: superspaces};

      const partialOverlap = getPartiallyOverlappingSpaces(spaces, proposedSpace);
      if (partialOverlap.length > 0) 
        return {status: "patialOverlap", spaces: []};
      if (partialOverlap.length == 0) 
        return {status: "noOverlap", spaces: []};

      return {status: false, spaces: []};
    }



    updateApplyCancelButtons(){
      const hide = !this.proposedSpace || spacesAreEqual$2(this.proposedSpace, this.model.data.space);
      this.DOM.buttoncancel.classed("vzb-hidden", hide)
        .on("click", () => {this.cancelChanges();});
      this.DOM.buttonapply.classed("vzb-hidden", hide)
        .on("click", () => {this.applyChanges();});
    }
    cancelChanges(){
      this.proposedSpace = null;
      this.toggle();
    }

    applyChanges(){
      if (!this.proposedSpace) return;
      mobx.runInAction(()=>{
        this.model.config.data.space = this.proposedSpace;
        Object.keys(this.encNewConfig).forEach(enc => {
          const newConfig = this.encNewConfig[enc];

          if (newConfig.concept)
            this.model.encoding[enc].config.data.concept = newConfig.concept;

          if (newConfig.space)
            this.model.encoding[enc].config.data.space = newConfig.space;
          else if (newConfig.hasOwnProperty("space"))
            delete this.model.encoding[enc].config.data.space;

          if (newConfig.filter)
            this.model.encoding[enc].config.data.filter = newConfig.filter;
          else if (newConfig.hasOwnProperty("filter"))
            delete this.model.encoding[enc].config.data.filter;
            
        });
      });
      this.toggle();
    }

  }

  _SpaceConfig.DEFAULT_UI = {
  };

  //export default BubbleChart;
  const SpaceConfig = mobx.decorate(_SpaceConfig, {
    "MDL": mobx.computed
  });

  let hidden = true;
  class _ErrorMessage extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-errormessage-background"></div>
      <div class="vzb-errormessage-box">
        <div class="vzb-errormessage-hero">🙄</div>
        <div class="vzb-errormessage-title"></div>
        <div class="vzb-errormessage-body vzb-dialog-scrollable">
          <div class="vzb-errormessage-message"></div>
          <div class="vzb-errormessage-expand"></div>
          <pre class="vzb-errormessage-details vzb-hidden"></pre>
        </div>
      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        background: this.element.select(".vzb-errormessage-background"),
        container: this.element.select(".vzb-errormessage-box"),
        close: this.element.select(".vzb-errormessage-close"),
        hero: this.element.select(".vzb-errormessage-hero"),
        title: this.element.select(".vzb-errormessage-title"),
        message: this.element.select(".vzb-errormessage-message"),
        expand: this.element.select(".vzb-errormessage-expand"),
        details: this.element.select(".vzb-errormessage-details")
      };
      
      this.element.classed("vzb-hidden", true);
      this.DOM.background.on("click", () => {
        this.toggle(true);
      });
      this.DOM.expand.on("click", () => {
        this.DOM.details.classed("vzb-hidden", !this.DOM.details.classed("vzb-hidden"));
      });
    }

    get MDL(){
      return {
        frame: this.model.encoding.frame
      };
    }

    //this is a hack because MobX autorun onError would eat the error rethrowing from there doesn't help
    rethrow(err){
      setTimeout(function(){
        throw(err);
      }, 1);
      setTimeout(function(){
        throw("ERROR REACHED USER");
      }, 1);
    }

    toggle(arg) {
      if (arg == null) arg = !hidden;
      hidden = arg;
      this.element.classed("vzb-hidden", hidden);

      this.root.children.forEach(c => {
        c.element.classed("vzb-blur", c != this && !hidden);
      });
    }

    error(err){
      if(!hidden) return console.warn("errorMessage: skipping action because already in error");

      const localise = this.services.locale.status == "fulfilled"?
        this.services.locale.auto()
        : nop => nop;

      this.DOM.title.text(localise(err.name));
      this.DOM.message.text(localise(err.message));

      this.DOM.expand
        .style("display", err.details ? "block" : "none")
        .html(localise("crash/expand"));

      this.DOM.details
        .style("display", err.details ? "block" : "none")
        .text(JSON.stringify(err.details, null, 2));

      this.toggle(false);

      this.rethrow(err);
    }
  }


  _ErrorMessage.DEFAULT_UI = {
  };

  //export default BubbleChart;
  const ErrorMessage = mobx.decorate(_ErrorMessage, {
    "MDL": mobx.computed
  });

  /*!
   * VIZABI MIN MAX INPUT FIELDS
   */

  const DOMAIN = "domain";
  const ZOOMED = "zoomed";
  const MIN = 0;
  const MAX = 1;

  class MinMaxInputs extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-mmi-holder">

        <span class="vzb-mmi-domainmin-label"></span>
        <input type="text" class="vzb-mmi-domainmin" name="min">
        <span class="vzb-mmi-domainmax-label"></span>
        <input type="text" class="vzb-mmi-domainmax" name="max">

        <br class="vzb-mmi-break"/>

        <span class="vzb-mmi-zoomedmin-label"></span>
        <input type="text" class="vzb-mmi-zoomedmin" name="min">
        <span class="vzb-mmi-zoomedmax-label"></span>
        <input type="text" class="vzb-mmi-zoomedmax" name="max">

      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        domain_labelMin: this.element.select(".vzb-mmi-domainmin-label"),
        domain_labelMax: this.element.select(".vzb-mmi-domainmax-label"),
        domain_fieldMin: this.element.select(".vzb-mmi-domainmin"),
        domain_fieldMax: this.element.select(".vzb-mmi-domainmax"),
        break: this.element.select(".vzb-mmi-break"),
        zoomed_labelMin: this.element.select(".vzb-mmi-zoomedmin-label"),
        zoomed_labelMax: this.element.select(".vzb-mmi-zoomedmax-label"),
        zoomed_fieldMin: this.element.select(".vzb-mmi-zoomedmin"),
        zoomed_fieldMax: this.element.select(".vzb-mmi-zoomedmax")
      };

      const _this = this;

      this.DOM.domain_fieldMin.on("change", function() {
        _this._setModel(DOMAIN, MIN, this.value);
      });
      this.DOM.domain_fieldMax.on("change", function() {
        _this._setModel(DOMAIN, MAX, this.value);
      });

      this.DOM.zoomed_fieldMin.on("change", function() {
        _this._setModel(ZOOMED, MIN, this.value);
      });
      this.DOM.zoomed_fieldMax.on("change", function() {
        _this._setModel(ZOOMED, MAX, this.value);
      });

      this.element.selectAll("input")
        .on("keypress", (event) => {
          if (event.which == 13) document.activeElement.blur();
        });

    }

    get MDL() {
      return {
        model: this._getModel()
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      const _this = this;
      this.formatter = function(n) {
        if (!n && n !== 0) return n;
        if (isDate(n)) return _this.localise(n);
        return d3.format(".2r")(n);
      };

      this.addReaction(this._updateView);

    }

    _updateView() {
      this.DOM.domain_labelMin.text(this.localise("hints/min") + ":");
      this.DOM.domain_labelMax.text(this.localise("hints/max") + ":");
      this.DOM.zoomed_labelMin.text(this.localise("hints/min") + ":");
      this.DOM.zoomed_labelMax.text(this.localise("hints/max") + ":");

      this.DOM.domain_labelMin.classed("vzb-hidden", !this.ui.selectDomainMinMax);
      this.DOM.domain_labelMax.classed("vzb-hidden", !this.ui.selectDomainMinMax);
      this.DOM.domain_fieldMin.classed("vzb-hidden", !this.ui.selectDomainMinMax);
      this.DOM.domain_fieldMax.classed("vzb-hidden", !this.ui.selectDomainMinMax);

      this.DOM.break.classed("vzb-hidden", !(this.ui.selectDomainMinMax && this.ui.selectZoomedMinMax));

      this.DOM.zoomed_labelMin.classed("vzb-hidden", !this.ui.selectZoomedMinMax);
      this.DOM.zoomed_labelMax.classed("vzb-hidden", !this.ui.selectZoomedMinMax);
      this.DOM.zoomed_fieldMin.classed("vzb-hidden", !this.ui.selectZoomedMinMax);
      this.DOM.zoomed_fieldMax.classed("vzb-hidden", !this.ui.selectZoomedMinMax);

      const {
        domain,
        zoomed
      } = this.MDL.model;
      this.DOM.domain_fieldMin.property("value", this.formatter(d3.min(domain)));
      this.DOM.domain_fieldMax.property("value", this.formatter(d3.max(domain)));
      this.DOM.zoomed_fieldMin.property("value", this.formatter(d3.min(zoomed)));
      this.DOM.zoomed_fieldMax.property("value", this.formatter(d3.max(zoomed)));
    }

    _getModel() {
      if (this.state.submodel) {
        const submodel = this.state.submodel.split(".");
        if (submodel[0] === "encoding") {
          return getProp(this.model.encoding[submodel[1]], submodel.slice(2));
        }
      }
      if (!this.state.submodel && !this.state.submodelFunc) return this.model;
      return this.state.submodelFunc ? this.state.submodelFunc() : getProp(this, this.state.submodel.split("."));
    }

    _setModel(what, index, value) {
      const newWhatArray = this.MDL.model[what].slice(0);
      newWhatArray[index] = value;
      this.MDL.model.config[what] = newWhatArray;
    }
  }

  MinMaxInputs.DEFAULT_UI = {
    selectDomainMinMax: false,
    selectZoomedMinMax: true
  };

  const decorated$6 = mobx.decorate(MinMaxInputs, {
    "MDL": mobx.computed
  });

  const MENU_HORIZONTAL = 1;
  const MENU_VERTICAL = 2;

  //css custom classes
  const css = {
    wrapper: "vzb-treemenu-wrap",
    wrapper_outer: "vzb-treemenu-wrap-outer",
    background: "vzb-treemenu-background",
    close: "vzb-treemenu-close",
    search: "vzb-treemenu-search",
    list: "vzb-treemenu-list",
    list_outer: "vzb-treemenu-list-outer",
    list_item: "vzb-treemenu-list-item",
    list_item_leaf: "vzb-treemenu-list-item-leaf",
    leaf: "vzb-treemenu-leaf",
    leaf_content: "vzb-treemenu-leaf-content",
    leaf_content_item: "vzb-treemenu-leaf-content-item",
    leaf_content_item_title: "vzb-treemenu-leaf-content-item-title",
    leaf_content_item_datasources: "vzb-treemenu-leaf-content-item-datasources",
    leaf_content_item_space: "vzb-treemenu-leaf-content-item-space",
    leaf_content_item_descr: "vzb-treemenu-leaf-content-item-descr",
    leaf_content_item_helptranslate: "vzb-treemenu-leaf-content-item-helptranslate",
    hasChild: "vzb-treemenu-list-item-children",
    list_item_label: "vzb-treemenu-list-item-label",
    list_top_level: "vzb-treemenu-list-top",
    search_wrap: "vzb-treemenu-search-wrap",
    isSpecial: "vzb-treemenu-list-item-special",
    hidden: "vzb-hidden",
    title: "vzb-treemenu-title",
    scaletypes: "vzb-treemenu-scaletypes",
    scaletypesDisabled: "vzb-treemenu-scaletypes-disabled",
    scaletypesActive: "vzb-treemenu-scaletypes-active",
    alignYt: "vzb-align-y-top",
    alignYb: "vzb-align-y-bottom",
    alignXl: "vzb-align-x-left",
    alignXr: "vzb-align-x-right",
    alignXc: "vzb-align-x-center",
    menuHorizontal: "vzb-treemenu-horizontal",
    menuVertical: "vzb-treemenu-vertical",
    absPosVert: "vzb-treemenu-abs-pos-vert",
    absPosHoriz: "vzb-treemenu-abs-pos-horiz",
    menuOpenLeftSide: "vzb-treemenu-open-left-side",
    noTransition: "notransition"
  };

  //options and globals
  const OPTIONS$3 = {
    MOUSE_LOCS: [], //contains last locations of mouse
    MOUSE_LOCS_TRACKED: 3, //max number of locations of mouse
    DELAY: 200, //amazons multilevel delay
    TOLERANCE: 150, //this parameter is used for controlling the angle of multilevel dropdown
    LAST_DELAY_LOC: null, //this is cached location of mouse, when was a delay
    TIMEOUT: null, //timeout id
    SEARCH_PROPERTY: "id", //property in input data we we'll search by
    SUBMENUS: "children", //property for submenus (used by search)
    SEARCH_MIN_STR: 1, //minimal length of query string to start searching
    RESIZE_TIMEOUT: null, //container resize timeout
    MOBILE_BREAKPOINT: 400, //mobile breakpoint
    CURRENT_PATH: [], //current active path
    MIN_COL_WIDTH: 60, //minimal column size
    MENU_DIRECTION: MENU_HORIZONTAL,
    MAX_MENU_WIDTH: 320,
    MENU_OPEN_LEFTSIDE: false
  };

  function spacesAreEqual$1(a, b){
    return a.concat().sort().join() === b.concat().sort().join();
  }
  class DeepLeaf{

    constructor(context, view){
      this.context = context;
      this.view = view;
      this.spaceChanged = false;
      this.encoding = this.context._targetModel;
      this.datum = view.datum();

      this.buildLeaf();
    }
    
    _getDatumForDS(){    
      return this.datum.byDataSources.find(f => f.dataSource == this.encoding.data.source) || this.datum.byDataSources[0];
    }
    _isSelectedConcept() {
      return this.datum.id == this.encoding.data.concept;
    }

    buildLeaf() {        
      this.view.selectAll("div").remove();

      const leafContent = this.view
        .append("div").attr("class", `${css.leaf} ${css.leaf_content} vzb-dialog-scrollable`)
        .style("width", this.width + "px");
      
      this.DOM = {
        title: leafContent.append("div")
          .attr("class", `${css.leaf_content_item} ${css.leaf_content_item_title}`),

        datasourceContainer: leafContent.append("div")
          .attr("class", `${css.leaf_content_item} ${css.leaf_content_item_datasources}`)
          .on("click", event => event.stopPropagation()),

        spaceContainer: leafContent.append("div")
          .classed(css.leaf_content_item + " " + css.leaf_content_item_space, true)
          .on("click", event => event.stopPropagation()),

        descr: leafContent.append("div")
          .attr("class", `${css.leaf_content_item} ${css.leaf_content_item_descr}`),

        helptranslate: leafContent.append("div")
          .attr("class", `${css.leaf_content_item} ${css.leaf_content_item_helptranslate}`)
      };
      
      this.updateNameSection();
      this.updateDatasoutceSection();
      this.updateSpaceSection();
      this.updateDescrSection();
    }

    updateNameSection(datumForDS = this._getDatumForDS()){
      this.DOM.title.text(replaceNumberSpacesToNonBreak(datumForDS.name) || "");
    }


    updateDescrSection(datumForDS = this._getDatumForDS()){   
      this.DOM.descr.text(replaceNumberSpacesToNonBreak(datumForDS.description || this.context.localise("hints/nodescr")));

      this.DOM.helptranslate
        .classed("vzb-invisible", !datumForDS.dataSource?.translateContributionLink)
        .html(`<a href="${datumForDS.dataSource?.translateContributionLink}" target="_blank">${this.context.localise("dialogs/helptranslate")}</a>`);
    }


    updateDatasoutceSection(){
      const _this = this;

      if(this.datum.id == "_default") return;

      const getDSColorLight = (v) => this.context.dsColorScaleLight(v.dataSource.id);
      const getDSColorDark = (v) => this.context.dsColorScaleDark(v.dataSource.id);
      const paintBackground = (v) => (v.dataSource == this.encoding.data.source) && this._isSelectedConcept() && multipleDataSourcesAvailable;        
      const multipleDataSourcesAvailable = () => this.datum.byDataSources > 1;

      if(this.context.ui.showDataSources){
        this.DOM.datasourceContainer.selectAll("span")
          .data(this.datum.byDataSources, v => v)
          .enter().append("span")
          //.text(v => v.dataSource.config.name)
          .text(v => v.dataSource.id)
          .on("mouseenter", function(event, v) {
            d3.select(this).style("background-color", getDSColorLight(v));
            _this.updateNameSection(v);
            _this.updateDescrSection(v);
          })
          .on("mouseout", function(event, v) {
            d3.select(this).style("background-color", paintBackground(v) ? getDSColorLight(v) : null);
            _this.updateNameSection();
            _this.updateDescrSection();
          })
          .on("click", function(event, v){
            if(_this.DOM.spaceContainer.select("select").node()) _this.resetPickers();
            _this.setDatasource(v);
          });
        
        this.DOM.datasourceContainer.selectAll("span")
          .style("pointer-events", this._isSelectedConcept() ? null : "none")
          .style("border-color", getDSColorDark)
          .style("background-color", v => paintBackground(v) ? getDSColorLight(v) : null);
      }
    }

    updateSpaceSection(datumForDS = this._getDatumForDS()){
      const _this = this;

      if(this.datum.id == "_default") return;

      const currentSpace = this.encoding.data.space;
      const markerSpace = this.encoding.marker.data.space;

      const multipleSpacesAvailable = () => datumForDS.spaces.length > 1;
      const shorterThanMarkerSpace = () => datumForDS.spaces[0].length < markerSpace.length;

      //only build the UI for selecting spaces if many conditions are met
      if(this._isSelectedConcept() && (multipleSpacesAvailable() || !spacesAreEqual$1(datumForDS.spaces[0], markerSpace) && !shorterThanMarkerSpace())) {

        const spaceSelect = this.DOM.spaceContainer
          .append("select")
          .attr("name", "vzb-select-treemenu-leaf-space")
          .attr("id", "vzb-select-treemenu-leaf-space")
          .on("change", function(){
            _this.spaceChanged = true;
            _this.updateComplimentSetters();
          });
    
        spaceSelect
          .selectAll("option")
          .data(datumForDS.spaces)
          .enter().append("option")
          .attr("value", option => option.join())
          .text(option => "by " + getSpaceName(this.encoding, option));
    
        spaceSelect
          .property("value", currentSpace.join());
        
        this.DOM.spaceContainer.append("div")
          .attr("class","vzb-treemenu-leaf-space-compliment");

        this.DOM.spaceContainer.append("div")
          .attr("class","vzb-hidden vzb-treemenu-leaf-space-reset")
          .text("Reset")
          .on("click", () => {
            this.resetPickers();
            this.setModel();
          });

        this.DOM.spaceContainer.append("div")
          .attr("class","vzb-hidden vzb-treemenu-leaf-space-apply")
          .text("Apply")
          .on("click", () => {
            this.setModel();
          });

        this.updateComplimentSetters();
      }
    }


    updateComplimentSetters() {
      const _this = this;
      const encoding = this.context._targetModel;
      const compliment = this.context.services.Vizabi.Vizabi.utils.relativeComplement(encoding.marker.data.space, this._getSelectedSpace());
      
      requestEntityNames(encoding.data.source, compliment).then(dims => {
        let dimSetters = this.DOM.spaceContainer.select("div.vzb-treemenu-leaf-space-compliment")
          .selectAll("div.vzb-treemenu-leaf-space-compliment-setter")
          .data(dims, d => d.dim);

        dimSetters.exit().remove();

        dimSetters = dimSetters
          .enter().append("div")
          .attr("class", "vzb-treemenu-leaf-space-compliment-setter")
          .each(function(d) {
            const view = d3.select(this);
            view
              .append("label")
              .attr("for", d.dim + "_extraDim")
              .text(getSpaceName(encoding, d.dim) + ":");
      
            const select = view
              .append("select")
              .attr("id", d.dim + "_extraDim")
              .on("change", () => {
                _this.spaceChanged = true;
                _this.updateResetApplyButtons();
              });

            select.selectAll("option")
              .data(d.data.raw)
              .enter().append("option")
              .attr("value", option => option[d.dim])
              .text(option => option.name);

            select.property("selectedIndex", -1);
          })
          .merge(dimSetters);


        dimSetters
          .each(function(d){
            const select = d3.select(this).select("select");
            const value = encoding.data.filter?.dimensions[d.dim]?.[d.dim];
            if (value)
              select.property("value", value);
            else
              select.property("selectedIndex", -1);
          });   
          
          
        this.updateResetApplyButtons();
      });
    }


    _getSelectedSpace() {
      const node = this.view.select("div." + css.leaf_content_item_space)
        .select("select").node();
      return d3.select(node.options[node.selectedIndex]).datum();
    }


    _getSelectedFilter() {
      const filter = {};
      let invalidFilter = false;
      this.view.select("div." + css.leaf_content_item_space)
        .select("div.vzb-treemenu-leaf-space-compliment")
        .selectAll("select")
        .each(function(d){ 
          filter[d.dim] = {};
          filter[d.dim][d.dim] = this.value;
          if(this.selectedIndex == -1) invalidFilter = true;
        });
      return invalidFilter ? null : filter;
    }


    updateResetApplyButtons(datumForDS = this._getDatumForDS()) {
      const currentSpace = this.context.targetModel().data.space;
      const defaultSpace = this.context.getNearestSpaceToMarkerSpace(datumForDS.spaces);

      const selectedSpace = this._getSelectedSpace();
      const selectedFilter = this._getSelectedFilter();

      const spaceContainer = this.view.select("div." + css.leaf_content_item_space);
      spaceContainer.select(".vzb-treemenu-leaf-space-reset")
        .classed("vzb-hidden", spacesAreEqual$1(currentSpace, defaultSpace));
      spaceContainer.select(".vzb-treemenu-leaf-space-apply")
        .classed("vzb-hidden", !this.spaceChanged)
        .classed("vzb-disabled", !selectedFilter && !spacesAreEqual$1(currentSpace, selectedSpace));
    }


    resetPickers(datumForDS = this._getDatumForDS()) {
      const defaultSpace = this.context.getNearestSpaceToMarkerSpace(datumForDS.spaces);
      
      this.view.select("div." + css.leaf_content_item_space)
        .select("select")
        .property("value", defaultSpace.join());

      this.updateComplimentSetters();
    }


    setDatasource(datumForDS = this._getDatumForDS()){
      const encoding = this.context._targetModel;
      mobx.runInAction(()=>{
        encoding.data.config.source = datumForDS.dataSource.id;
      });
    }
    
    setModel() {
      const encoding = this.context._targetModel;
      const selectedSpace = this._getSelectedSpace();
      const selectedFilter = this._getSelectedFilter() || {};

      mobx.runInAction(()=>{
        encoding.data.config.space = selectedSpace;
        encoding.data.filter.config.dimensions = selectedFilter;
      });
    }
  }

  class Menu {
    constructor(context, parent, menu, options) {
      const _this = this;
      this.context = context;
      this.parent = parent;
      this.OPTIONS = options;
      this.width = this.OPTIONS.MIN_COL_WIDTH;
      this.direction = this.OPTIONS.MENU_DIRECTION;

      this.OPTIONS.createSubmenu(menu, menu.datum(), parent === null);
      this.entity = parent === null ? menu.selectAll("." + css.list_top_level) : menu.select("." + css.list_outer);

      this._setDirectionClass();
      this.menuItems = [];
      let menuItemsHolder;

      if (this.entity.empty()) return this;

      this.entity.each(function() {
        menuItemsHolder = d3.selectAll(this.childNodes).filter(function() {
          return d3.select(this).classed(css.list);
        });
      });
      if (menuItemsHolder.empty()) menuItemsHolder = this.entity;
      this.entity.selectAll("." + css.list_item)
        .filter(function() {
          return this.parentNode == menuItemsHolder.node();
        })
        .each(function() {
          _this.addSubmenu(d3.select(this));
        });
      if (!this.menuItems.length && this.isActive()) {
        this.deepleaf = new DeepLeaf(this.context, this.entity);
      }
      this.setWidth(this.OPTIONS.COL_WIDTH, false, true);
      return this;
    }

    setWidth(width, recursive, immediate) {
      if (this.width != width && this.entity.node()) {
        this.width = width;
        if ((this.entity.classed(css.list_top_level) || this.entity.classed("active")) && this.direction == MENU_HORIZONTAL) {
          if (!immediate) {
            this.entity.transition()
              .delay(0)
              .duration(100)
              .style("width", this.width + "px");
          } else {
            this.entity.style("width", this.width + "px");
          }
        }
        if (this.entity.classed(css.list_top_level)) {
          this.entity.selectAll("." + css.leaf).style("width", this.width - 1 + "px");
        }
        if (recursive) {
          for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].setWidth(this.width, recursive, immediate);
          }
        }
        return this;
      }
    }

    /**
     * configure menu type (horizontal or vertical)
     * @param direction MENU_HORIZONTAL or MENU_VERTICAL
     * @param recursive change direction over menu sublevels
     * @returns {Menu}
     */
    setDirection(direction, recursive) {
      this.direction = direction;
      this.entity
        .style("width", "")
        .style("height", "");
      if (recursive) {
        for (let i = 0; i < this.menuItems.length; i++) {
          this.menuItems[i].setDirection(this.direction, recursive);
        }
      }
      this._setDirectionClass();
      return this;
    }

    _setDirectionClass() {
      if (this.direction == MENU_HORIZONTAL) {
        this.entity.classed(css.menuVertical, false);
        this.entity.classed(css.menuHorizontal, true);
      } else {
        this.entity.classed(css.menuHorizontal, false);
        this.entity.classed(css.menuVertical, true);
      }
    }

    addSubmenu(item) {
      this.menuItems.push(new MenuItem(this.context, this, item, this.OPTIONS));
    }

    open() {
      const _this = this;
      if (!this.isActive()) {
        _this.parent.parentMenu.openSubmenuNow = true;
        this.closeNeighbors(() => {
          if (_this.direction == MENU_HORIZONTAL) {
            if (!this.menuItems.length) _this.deepleaf = new DeepLeaf(_this.context, this.entity);
            _this._openHorizontal();
            _this.calculateMissingWidth(0);
          } else {
            _this._openVertical();
          }
        });
        _this.parent.parentMenu.openSubmenuNow = false;
      }
      return this;
    }

    /**
     * recursively calculate missed width for last menu level
     * @param width
     * @param cb
     */
    calculateMissingWidth(width, cb) {
      const _this = this;
      if (this.entity.classed(css.list_top_level)) {
        if (width > this.OPTIONS.MAX_MENU_WIDTH) {
          if (typeof cb === "function") cb(width - this.OPTIONS.MAX_MENU_WIDTH);
        }
      } else {
        this.parent.parentMenu.calculateMissingWidth(width + this.width, widthToReduce => {
          if (widthToReduce > 0) {
            _this.reduceWidth(widthToReduce, newWidth => {
              if (typeof cb === "function") cb(newWidth); // callback is not defined if it is emitted from this level
            });
          } else if (typeof cb === "function") cb(widthToReduce);
        });
      }
    }

    /**
     * restore width (if it was reduced before)
     * @param width
     * @param isClosedElement (parameter for check if curent element emit this action)
     * @param cb
     */
    restoreWidth(width, isClosedElement, cb) {
      const _this = this;
      if (isClosedElement) {
        this.parent.parentMenu.restoreWidth(width, false, cb);
      } else if (width <= 0) {
        if (typeof cb === "function") cb();
      } else if (!this.entity.classed(css.list_top_level)) {
        const currentElementWidth =  this.entity.node().offsetWidth;
        const newElementWidth = Math.min(width, _this.width);
        if (currentElementWidth < newElementWidth) {
          const duration = 250 * (currentElementWidth / newElementWidth);
          this.entity.transition()
            .delay(0)
            .duration(duration)
            .style("width", newElementWidth + "px")
            .on("end", () => {
            });
          _this.parent.parentMenu.restoreWidth(width - newElementWidth, false, cb);
        } else {
          this.parent.parentMenu.restoreWidth(width, false, cb);
        }
      } else {
        if (typeof cb === "function") cb();
      }
    }

    /**
     * made element narrower to free space for other element
     * @param width
     * @param cb
     */
    reduceWidth(width, cb) {
      const _this = this;
      const currWidth = this.entity.node().offsetWidth;

      if (currWidth <= this.OPTIONS.MIN_COL_WIDTH) {
        cb(width - _this.width + currWidth);
      } else {

        const newElementWidth = Math.max(this.OPTIONS.MIN_COL_WIDTH, _this.width - width);
        const duration = 250 / (_this.width / newElementWidth);
        this.entity.transition()
          .delay(0)
          .duration(duration)
          .style("width", newElementWidth + "px")
          .on("end", () => {
            cb(width - _this.width + newElementWidth);
          });
      }
    }

    _openHorizontal() {
      const _this = this;
      _this.entity.classed("active", true)
        .transition()
        .delay(0)
        .duration(250)
        .style("width", _this.width + "px")
        .on("end", () => {
          _this.marqueeToggle(true);
        });
    }

    _openVertical() {
      const _this = this;
      _this.entity.style("height", "0px");
      _this.entity.transition()
        .delay(0)
        .duration(250)
        .style("height", (36 * _this.menuItems.length) + "px")
        .on("end", () => {
          _this.entity.style("height", "auto");
          _this.marqueeToggle(true);
          _this.scrollToFitView();
        });
      _this.entity.classed("active", true);
    }

    closeAllChildren(cb) {
      let callbacks = 0;
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].isActive()) {
          ++callbacks;
          this.menuItems[i].submenu.close(() => {
            if (--callbacks == 0) {
              if (typeof cb === "function") cb();
            }
          });
        }
      }
      if (callbacks == 0) {
        if (typeof cb === "function") cb();
      }
    }

    closeNeighbors(cb) {
      if (this.parent) {
        this.parent.closeNeighbors(cb);
      } else {
        cb();
      }
    }

    close(cb) {
      const _this = this;
      this.closeAllChildren(() => {
        if (_this.direction == MENU_HORIZONTAL) {
          _this.deepleaf = null;
          _this._closeHorizontal(cb);
        } else {
          _this._closeVertical(cb);
        }
      });
    }

    _closeHorizontal(cb) {
      const _this = this;
      const openSubmenuNow = _this.parent.parentMenu.openSubmenuNow;
      _this.entity.transition()
        .delay(0)
        .duration(20)
        .style("width", 0 + "px")
        .on("end", () => {
          _this.marqueeToggle(false);
          _this.entity.classed("active", false);
          if (!openSubmenuNow) {
            _this.restoreWidth(_this.OPTIONS.MAX_MENU_WIDTH, true, () => {
              if (typeof cb === "function") cb();
            });
          } else {
            if (typeof cb === "function") cb();
          }
        });
    }

    _closeVertical(cb) {
      const _this = this;
      _this.entity
        .transition()
        .delay(0)
        .duration(100)
        .style("height", 0 + "px")
        .on("end", () => {
          _this.marqueeToggle(false);
          _this.entity.classed("active", false);
          if (typeof cb === "function") cb();
        });
    }

    isActive() {
      return this.entity.classed("active");
    }

    hasActiveParentNeighbour() {
      return this.menuItems
        .filter(item => item.isActive())
        .some(item => !!d3.select(item.entity).node().classed(css.hasChild));
    }

    marqueeToggle(toggle) {
      for (let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].marqueeToggle(toggle);
      }
    }

    marqueeToggleAll(toggle) {
      for (let i = 0; i < this.menuItems.length; i++) {
        this.menuItems[i].marqueeToggleAll(toggle);
      }
    }

    findItemById(id) {
      for (let i = 0; i < this.menuItems.length; i++) {
        if (this.menuItems[i].entity.datum().id == id) {
          return this.menuItems[i];
        }
        if (this.menuItems[i].submenu) {
          const item = this.menuItems[i].submenu.findItemById(id);
          if (item) return item;
        }
      }
      return null;
    }

    getTopMenu() {
      return this.parent ?
        this.parent.parentMenu.getTopMenu() :
        this;
    }

    scrollToFitView() {
      const treeMenuNode = this.getTopMenu().entity.node().parentNode;
      const parentItemNode = this.entity.node().parentNode;
      const menuRect = treeMenuNode.getBoundingClientRect();
      const itemRect = parentItemNode.getBoundingClientRect();
      const viewportItemTop = itemRect.top - menuRect.top;
      if (viewportItemTop + itemRect.height > menuRect.height) {
        const newItemTop = (itemRect.height > menuRect.height) ?
          (menuRect.height - 10) : (itemRect.height + 10);

        const newScrollTop = treeMenuNode.scrollTop + newItemTop - menuRect.height + viewportItemTop;

        const scrollTopTween = function(scrollTop) {
          return function() {
            const i = d3.interpolateNumber(this.scrollTop, scrollTop);
            return function(t) {
              treeMenuNode.scrollTop = i(t);
            };
          };
        };

        d3.select(treeMenuNode).transition().duration(100)
          .tween("scrolltoptween", scrollTopTween(newScrollTop));

      }

    }
  }
  class MenuItem {
    constructor(context, parent, item, options) {
      const _this = this;
      this.context = context;
      this.parentMenu = parent;
      this.entity = item;
      this.entity.select("." + css.list_item_label).call(select => {
        if (isTouchDevice()) {
          select.onTap((event) => {
            event.stopPropagation();
            if (_this.parentMenu.direction == MENU_VERTICAL) {
              const view = _this.entity.select("." + css.list_item_label);
              //only for leaf nodes
              if (!view.attr("children")) return;
            }
            if (!_this.submenu) {
              _this.submenu = new Menu(_this.context, _this, _this.entity, options);
            }
            _this.toggleSubmenu();
          });
        } else {
          select.on("mouseenter", function() {
            if (_this.parentMenu.direction == MENU_HORIZONTAL && !d3.select(this).attr("children")) {
              if (!_this.submenu) {
                _this.submenu = new Menu(_this.context, _this, _this.entity, options);
              }
              _this.openSubmenu();
            } else if (!_this.parentMenu.hasActiveParentNeighbour()) {
              _this.closeNeighbors();
            }
            _this.marqueeToggle(true);
          }).on("click.item", function(event) {
            event.stopPropagation();
            if (!_this.submenu) {
              _this.submenu = new Menu(_this.context, _this, _this.entity, options);
            }
            if (_this.parentMenu.direction == MENU_HORIZONTAL) {
              _this.openSubmenu();
            } else {
              const view = d3.select(this);
              //only for leaf nodes
              if (!view.attr("children")) return;
              _this.toggleSubmenu();
            }
          });
        }

        if (options.selectedPath[0] === select.datum().id) {
          options.selectedPath.shift();
          _this.submenu = new Menu(_this.context, _this, _this.entity, options);
        }
      });
      return this;
    }

    setWidth(width, recursive, immediate) {
      if (this.submenu && recursive) {
        this.submenu.setWidth(width, recursive, immediate);
      }
      return this;
    }

    setDirection(direction, recursive) {
      if (this.submenu && recursive) {
        this.submenu.setDirection(direction, recursive);
      }
      return this;
    }

    toggleSubmenu() {
      if (this.submenu) {
        if (this.submenu.isActive()) {
          this.submenu.close();
        } else {
          this.submenu.open();
        }
      }
    }

    openSubmenu() {
      if (this.submenu) {
        this.submenu.open();
      } else {
        this.closeNeighbors();
      }
    }

    closeNeighbors(cb) {
      this.parentMenu.closeAllChildren(cb);
    }

    isActive() {
      return this.submenu && this.submenu.isActive();
    }

    marqueeToggleAll(toggle) {
      const labels = this.entity.selectAll("." + css.list_item_label);
      labels.each(function() {
        const label = d3.select(this).select("span");
        const parent = d3.select(this.parentNode);
        parent.classed("marquee", false);
        label.style("width", "");
        if (toggle) {
          if (label.node().scrollWidth > label.node().offsetWidth) {
            label.attr("data-content", label.text());
            const space = 30;
            const offset = space + label.node().scrollWidth;
            label.style("width", offset + "px");
            parent.classed("marquee", true);
          }
        }
      });
    }

    marqueeToggle(toggle) {
      const label = this.entity.select("." + css.list_item_label).select("span");
      this.entity.classed("marquee", false);
      label.style("width", "");
      if (toggle) {
        if (label.node().scrollWidth > label.node().offsetWidth) {
          label.attr("data-content", label.text());
          const space = 30;
          const offset = space + label.node().scrollWidth;
          label.style("width", offset + "px");
          this.entity.classed("marquee", true);
        }
      }
    }
  }

  const PROFILE_CONSTANTS$1 = {
    SMALL: {
      col_width: 200
    },
    MEDIUM: {
      col_width: 200
    },
    LARGE: {
      col_width: 200
    }
  };

  const PROFILE_CONSTANTS_FOR_PROJECTOR$1 = {
    MEDIUM: {
      col_width: 200
    },
    LARGE: {
      col_width: 200
    }
  };

  function getTagNameForDs(ds){
    return "dataset " + ds.id;
  }

  function getItemName(item){
    if (item.type == "indicator"){
      return item.byDataSources.map(m => m.name_catalog)
        .concat(item.byDataSources.map(m => m.name))
        .concat(item.id)
        .filter(f => f)
        [0]
    } else {
      return item.name_catalog || item.name || item.id;
    }
  }


  function resolveDefaultScales(concept) {
    if (concept.scales) return JSON.parse(concept.scales);
    switch (concept.concept_type) {
    case "measure": return ["linear", "log"];
    case "string": return ["ordinal"];
    case "entity_domain": return ["ordinal"];
    case "entity_set": return ["ordinal"];
    case "boolean": return ["ordinal"];
    case "time": return ["time"];
    default: return ["linear", "log"];
    }
  }

  function spacesAreEqual(a, b){
    return a.concat().sort().join() === b.concat().sort().join();
  }

  /*!
   * VIZABI TREEMENU
   * Treemenu component
   */

  class TreeMenu extends BaseComponent {

    constructor(config) {
      //contructor is the same as any component
      super(config);
    }

    //setters-getters
    indicatorsTree(input) {
      if (!arguments.length) return this._indicatorsTree;
      this._indicatorsTree = input;
      return this;
    }
    callback(input) {
      if (!arguments.length) return this._callback;
      this._callback = input;
      return this;
    }
    encoding(input) {
      if (!arguments.length) return this._encoding;
      this._encoding = input;
      this.targetModel(this.model.encoding[this._encoding]);
      return this;
    }
    showWhenReady(input) {
      if (!arguments.length) return this._showWhenReady;
      this._showWhenReady = input;
      return this;
    }
    scaletypeSelectorDisabled(input) {
      if (!arguments.length) return this._scaletypeSelectorDisabled;
      this._scaletypeSelectorDisabled = input;
      return this;
    }
    title(input) {
      if (!arguments.length) return this._title;
      this._title = input;
      return this;
    }

    alignX(input) {
      if (!arguments.length) return this._alignX;
      this._alignX = input;
      return this;
    }
    alignY(input) {
      if (!arguments.length) return this._alignY;
      this._alignY = input;
      return this;
    }
    top(input) {
      if (!arguments.length) return this._top;
      this._top = input;
      return this;
    }
    left(input) {
      if (!arguments.length) return this._left;
      this._left = input;
      return this;
    }

    targetModel(input) {
      if (!arguments.length) return this._targetModel;

      this.removeReaction(this._targetModelReaction);
      this._targetModel = input;
      this._targetProp = null;
      this._targetProp = ["data", "concept"];
      this.addReaction(this._targetModelReaction);

      return this;
    }

    targetProp(input) {
      if (!arguments.length) return this._targetProp;
      this._targetProp = input;
      return this;
    }

    _targetModelReaction() {
      getProp(this._targetModel, ["scale", "type"]);
      getProp(this._targetModel, this._targetProp);
      this.updateView();
    }

    _buildTagFolderTree({ tagsArray, dataModels }) {
      if (tagsArray === true || !tagsArray) tagsArray = [];

      const ROOT = "_root";
      const ADVANCED = "advanced";
      const OTHER_DATASETS = "other_datasets";

      const FOLDER_STRATEGY_SPREAD = "spread"; //spread indicatos over the root of treemeny
      const FOLDER_STRATEGY_ROOT = "root"; //put indicators in dataset's own folder under root of treemeny
      const FOLDER_STRATEGY_FOLDER = "folder"; //put indicators in dataset's own folder inside a specified folder. use notation like "folder:other_datasets"

      //const dataModels = _this.model.marker._root.dataManager.getDataModels();
      const FOLDER_STRATEGY_DEFAULT = dataModels.length == 1 ? FOLDER_STRATEGY_SPREAD : FOLDER_STRATEGY_ROOT;

      //init the dictionary of tags and add default folders
      const tags = {};
      tags[ROOT] = { id: ROOT, children: [] };
      tags[ADVANCED] = { id: ADVANCED, name: this.localise("treemenu/advanced"), type: "folder", children: [] };
      tags[ROOT].children.push(tags[ADVANCED]);
      tags[OTHER_DATASETS] = { id: OTHER_DATASETS, name: this.localise("treemenu/other_datasets"), type: "folder", children: [] };
      tags[ROOT].children.push(tags[OTHER_DATASETS]);

      //populate the dictionary of tags
      tagsArray.forEach(tag => { tags[tag.tag] = { id: tag.tag, name: tag.name, type: "folder", children: [] }; });

      //put the dataset folders where they should be: either in root or in specific folders or ==root in case of spreading
      const folderStrategies = {};
      dataModels.forEach((ds) => {
        //special ds tag id is needed to prevent a situation when DS id happens to be equal to ID of one of the tags
        const dsTag = getTagNameForDs(ds);

        //figure out the folder strategy
        let strategy = getProp(this.ui, ["folderStrategyByDataset", ds.id]);
        let folder = null;
        if (!strategy) strategy = FOLDER_STRATEGY_DEFAULT;

        if (strategy.includes(":")) {
          folder = strategy.split(":")[1];
          strategy = strategy.split(":")[0];
        }

        //add the dataset's folder to the tree
        tags[dsTag] = { id: ds.id, name: this._getDatasetName(ds), type: "dataset", children: [] };

        if (strategy == FOLDER_STRATEGY_FOLDER && tags[folder]) {
          tags[folder].children.push(tags[dsTag]);
        } else if (strategy == FOLDER_STRATEGY_SPREAD) {
          tags[dsTag] = tags[ROOT];
        } else {
          tags[ROOT].children.push(tags[dsTag]);
        }

        folderStrategies[ds.id] = strategy;
      });

      //populate the tag tree
      tagsArray.forEach(tag => {

        //if tag's parent is defined
        if (tag.parent && tags[tag.parent]) {

          //add tag to a branch
          tags[tag.parent].children.push(tags[tag.tag]);

        } else {

          //if parent is missing add a tag either to dataset's own folder or to the root if spreading them
          if (folderStrategies[tag.datasource.id] == FOLDER_STRATEGY_SPREAD) {
            tags[ROOT].children.push(tags[tag.tag]);
          } else {
            if (tags[getTagNameForDs(tag.datasource)])
              tags[getTagNameForDs(tag.datasource)].children.push(tags[tag.tag]);
            else
              warn(`Tags request to the datasource ${tag.datasource.id} probably didn't succeed`);
          }
        }
      });

      return {tags, tagsRoot: tags[ROOT]};
    }

    _addIndicatorToTheTree(id, item, folder) {
      const existing = folder.children.find(f => f.id == id);
      if (existing) {
        //add to an existing item group
        existing.byDataSources.push(item);
      } else {
        //create a new item group
        folder.children.push({ id: id, type: "indicator", byDataSources: [item] });
      }
      return folder;
    }

    _buildIndicatorsTree({ tagsArray, dataModels }) {

      let consoleGroupOpen = false;
      const {tags, tagsRoot} = this._buildTagFolderTree({ tagsArray, dataModels });

      //add constant pseudoconcept
      this._addIndicatorToTheTree("_default", { spaces: [[]] }, tagsRoot);

      const nest = this._nestAvailabilityByConcepts(this._getAvailability());
      const filtervl = this._conceptsCompatibleWithMarkerSpace(nest, this.model.data.space);
      const concepts = this._convertConceptMapToArray(filtervl);

      concepts
        //add marker space concepts to be able to select "color by countries" or "x by time"
        .concat(this.model.data.space.map(d => {
          return { 
            spaces: [[d]],
            source: this.model.data.source,
            concept: this.model.data.source.getConcept(d)
          }; 
        }))
        .filter(f => !f.concept.tags || f.concept.tags !== "_none")
        .forEach(({concept, spaces, source}) => {

          const id = concept.concept;
          const props = {
            dataSource: source,
            spaces,
            name: concept.name,
            name_catalog: concept.name_catalog,
            description: concept.description
          };

          if (concept.concept_type == "time" || concept.concept == "_default"){
            //special concepts
            this._addIndicatorToTheTree(id, props, tagsRoot);

          } else if (concept.concept_type == "entity_domain" || concept.concept_type == "entity_set") {
            //entity sets and domains
            const keyConcept = source.getConcept(spaces[0][0]);
            const folderName = keyConcept.concept + "_properties";
            if (!tags[folderName]) {
              tags[folderName] = { id: folderName, name: keyConcept.name + " properties", type: "folder", children: [] };
              tagsRoot.children.push(tags[folderName]);
            }
            this._addIndicatorToTheTree(id, props, tags[folderName]);

          } else {
            //regulat indicators
            const conceptTags = concept.tags || getTagNameForDs(source) || "_root";
            conceptTags.split(",").forEach(tag => {
              tag = tag.trim();
              if (tags[tag]) {
                this._addIndicatorToTheTree(id, props, tags[tag]);
              } else {
                //if entry's tag is not found in the tag dictionary
                if (!consoleGroupOpen) {
                  console.groupCollapsed("Some tags were not found, so indicators went under menu root");
                  consoleGroupOpen = true;
                }
                warn("tag '" + tag + "' for indicator '" + props.id + "'");
                this._addIndicatorToTheTree(id, props, tagsRoot);
              }
            });

          }
        });


      if (consoleGroupOpen) console.groupEnd();
      this._sortChildren(tagsRoot);
      this.indicatorsTree(tagsRoot);

      return Promise.resolve();
    }

    _sortChildren(tree, isSubfolder) {
      const _this = this;
      if (!tree.children) return;
      tree.children.sort(
        firstBy()((a, b) => { a = a.type === "dataset" ? 1 : 0;  b = b.type === "dataset" ? 1 : 0; return b - a; })
          .thenBy((a, b) => { a = a.children ? 1 : 0;  b = b.children ? 1 : 0; return a - b; })
          .thenBy((a, b) => {
          //in the root level put "time" on top and send "anvanced" to the bottom
            if (!isSubfolder) {
              if (a.id == "time") return -1;
              if (b.id == "time") return 1;
              if (a.id == "other_datasets") return 1;
              if (b.id == "other_datasets") return -1;
              if (a.id == "advanced") return 1;
              if (b.id == "advanced") return -1;
              if (a.id == "_default") return 1;
              if (b.id == "_default") return -1;
            }
            //sort items alphabetically. folders go down because of the emoji folder in the beginning of the name
            return getItemName(a) > getItemName(b) ? 1 : -1;
          })
      );

      //recursively sort items in subfolders too
      tree.children.forEach(d => {
        _this._sortChildren(d, true);
      });
    }

    //happens on resizing of the container
    _resize() {
      this.services.layout.size;
      
      const _this = this;
      const { wrapper, wrapperOuter } = this.DOM;

      let top = this._top;
      let left = this._left;

      if (!wrapper) return warn("treemenu resize() abort because container is undefined");

      wrapper.classed(css.noTransition, true);
      wrapper.node().scrollTop = 0;

      this.OPTIONS.IS_MOBILE = this.services.layout.profile === "SMALL";

      if (this.menuEntity) {
        this.menuEntity.setWidth(this.profileConstants.col_width, true, true);

        if (this.OPTIONS.IS_MOBILE) {
          if (this.menuEntity.direction != MENU_VERTICAL) {
            this.menuEntity.setDirection(MENU_VERTICAL, true);
            this.OPTIONS.MENU_DIRECTION = MENU_VERTICAL;
          }
        } else {
          if (this.menuEntity.direction != MENU_HORIZONTAL) {
            this.menuEntity.setDirection(MENU_HORIZONTAL, true);
            this.OPTIONS.MENU_DIRECTION = MENU_HORIZONTAL;
          }
        }
      }

      this.width = _this.element.node().offsetWidth;
      this.height = _this.element.node().offsetHeight;
      const rect = wrapperOuter.node().getBoundingClientRect();
      const containerWidth = rect.width;
      let containerHeight = rect.height;
      if (containerWidth) {
        if (this.OPTIONS.IS_MOBILE) {
          this.clearPos();
        } else {
          if (top || left) {
            if (wrapperOuter.node().offsetTop < 10) {
              wrapperOuter.style("top", "10px");
            }
            if (this.height - wrapperOuter.node().offsetTop - containerHeight < 0) {
              if (containerHeight > this.height) {
                containerHeight = this.height - 20;
              }
              wrapperOuter.style("top", (this.height - containerHeight - 10) + "px");
              wrapperOuter.style("bottom", "auto");
            }
            if (top) top = wrapperOuter.node().offsetTop;
          }

          let maxHeight;
          if (wrapperOuter.classed(css.alignYb)) {
            maxHeight = wrapperOuter.node().offsetTop + wrapperOuter.node().offsetHeight;
          } else {
            maxHeight = this.height - wrapperOuter.node().offsetTop;
          }
          wrapper.style("max-height", (maxHeight - 10) + "px");

          wrapperOuter.classed(css.alignXc, this._alignX === "center");
          wrapperOuter.style("margin-left", this._alignX === "center" ? "-" + containerWidth / 2 + "px" : null);
          if (this._alignX === "center") {
            this.OPTIONS.MAX_MENU_WIDTH = this.width / 2 - containerWidth * 0.5 - 10;
          } else {
            this.OPTIONS.MAX_MENU_WIDTH = this.width - wrapperOuter.node().offsetLeft - containerWidth - 10; // 10 - padding around wrapper
          }

          const minMenuWidth = this.profileConstants.col_width + this.OPTIONS.MIN_COL_WIDTH * 2;
          let leftPos = wrapperOuter.node().offsetLeft;
          this.OPTIONS.MENU_OPEN_LEFTSIDE = this.OPTIONS.MAX_MENU_WIDTH < minMenuWidth && leftPos > (this.OPTIONS.MAX_MENU_WIDTH + 10);
          if (this.OPTIONS.MENU_OPEN_LEFTSIDE) {
            if (leftPos <  (minMenuWidth + 10)) leftPos = (minMenuWidth + 10);
            this.OPTIONS.MAX_MENU_WIDTH = leftPos - 10; // 10 - padding around wrapper
          } else {
            if (this.OPTIONS.MAX_MENU_WIDTH < minMenuWidth) {
              leftPos -= (minMenuWidth - this.OPTIONS.MAX_MENU_WIDTH);
              this.OPTIONS.MAX_MENU_WIDTH = minMenuWidth;
            }
          }

          if (left) {
            left = leftPos;
          } else {
            if (leftPos != wrapperOuter.node().offsetLeft) {
              wrapperOuter.style("left", "auto");
              wrapperOuter.style("right", (this.width - leftPos - rect.width) + "px");
            }
          }

          this._top = top;
          this._left = left;

          if (left || top) this.setPos();

          wrapperOuter.classed("vzb-treemenu-open-left-side", !this.OPTIONS.IS_MOBILE && this.OPTIONS.MENU_OPEN_LEFTSIDE);
        }
      }

      wrapper.node().offsetHeight;
      wrapper.classed(css.noTransition, false);

      this._setHorizontalMenuHeight();

      return this;
    }

    toggle() {
      this.setHiddenOrVisible(!this.element.classed(css.hidden));
    }

    setHiddenOrVisible(hidden) {
      const _this = this;

      this.element.classed(css.hidden, hidden);
      this.DOM.wrapper.classed(css.noTransition, hidden);

      if (hidden) {
        this.clearPos();
        this.menuEntity.marqueeToggle(false);
      } else {
        this.setPos();
        !isTouchDevice() && this._focusSearch();
        this._resize();
        this._scrollToSelected();
      }

      this.root.children.forEach(c => {
        if (c.name == "gapminder-dialogs") {
          d3.select(c.placeholder.parentNode).classed("vzb-blur", !hidden);
        } else
        if (c.element.classed) {
          c.element.classed("vzb-blur", c != _this && !hidden);
        } else {
          d3.select(c.element).classed("vzb-blur", c != _this && !hidden);
        }
      });

      this.width = _this.element.node().offsetWidth;

      return this;
    }

    _scrollToSelected() {
      if (!this.selectedNode) return;
      const _this = this;

      if (this.menuEntity.direction == MENU_VERTICAL) {
        scrollToItem(this.DOM.wrapper.node(), this.selectedNode);
        _this.menuEntity.marqueeToggleAll(true);
      } else {
        const selectedItem = this.menuEntity.findItemById(d3.select(this.selectedNode).datum().id);
        selectedItem.submenu.calculateMissingWidth(0, () => {
          _this.menuEntity.marqueeToggleAll(true);
        });

        let parent = this.selectedNode;
        let listNode;
        while (!(hasClass(parent, css.list_top_level))) {
          if (parent.tagName == "LI") {
            listNode = hasClass(parent.parentNode, css.list_top_level) ? parent.parentNode.parentNode : parent.parentNode;
            scrollToItem(listNode, parent);
          }
          parent = parent.parentNode;
        }
      }

      function scrollToItem(listNode, itemNode){
        listNode.scrollTop = 0;
        const rect = listNode.getBoundingClientRect();
        const itemRect = itemNode.getBoundingClientRect();
        const scrollTop = itemRect.bottom - rect.top - listNode.offsetHeight + 10;
        listNode.scrollTop = scrollTop;
      }
    }

    setPos() {
      const { wrapperOuter } = this.DOM;

      const top = this._top;
      const left = this._left;
      const rect = wrapperOuter.node().getBoundingClientRect();

      if (top) {
        wrapperOuter.style("top", top + "px");
        wrapperOuter.style("bottom", "auto");
        wrapperOuter.classed(css.absPosVert, top);
      }
      if (left) {
        let right = this.element.node().offsetWidth - left - rect.width;
        right = right < 10 ? 10 : right;
        wrapperOuter.style("right", right + "px");
        wrapperOuter.style("left", "auto");
        wrapperOuter.classed(css.absPosHoriz, right);
      }

    }

    clearPos() {
      const { wrapper, wrapperOuter } = this.DOM;

      this._top = "";
      this._left = "";
      wrapperOuter.attr("style", "");
      wrapperOuter.classed(css.absPosVert, "");
      wrapperOuter.classed(css.absPosHoriz, "");
      wrapperOuter.classed(css.menuOpenLeftSide, "");
      wrapper.style("max-height", "");
    }

    _setHorizontalMenuHeight() {
      const { wrapper } = this.DOM;

      let wrapperHeight = null;
      if (this.menuEntity && this.OPTIONS.MENU_DIRECTION == MENU_HORIZONTAL && this.menuEntity.menuItems.length) {
        const oneItemHeight = parseInt(this.menuEntity.menuItems[0].entity.style("height"), 10) || 0;
        const menuMaxHeight = oneItemHeight * this._maxChildCount;
        const rootMenuHeight = Math.max(this.menuEntity.menuItems.length, 3) * oneItemHeight + this.menuEntity.entity.node().offsetTop + parseInt(wrapper.style("padding-bottom"), 10);
        wrapperHeight = "" + Math.max(menuMaxHeight, rootMenuHeight) + "px";
      }
      wrapper.classed(css.noTransition, true);
      wrapper.node().offsetHeight;
      wrapper.style("height", wrapperHeight);
      wrapper.node().offsetHeight;
      wrapper.classed(css.noTransition, false);
    }

    //search listener
    _enableSearch() {
      const _this = this;

      const input = this.DOM.wrapper.select("." + css.search);

      //it forms the array of possible queries
      const getMatches = function(value) {
        const matches = {
          _id: "root",
          children: []
        };

        //translation integration
        const translationMatch = function(value, data, i) {

          //search name in all datasources
          const item = data[i];
          let translate = item.type == "folder" && item.name || item.type == "indicator" && item.byDataSources.map(m => m.name).join();
          if (!translate && _this.localise) {
            const t1 = _this.localise("indicator" + "/" + data[i][_this.OPTIONS.SEARCH_PROPERTY] + "/" + _this._targetModel._type);
            translate =  t1 || _this.localise("indicator/" + data[i][_this.OPTIONS.SEARCH_PROPERTY]);
          }
          return translate && translate.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        };

        const matching = function(data) {
          const SUBMENUS = _this.OPTIONS.SUBMENUS;
          for (let i = 0; i < data.length; i++) {
            let match = false;
            match =  translationMatch(value, data, i);
            if (match) {
              matches.children.push(data[i]);
            }
            if (!match && data[i][SUBMENUS]) {
              matching(data[i][SUBMENUS]);
            }
          }
        };
        matching(_this.dataFiltered.children);

        matches.children = unique(matches.children, child => child.id);
        return matches;
      };

      let searchValueNonEmpty = false;

      const searchIt = debounce(() => {
        const value = input.node().value;

        //Protection from unwanted IE11 input events.
        //IE11 triggers an 'input' event when 'placeholder' attr is set to input element and
        //on 'focusin' and on 'focusout', if nothing has been entered into the input.
        if (!searchValueNonEmpty && value == "") return;
        searchValueNonEmpty = value != "";

        if (value.length >= _this.OPTIONS.SEARCH_MIN_STR) {
          _this.redraw(getMatches(value), true);
        } else {
          _this.redraw();
        }
      }, 250);

      input.on("input", searchIt);
    }

    _selectIndicator(concept) {
      if(concept.id == this._targetModel.data.concept) return;
      this._setModelWhich(concept);
      this.toggle();
    }


    //function is redrawing data and built structure
    redraw(data, useDataFiltered) {
      const _this = this;

      let dataFiltered, allowedIDs;

      const indicatorsDB = { _default:{} };
      forEach(this.services.Vizabi.Vizabi.stores.dataSources.getAll(), m => {
        m.concepts.forEach(c => {
          indicatorsDB[c.concept] = c;
        });
      });

      const targetModelName = _this._targetModel.name || _this._targetModel.config.type;

      if (useDataFiltered) {
        dataFiltered = data;
      } else {
        if (data == null) data = this._indicatorsTree;

        allowedIDs = keys(indicatorsDB).filter(f => {

          //check if indicator is denied to show with allow->names->!indicator
          if (_this._targetModel.data.allow && _this._targetModel.data.allow.names) {
            if (_this._targetModel.data.allow.names.indexOf("!" + f) != -1) return false;
            if (_this._targetModel.data.allow.names.indexOf(f) != -1) return true;
            if (_this._targetModel.data.allow.namesOnlyThese) return false;
          }

          const allowedTypes = _this._targetModel.scale.allowedTypes;
          const isEntity = indicatorsDB[f].concept_type == "entity_domain" || indicatorsDB[f].concept_type == "entity_set";
          const isMeasure = indicatorsDB[f].concept_type == "measure";
          const isTime = indicatorsDB[f].concept_type == "time";
          const isConstant = f === "_default"; //TODO: refactor constants
          const indicatorScales = JSON.parse(indicatorsDB[f].scales || null);

          //keep indicator if nothing is specified in tool properties or if any scale is allowed explicitly
          if (!allowedTypes || !allowedTypes.length || allowedTypes[0] == "*") return true;

          //match specific scale types if defined
          if(indicatorScales) {
            for (let i = indicatorScales.length - 1; i >= 0; i--) {
              if (allowedTypes.includes(indicatorScales[i])) return true;
            }
          }

          //otherwise go by concept types
          if (isEntity){
            //for entities need an ordinal scale to be allowed at this point
            if (allowedTypes.includes("ordinal")) return true;
          } else if (isConstant) {
            //for constants need a ordinal scale to be allowed
            if (allowedTypes.includes("ordinal")) return true;
          } else if (isMeasure){
            // for measures need linear or log or something
            if (allowedTypes.includes("linear") || allowedTypes.includes("log")
              || allowedTypes.includes("genericLog") || allowedTypes.includes("pow")) return true;
          } else if (isTime) {
            if (allowedTypes.includes("time")) return true;
          }

          return false;
        });
        const satisfiesAllowedSpaces = (item) => {
          //optionally check if at least one space in at least one space of at least one DS of a menu item satisfies the "allow.space" filter
          let spacesFromAllDS = [];
          item.byDataSources.forEach(item => spacesFromAllDS = spacesFromAllDS.concat(item.spaces));
          return spacesFromAllDS.some(space => this._targetModel.data.allow.space.filter(space));          
        };
        dataFiltered = pruneTree(data, f => allowedIDs.includes(f.id) && f.type == "indicator" && satisfiesAllowedSpaces(f));

        this.dataFiltered = dataFiltered;
      }

      const { wrapper } = this.DOM;
      wrapper.classed("vzb-hidden", !useDataFiltered).select("ul").remove();

      let title = "";
      if (this._title || this._title === "") {
        title = this._title;
      } else {
        title = this.localise("buttons/" + targetModelName);
      }
      this.element.select("." + css.title).select("span")
        .text(title);

      this.element.select("." + css.search)
        .attr("placeholder", this.localise("placeholder/search") + "...");

      this._maxChildCount = 0;
      let selected = getProp(_this._targetModel, _this._targetProp);
      const selectedPath = [];
      eachTree(dataFiltered, (f, parent) => {
        if (f.children && f.children.length > _this._maxChildCount) _this._maxChildCount = f.children.length;
        if (f.id === selected && parent) {
          selectedPath.unshift(f.id);
          selected = parent.id;
        }
      });
      this.OPTIONS.selectedPath = selectedPath;

      if (this.OPTIONS.IS_MOBILE) {
        this.OPTIONS.MENU_DIRECTION = MENU_VERTICAL;
      } else {
        this.OPTIONS.MENU_DIRECTION = MENU_HORIZONTAL;
      }
      this.OPTIONS.createSubmenu = this._createSubmenu.bind(this);
      this.OPTIONS.COL_WIDTH = this.profileConstants.col_width;

      this.selectedNode = null;
      wrapper.datum(dataFiltered);
      this.menuEntity = new Menu(this, null, wrapper, this.OPTIONS);
      wrapper.classed("vzb-hidden", false);

      this._setHorizontalMenuHeight();

      if (!useDataFiltered) {
        let pointer = "_default";
        if (allowedIDs.indexOf(getProp(this._targetModel, this._targetProp)) > -1) pointer = getProp(this._targetModel, this._targetProp);
        const concept = indicatorsDB[pointer];
        if (!concept) error("Concept properties of " + pointer + " are missing from the set, or the set is empty. Put a breakpoint here and check what you have in indicatorsDB");

        const scaleTypesData = resolveDefaultScales(concept).filter(f => {
          if (!_this._targetModel.data.allow || !_this._targetModel.data.allow.scales) return true;
          if (_this._targetModel.data.allow.scales[0] == "*") return true;
          return _this._targetModel.data.allow.scales.indexOf(f) > -1;
        });
        if (scaleTypesData.length == 0) {
          this.element.select("." + css.scaletypes).classed(css.hidden, true);
        } else {

          let scaleTypes = this.element.select("." + css.scaletypes).classed(css.hidden, false).selectAll("span")
            .data(scaleTypesData, d => d);

          scaleTypes.exit().remove();

          scaleTypes = scaleTypes.enter().append("span")
            .on("click", (event, d) => {
              event.stopPropagation();
              _this._setModelScaleType(d);
            })
            .merge(scaleTypes);

          const mdlScaleType = _this._targetModel.scale.type;

          scaleTypes
            .classed(css.scaletypesDisabled, scaleTypesData.length < 2 || _this._scaletypeSelectorDisabled)
            .classed(css.scaletypesActive, d => (d == mdlScaleType || d === "log" && mdlScaleType === "genericLog") && scaleTypesData.length > 1)
            .text(d => _this.localise("scaletype/" + d));
        }

      }

      return this;
    }

    _createSubmenu(select, data, toplevel) {
      if (!data.children) return;
      const _this = this;
      const targetModelName = _this._targetModel.name || _this._targetModel.config.type;
      const _select = toplevel ? select : select.append("div")
        .classed(css.list_outer, true);

      const li = _select.append("ul")
        .classed(css.list, !toplevel)
        .classed(css.list_top_level, toplevel)
        .classed("vzb-dialog-scrollable", true)
        .selectAll("li")
        .data(data.children, d => d["id"])
        .enter()
        .append("li");

      li.append("span")
        .classed(css.list_item_label, true)
        // .attr("info", function(d) {
        //   return d.id;
        // })
        .attr("children", d => d.children ? "true" : null)
        .attr("type", d => d.type ? d.type : null)
        .style("color", d => {
          if (this.ui.showDataSources && d.type == "indicator" && d.id !== "_default" && d.byDataSources.length == 1) {
            return this.dsColorScaleDark(d.byDataSources[0].dataSource.id);
          } else {
            return null;
          }
        })
        .on("click", function(event, d) {
          const view = d3.select(this);
          //only for leaf nodes
          if (view.attr("children")) return;
          event.stopPropagation();
          _this._selectIndicator(d);
        })
        .append("span")
        .text(d => {
          //Let the indicator "_default" in tree menu be translated differnetly for every hook type
          const translated = d.id === "_default" ? _this.localise("indicator/_default/" + targetModelName) : getItemName(d);
          if (!translated && translated !== "") warn("translation missing: NAME of " + d.id);
          return translated || "";
        });

      li.classed(css.list_item, true)
        .classed(css.hasChild, d => d["children"])
        .classed(css.isSpecial, d => d["special"])
        .each(function(d) {
          const view = d3.select(this);

          //deepLeaf
          if (!d.children) {
            if (d.id === "_default") {
              d.byDataSources[0].name = _this.localise("indicator/_default/" + targetModelName);
              d.byDataSources[0].description = _this.localise("description/_default/" + targetModelName);
            }
            const deepLeaf = view.append("div")
              .attr("class", css.menuHorizontal + " " + css.list_outer + " " + css.list_item_leaf);
            deepLeaf.on("click", (event, d) => {
              _this._selectIndicator(d);
            });
          }

          if (d.id == getProp(_this._targetModel, _this._targetProp)) {
            let parent;
            if (_this.selectedNode && toplevel) {
              parent = _this.selectedNode.parentNode;
              d3.select(_this.selectedNode)
                .select("." + css.list_item_leaf).classed("active", false);
              while (!(hasClass(parent, css.list_top_level))) {
                if (parent.tagName == "UL") {
                  d3.select(parent.parentNode)
                    .classed("active", false);
                }
                parent = parent.parentNode;
              }
            }
            if (!_this.selectedNode || toplevel) {
              parent = this.parentNode;
              d3.select(this).classed("item-active", true)
                .select("." + css.list_item_leaf).classed("active", true);
              while (!(hasClass(parent, css.list_top_level))) {
                if (parent.tagName == "UL") {
                  d3.select(parent.parentNode)
                    .classed("active", true);
                }
                if (parent.tagName == "LI") {
                  d3.select(parent).classed("item-active", true);
                }
                parent = parent.parentNode;
              }
              _this.selectedNode = this;
            }
          }
        });
    }

    updateView() {
      if (!this._targetModel) return;
      if (!this._indicatorsTree) return console.error("Tree menu: indicator tree has not been constructed (yet?)");

      const { wrapper, wrapperOuter } = this.DOM;

      wrapperOuter.classed(css.absPosVert, this._top);
      wrapperOuter.classed(css.alignYt, this._alignY === "top");
      wrapperOuter.classed(css.alignYb, this._alignY === "bottom");
      wrapperOuter.classed(css.absPosHoriz, this._left);
      wrapperOuter.classed(css.alignXl, this._alignX === "left");
      wrapperOuter.classed(css.alignXr, this._alignX === "right");

      this.redraw();

      if (this._showWhenReady) this.setHiddenOrVisible(false).showWhenReady(false);

      wrapper.select("." + css.search).node().value = "";

      return this;
    }

    _focusSearch(focus = true) {
      const searchInput = this.DOM.wrapper.select("." + css.search).node();

      if (focus) {
        searchInput.focus();
      } else {
        searchInput.blur();
      }
    }

    _setModelScaleType(type){
      this._targetModel.scale.config.type = type;
    }

    _setModelWhich(concept) {    
      if(concept.id == "_default"){
        this._targetModel.setWhich({
          key: null,
          value: {concept: "_default", dataSource: null}
        });
      } else {
        const {space, dataSource} = this.getBestFittingDataSourceAndSpace(concept.byDataSources);
        this._targetModel.setWhich({
          key: space,
          value: {concept: concept.id, dataSource: dataSource.id}
        });
      }
    }

    getBestFittingDataSourceAndSpace(byDataSources) {
      const bestSpacePerDataSource = byDataSources.map(m => this.getNearestSpaceToMarkerSpace(m.spaces));
      const bestSpace = this.getNearestSpaceToMarkerSpace(bestSpacePerDataSource);

      const dsCandidates = byDataSources.filter(f => f.spaces.find(s => spacesAreEqual(s, bestSpace))).map(m => m.dataSource);
       
      if (dsCandidates.includes(this.model.data.source))
        return {space: bestSpace, dataSource: this.model.data.source};
      else if (dsCandidates.includes(this._targetModel.data.source)) 
        return {space: bestSpace, dataSource: this._targetModel.data.source};
      else
        return {space: bestSpace, dataSource: dsCandidates[0]};
    }

    getNearestSpaceToMarkerSpace(spaces){
      //concept has an available space same as already set in marker: perfect match!
      if (spaces.find(f => spacesAreEqual(f, this.model.data.space))) 
        return this.model.data.space;

      //otherwise return space that is closest by length to marker space length
      //so we prioritise [country, gender, time] over [country, gender, age, time]
      const markerSpaceLen = this.model.data.space.length;
      const spacesPrio = spaces.concat()
        .sort((a, b) => Math.abs(a.length - markerSpaceLen) - Math.abs(b.length - markerSpaceLen));
      return spacesPrio[0];
    }

    setup() {
      this.state = {
        ownReadiness: STATUS.INIT
      };

      // object for manipulation with menu representation level
      this.menuEntity = null;

      this._alignX = "center";
      this._alignY = "center";

      //options
      this.OPTIONS = deepClone(OPTIONS$3);

      //general markup
      this.DOM = {
      };

      this.element.classed(css.hidden, true)
        .append("div")
        .attr("class", css.background)
        .on("click", (event) => {
          event.stopPropagation();
          this.toggle();
        });

      this.DOM.wrapperOuter = this.element
        .append("div")
        .classed(css.wrapper_outer, true)
        .classed(css.noTransition, true);

      const wrapper = this.DOM.wrapper = this.DOM.wrapperOuter
        .append("div")
        .classed(css.wrapper, true)
        .classed(css.noTransition, true)
        .classed("vzb-dialog-scrollable", true);

      wrapper
        .on("click", (event) => {
          event.stopPropagation();
        });

      wrapper.append("div")
        .attr("class", css.close)
        .html(ICON_CLOSE)
        .on("click", (event) => {
          event.stopPropagation();
          this.toggle();
        })
        .select("svg")
        .attr("width", "0px")
        .attr("height", "0px")
        .attr("class", css.close + "-icon");

      wrapper.append("div")
        .classed(css.scaletypes, true)
        .append("span");

      wrapper.append("div")
        .classed(css.title, true)
        .append("span");

      wrapper.append("div")
        .classed(css.search_wrap, true)
        .append("input")
        .classed(css.search, true)
        .attr("type", "search")
        .attr("id", css.search);

      wrapper.on("mouseleave", () => {
        //if(_this.menuEntity.direction != MENU_VERTICAL) _this.menuEntity.closeAllChildren();
      });

      const datasources = this._getDataModels(this.root.model.config.dataSources);
      this.dsColorScaleLight = d3.scaleOrdinal().range(d3.schemePastel2).domain(datasources.map(m=>m.id));
      this.dsColorScaleDark = d3.scaleOrdinal().range(d3.schemeSet2).domain(datasources.map(m=>m.id));
    }

    draw() {
      this.localise = this.services.locale.auto();
      this.addReaction(this._prepareTags, true);

      this._updateLayoutProfile();
      this.addReaction(this._resize);
    }

    _prepareTags() {
      mobx.runInAction(() => {
        this.state.ownReadiness = STATUS.PENDING;
      });
      const datasources = this._getDataModels(this.root.model.config.dataSources);
      if (this.services.Vizabi.Vizabi.utils.combineStates(datasources.map(ds => ds.state)) == "fulfilled") {
        const localeId = this.services.locale.id;
        mobx.runInAction(() => {
          this.getTags(localeId)
            .then(tags => {
              return this._buildIndicatorsTree({
                tagsArray: tags,
                dataModels: this._getDataModels(this.root.model.config.dataSources)
              });})
            .then(this.updateView.bind(this))
            .then(() => {
              this._enableSearch();
              this.state.ownReadiness = STATUS.READY;
            });
        });
      }
    }

    _updateLayoutProfile(){
      this.services.layout.size;

      this.profileConstants = this.services.layout.getProfileConstants(PROFILE_CONSTANTS$1, PROFILE_CONSTANTS_FOR_PROJECTOR$1);
      this.height = this.element.node().clientHeight || 0;
      this.width = this.element.node().clientWidth || 0;
      if (!this.height || !this.width) return "TreeMenu _updateProfile() abort: container is too little or has display:none";
    }

    _getDatasetName(ds) {
      if (ds.reader.getDatasetInfo) {
        const meta = ds.reader.getDatasetInfo();
        return meta.name + (meta.version ? " " + meta.version : "");
      }
      return ds.id ?? "Unnamed datasource";
    }

    _getDataModels(dsConfig) {
      return Object.keys(dsConfig).map(dsName => this.services.Vizabi.Vizabi.stores.dataSources.get(dsName));
    }

    _nestAvailabilityByConcepts(availability){
      return availability.reduce((map, kv) => {
        const key = kv.value;
        const space = kv.key;
        if (!map.has(key)) map.set(key, {source: kv.source, spaces: new Set()});
        map.get(key).spaces.add(space);
        return map;
      }, new Map());
    }

    //returns concepts and their spaces (availbility keys), 
    //such that only strict superspaces, strict subspaces and matching spaces remain
    _conceptsCompatibleWithMarkerSpace(availabilityMapByConcepts, markerSpace){
      const filteredValueLookup = new Map();
      const markerSpaceSet = new Set(markerSpace);
      const intersect = (a,b) => a.filter(e => b.has(e));
      for (const [concept, {source, spaces}] of availabilityMapByConcepts) {  
        const filteredSpaces = [...spaces].filter(space => {
          const intersection = intersect(space, markerSpaceSet);
          return intersection.length == markerSpaceSet.size || intersection.length == space.length;
        });
        if (filteredSpaces.length) filteredValueLookup.set(concept, {source, spaces: filteredSpaces});
      }
      return filteredValueLookup;
    }

    _convertConceptMapToArray(conceptmap){
      return [...conceptmap].map(([concept, {source, spaces}]) => ({concept, source, spaces: [...spaces]}));
    }

    __observeDataSources() {
      return this._getDataModels(this.root.model.config.dataSources).map(ds => [ds.state, ds.config]);
    }

    _getAvailability(){
      const items = [];
      this._getDataModels(this.root.model.config.dataSources).forEach(ds => {
        ds.availability.data.forEach(kv => {
          items.push({ key: kv.key, value: ds.getConcept(kv.value), source: ds });
        });
      });
      return items;
    }

    /**
     * Return tag entities with name and parents from all data sources
     * @return {array} Array of tag objects
     */
    getTags(locale) {
      const TAG_KEY = "tag";
      const query = {
        select: {
          key: [TAG_KEY],
          value: []
        },
        language: locale,
        from: "entities"
      };

      const dataSources = this._getDataModels(this.root.model.config.dataSources).reduce((res, ds) => {
        res.set(ds, deepClone(query));
        return res;
      }, new Map());

      this._getAvailability()
        .filter(f => f.key.join() == TAG_KEY)
        .forEach(av => {
          dataSources.get(av.source).select.value.push(av.value.concept);
        });

      const dataSourcesWithTags = [...dataSources].filter(([ds, query]) => query.select.value.length);

      return dataSourcesWithTags.length ? Promise.all(dataSourcesWithTags
        .map(([ds, query]) => ds.query(query).then(result => {
          return [...result.forQueryKey().values()].map(r => {
            r.datasource = ds;
            return r;
          });
        })))
        .then(results => this.mergeResults(results, ["tag"])) // using merge because key-duplicates terribly slow down treemenu
        : Promise.resolve([]);    
    }

    /**
     * Merges query results. The first result is base, subsequent results are only added if key is not yet in end result.
     * @param  {array of arrays} results Array where each element is a result, each result is an array where each element is a row
     * @param  {array} key     primary key to each result
     * @return {array}         merged results
     */
    mergeResults(results, key) {
      const keys = new Map();
      results.forEach(result => {
        result.forEach(row => {
          const keyString = this.createKeyString(key, row);
          if (!keys.has(keyString))
            keys.set(keyString, row);
        });
      });
      return Array.from(keys.values());
    }

    createKeyString(key, row) {
      return key.map(concept => row[concept]).join(",");
    }

  }

  /*!
   * VIZABI ZOOMBUTTONLIST
   * Reusable zoombuttonlist component
   */

  //default existing buttons
  const class_active = "vzb-active";
  // var class_active_locked = "vzb-active-locked";
  // var class_hide_btn = "vzb-dialog-side-btn";
  // var class_unavailable = "vzb-unavailable";
  // var class_vzb_fullscreen = "vzb-force-fullscreen";
  // var class_container_fullscreen = "vzb-container-fullscreen";

  class ZoomButtonList extends BaseComponent {
    constructor(config) {

      super(config);
    } 

    setup() {

      this._available_buttons = {
        "arrow": {
          title: "buttons/cursorarrow",
          icon: "cursorArrow",
          func: this.toggleCursorMode.bind(this),
          required: true,
          statebind: "root.ui.chart.cursorMode",
          statebindfunc: this.setCursorMode.bind(this)
        },
        "plus": {
          title: "buttons/cursorplus",
          icon: "cursorPlus",
          func: this.toggleCursorMode.bind(this),
          required: true,
          statebind: "root.ui.chart.cursorMode",
          statebindfunc: this.setCursorMode.bind(this)
        },
        "minus": {
          title: "buttons/cursorminus",
          icon: "cursorMinus",
          func: this.toggleCursorMode.bind(this),
          required: true,
          statebind: "root.ui.chart.cursorMode",
          statebindfunc: this.setCursorMode.bind(this)
        },
        "hand": {
          title: "buttons/cursorhand",
          icon: "cursorHand",
          func: this.toggleCursorMode.bind(this),
          required: true,
          statebind: "root.ui.chart.cursorMode",
          statebindfunc: this.setCursorMode.bind(this)
        },
        "hundredpercent": {
          title: "buttons/hundredpercent",
          icon: "hundredPercent",
          func: this.toggleHundredPercent.bind(this),
          required: true
          // ,
          // statebind: "ui.chart.trails",
          // statebindfunc: this.setBubbleTrails.bind(this)
        }
      };  
    }

    draw() {

      this.localise = this.services.locale.auto();

      Object.keys(this._available_buttons).forEach(buttonId => {
        const button = this._available_buttons[buttonId];
        if (button && button.statebind) {
          this.addReaction(() => {
            button.statebindfunc(buttonId, getProp(this, button.statebind.split(".")));
          });
        }
      });

      this._addButtons(Object.keys(this._available_buttons), []);

    }

    /*
     * adds buttons configuration to the components and template_data
     * @param {Array} button_list list of buttons to be added
     */
    _addButtons(button_list, button_expand) {
      const _this = this;
      this._components_config = [];
      const details_btns = [];
      if (!button_list.length) return;
      //add a component for each button
      for (let i = 0; i < button_list.length; i++) {

        const btn = button_list[i];
        const btn_config = this._available_buttons[btn];

        //add template data
        const d = (btn_config) ? btn : "_default";
        const details_btn = clone(this._available_buttons[d]);
        if (d == "_default") {
          details_btn.title = "buttons/" + btn;
        }
        details_btn.id = btn;
        details_btn.icon = iconset["ICON_" + details_btn.icon.toUpperCase()];
        details_btns.push(details_btn);
      }

      const t = this.localise;

      this.element.selectAll("button").data(details_btns)
        .enter().append("button")
        .attr("class", d => {
          let cls = "vzb-buttonlist-btn";
          if (button_expand.length > 0) {
            if (button_expand.indexOf(d.id) > -1) {
              cls += " vzb-dialog-side-btn";
            }
          }

          return cls;
        })
        .attr("data-btn", d => d.id)
        .html(btn => "<span class='vzb-buttonlist-btn-icon fa'>" +
            btn.icon + "</span><span class='vzb-buttonlist-btn-title'>" +
            t(btn.title) + "</span>");

      const buttons = this.element.selectAll(".vzb-buttonlist-btn");

      //clicking the button
      buttons.on("click", function(event, d) {

        event.preventDefault();
        event.stopPropagation();

        _this.proceedClick(d.id);
      });
      
    }

    proceedClick(id) {
      const _this = this;
      const btn = _this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");
      const classes = btn.attr("class");
      const btn_config = _this._available_buttons[id];

      if (btn_config && btn_config.func) {
        btn_config.func(id);
      } else {
        const btn_active = classes.indexOf(class_active) === -1;

        btn.classed(class_active, btn_active);
        const evt = {};
        evt["id"] = id;
        evt["active"] = btn_active;
        _this.trigger("click", evt);
      }
    }

    setButtonActive(id, boolActive) {
      const btn = this.element.selectAll(".vzb-buttonlist-btn[data-btn='" + id + "']");

      btn.classed(class_active, boolActive);
    }

    toggleCursorMode(id) {
      const value = id;
      this.root.ui.chart.cursorMode = value;
    }

    setCursorMode(id, value) {
      //const value = this.model.ui.cursorMode ? this.model.ui.cursorMode : "arrow";
      this.element.selectAll(".vzb-buttonlist-btn")
        .classed(class_active, d => d.id == value);
    }

    toggleHundredPercent() {
      this.root.element.dispatch("custom-resetZoom");
    }

  }

  const CONFIG = {
    triangleWidth: 10,
    triangleHeight: 10,
    height: 31,
    lineWidth: 10,
    domain: [1, 2, 3, 4, 5, 6],
    range: [1200, 900, 450, 200, 150, 100]
  };

  class SteppedSlider extends BaseComponent {

    constructor(config) {
      config.template = `
      <div class="vzb-stepped-slider">
        <svg>
          <g class="vzb-stepped-slider-triangle"></g>
          <g class="vzb-stepped-slider-axis"></g>
        </svg>
      </div>`;

      super(config);
    }

    setup() {
      //this.setDelay = throttle(this.setDelay, 50);
      this.config = deepExtend(deepExtend({}, CONFIG), this.config);
      this.config.height -= this.config.triangleHeight / 2;
    
      const {
        domain,
        range,
        height
      } = this.config;

      this.DOM = {
        svg: this.element.select("svg"),
        slide: this.element.select(".vzb-stepped-slider-triangle")
      };

      this.axisScale = d3.scaleLog()
        .domain(d3.extent(domain))
        .range([height, 0]);

      this.delayScale = d3.scaleLinear()
        .domain(domain)
        .range(range);

      this.initTriangle();
      this.initAxis();

    }

    draw() {
      this.addReaction(this.redraw);
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame
      };
    }

    initAxis() {
      const {
        lineWidth,
        triangleWidth,
        triangleHeight,
        height
      } = this.config;

      const axis = d3.axisLeft()
        .scale(this.axisScale)
        .tickFormat(() => "")
        .tickSizeInner(lineWidth)
        .tickSizeOuter(0);

      const tx = triangleWidth + lineWidth / 2;
      const ty = triangleHeight / 2;
      this.DOM.svg
        .on("mousedown", event => {
          const y = Math.max(0, Math.min(event.offsetY - ty, height));

          this.setDelay(Math.round(this.delayScale(this.axisScale.invert(y))), true, true);
        })
        .select(".vzb-stepped-slider-axis")
        .attr("transform", `translate(${tx}, ${ty})`)
        .call(axis);

      this.drag = d3.drag()
        .on("drag", event => {
          const { translateY } = transform(this.DOM.slide.node());
          const y = Math.max(0, Math.min(event.dy + translateY, height));

          this.setDelay(Math.round(this.delayScale(this.axisScale.invert(y))), true);
          //this.redraw(y);
        })
        .on("end", () => {
          this.setDelay(this.MDL.frame.speed);
        });

      this.DOM.svg.call(this.drag);
    }

    initTriangle() {
      this.DOM.slide
        .append("g")
        .append("path")
        .attr("d", this.getTrianglePath());
    }

    getTrianglePath() {
      const {
        triangleHeight,
        triangleWidth
      } = this.config;

      return `M ${triangleWidth},${triangleHeight / 2} 0,${triangleHeight} 0,0 z`;
    }

    redraw() {
      const y = this.axisScale(this.delayScale.invert(this.MDL.frame.speed));
      this.DOM.slide.attr("transform", `translate(0, ${y})`);
    }

    setDelay(value) {
      this.MDL.frame.setSpeed(value);
    }

  }

  const decorated$5 = mobx.decorate(SteppedSlider, {
    "MDL": mobx.computed
  });

  const HTML_ICON_PLAY = 
    `<svg class="vzb-icon vzb-icon-play" viewBox="3 3 42 42"
  xmlns="http://www.w3.org/2000/svg">
  <path xmlns="http://www.w3.org/2000/svg" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 29V15l12 9-12 9z"/>
  </svg>`;
  const HTML_ICON_PAUSE =
    `<svg class="vzb-icon vzb-icon-pause" viewBox="3 3 42 42"
  xmlns="http://www.w3.org/2000/svg">
  <path xmlns="http://www.w3.org/2000/svg" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-2 28h-4V16h4v16zm8 0h-4V16h4v16z"/>
  </svg>`;
  const HTML_ICON_LOADING =
    `<div class='vzb-loader'></div>`;

  class PlayButton extends BaseComponent {

    constructor(config) {
      config.template = 
        `<button class="vzb-ts-btn">
        <div class='vzb-loader'></div>
      </button>`;
      super(config);
    }

    setup() {
      this.buttonEl = this.element.select(".vzb-ts-btn")
        .on("click", () => {this.model.encoding.frame.togglePlaying();});
    }

    draw() {
      this.buttonEl.html(this.model.encoding.frame.playing ? HTML_ICON_PAUSE : HTML_ICON_PLAY);
    }

    loading() {
      this.buttonEl.html(HTML_ICON_LOADING);
    }
  }

  const PROFILE_CONSTANTS = {
    SMALL: {
      margin: {
        top: 7,
        right: 25,
        bottom: 10,
        left: 60
      },
      radius: 8,
      label_spacing: 5
    },
    MEDIUM: {
      margin: {
        top: 0,
        right: 25,
        bottom: 10,
        left: 55
      },
      radius: 9,
      label_spacing: 5
    },
    LARGE: {
      margin: {
        top: -5,
        right: 25,
        bottom: 10,
        left: 80
      },
      radius: 11,
      label_spacing: 8
    }
  };


  const PROFILE_CONSTANTS_FOR_PROJECTOR = {
    MEDIUM: {
      margin: {
        top: 9,
        right: 25,
        bottom: 10,
        left: 55
      }
    },
    LARGE: {
      margin: {
        top: -5,
        right: 25,
        bottom: 10,
        left: 80
      }
    }
  };

  //constants
  const class_playing = "vzb-playing";
  const class_loading = "vzb-ts-loading";
  const class_hide_play = "vzb-ts-hide-play-button";
  const class_dragging = "vzb-ts-dragging";
  const class_axis_aligned = "vzb-ts-axis-aligned";
  const class_show_value = "vzb-ts-show-value";
  const class_show_value_when_drag_play = "vzb-ts-show-value-when-drag-play";

  class TimeSlider extends BaseComponent {

    constructor(config){
      config.subcomponents = [{
        type: PlayButton,
        placeholder: ".vzb-ts-btns",
        //model: this.model
      }];

      config.template = `
      <div class="vzb-ts-slider">
        <svg class="vzb-ts-slider-svg">
          <g>
            <g class="vzb-ts-slider-axis"></g>
            <g class="vzb-ts-slider-progress"></g>
            <g class="vzb-ts-slider-select"></g>
            <line class="vzb-ts-slider-forecastboundary"></line>
            <circle class="vzb-ts-slider-handle"></circle>
            <text class="vzb-ts-slider-value"></text>
            <line class="vzb-ts-slider-slide"></line>
          </g>
        </svg>      
      </div>
      <div class="vzb-ts-btns"></div>
    `;
      super(config);
    }

    setup() {
      this.DOM = {
        //slider: this.element.select(".vzb-ts-slider")
        slider_outer: this.element.select(".vzb-ts-slider-svg"),
        axis: this.element.select(".vzb-ts-slider-axis"),
        select: this.element.select(".vzb-ts-slider-select"),
        progressBar: this.element.select(".vzb-ts-slider-progress"),
        slide: this.element.select(".vzb-ts-slider-slide"),
        forecastBoundary: this.element.select(".vzb-ts-slider-forecastboundary"),
        handle: this.element.select(".vzb-ts-slider-handle"),
        valueText: this.element.select(".vzb-ts-slider-value")
      };

      this.DOM.slider = this.DOM.slider_outer.select("g");

      //Axis
      this.xAxis = axisSmart$1("bottom");

      const { valueText, slider, slide, slider_outer } = this.DOM;
      //Value
      valueText.classed("stroke", true);
      if (!slider.style("paint-order").length) {
        slider.insert("text", ".vzb-ts-slider-value")
          .attr("class", "vzb-ts-slider-value stroke");

        valueText.classed("stroke", false);
      }
      this.DOM.valueText = this.element.selectAll(".vzb-ts-slider-value")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.7em");

      //Slide
      slide.call(d3.drag()
        //.on("start.interrupt", function() { _this.slide.interrupt(); })
        .on("start drag", event => this._brushed(event))
        .on("end", event => this._brushedEnd(event))
      );

      slider_outer.on("mousewheel", (event) => {
        //do nothing and dont pass the event on if we are currently dragging the slider
        if (this.ui.dragging) {
          event.stopPropagation();
          event.preventDefault();
          event.returnValue = false;
          return false;
        }
      });

      this.DOM.forecastBoundary.on("click", () => {
        this.MDL.frame.setValueAndStop(this.root.ui.chart.endBeforeForecast);
      });
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame
      };
    }

    draw() {
      this.localise = this.services.locale.auto(this.MDL.frame.interval);
      
      this.element.classed(class_loading, false);

      if (this._updateLayoutProfile()) return; //return if exists with error

      this.addReaction(this._configEndBeforeForecast);
      this.addReaction(this._adjustFrameScaleDomainConfig);
      this.addReaction(this._updateSize);
      this.addReaction(this._redrawForecast);
      this.addReaction(this._optionClasses);
      this.addReaction(this._processForecast);
      this.addReaction(this._setHandle);

    }

    // _changeLimits() {
    //   const minValue = this.model.time.start;
    //   const maxValue = this.model.time.end;
    //   //scale
    //   this.xScale.domain([minValue, maxValue]);
    //   //axis
    //   this.xAxis.tickValues([minValue, maxValue])
    //     .tickFormat(this.model.time.getFormatter());
    // }

    _updateLayoutProfile() {
      this.services.layout.size;

      this.profileConstants = this.services.layout.getProfileConstants(PROFILE_CONSTANTS, PROFILE_CONSTANTS_FOR_PROJECTOR);
      this.height = this.element.node().clientHeight || 0;
      this.width = this.element.node().clientWidth || 0;
      if (!this.height || !this.width) return warn("Timeslider _updateProfile() abort: container is too little or has display:none");
    }

    get xScale() {
      return this.MDL.frame.scale.d3Scale;
    }

    _configEndBeforeForecast() {
      const frame = this.MDL.frame;
      const { offset, floor } = this.services.Vizabi.Vizabi.utils.interval(frame.data.concept);
      if (!this.root.ui.chart.endBeforeForecast) {
        const stepBack = floor(offset(new Date(), -1));
        this.root.ui.chart.endBeforeForecast = frame.formatValue(stepBack);
      }
      this.firstForecastFrame = offset(frame.parseValue(this.root.ui.chart.endBeforeForecast), +1);
    }

    _adjustFrameScaleDomainConfig() {
      const frame = this.MDL.frame;
      if (this.root.ui.chart.showForecast) {
        delete frame.scale.config.domain;
      } else {
        const lastNonForecast = frame.parseValue(this.root.ui.chart.endBeforeForecast);
        if (lastNonForecast && frame.data.domain[1] > lastNonForecast)
          frame.scale.config.domain = [ frame.data.domain[0], lastNonForecast ]
            .map(v => frame.formatValue(v));
        else 
          delete frame.scale.config.domain;
      }
    }

    _processForecast() {
      const frame = this.MDL.frame;
      const lastNonForecast = frame.parseValue(this.root.ui.chart.endBeforeForecast);
      const forecastPauseSetting = this.root.ui.chart.pauseBeforeForecast;
      const equals = this.services.Vizabi.Vizabi.utils.equals;

      // stop when 
      // - first forecast value is reached, then set to previous year. This way animation finishes.
      // - previous frame was reached while playing (= allowed)
      if (frame.playing
          && forecastPauseSetting 
          && equals(frame.value, this.firstForecastFrame) 
          && this.allowForecastPause
      ) {
        frame.setValueAndStop(lastNonForecast);
      }

      // set up pause if we're playing and we're on the last frame before pause (i.e. the frame we actually want to pause on)
      this.allowForecastPause = frame.playing && equals(frame.value, lastNonForecast);
    }

    _redrawForecast() {
      this.services.layout.size;

      const endBeforeForecast = this.MDL.frame.parseValue(this.root.ui.chart.endBeforeForecast);
      const forecastIsOn = this.root.ui.chart.showForecast && (this.MDL.frame.scale.domain[1] > endBeforeForecast);
      this.DOM.forecastBoundary
        .classed("vzb-hidden", !forecastIsOn);

      if (forecastIsOn) {
        const radius = this.profileConstants.radius;

        this.DOM.forecastBoundary
          .attr("transform", "translate(0," + this.height / 2 + ")")
          .attr("x1", this.xScale(endBeforeForecast) - radius / 2)
          .attr("x2", this.xScale(endBeforeForecast) + radius / 2)
          .attr("y1", radius)
          .attr("y2", radius);
      }

    }

    /**
     * Executes everytime the container or vizabi is resized
     * Ideally,it contains only operations related to size
     */
    _updateSize() {
      this.services.layout.size;

      const {
        margin,
        radius,
        label_spacing
      } = this.profileConstants;

      const {
        slider,
        slide,
        axis,
        handle,
        select,
        progressBar
      } = this.DOM;

      // const slider_w = parseInt(this.slider_outer.style("width"), 10) || 0;
      // const slider_h = parseInt(this.slider_outer.style("height"), 10) || 0;

      // if (!slider_h || !slider_w) return utils.warn("time slider resize() aborted because element is too small or has display:none");
      const marginRight = this.services.layout.hGrid.length ? 
        this.width - this.services.layout.hGrid[0]
        : margin.right;
      this.sliderWidth = this.width - margin.left - marginRight;
      this.sliderHeight = this.height - margin.bottom - margin.top;

      //translate according to margins
      slider.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.MDL.frame.scale.config.range = [0, this.sliderWidth];

      slide
        .attr("transform", "translate(0," + this.sliderHeight / 2 + ")")
        .attr("x1", this.xScale.range()[0])
        .attr("x2", this.xScale.range()[1])
        .style("stroke-width", radius * 2 + "px");

      //adjust axis with scale
      this.xAxis.scale(this.xScale)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(label_spacing)
        .tickSizeMinor(0, 0);

      axis.attr("transform", "translate(0," + this.sliderHeight / 2 + ")")
        .call(this.xAxis);

      select.attr("transform", "translate(0," + this.sliderHeight / 2 + ")");
      progressBar.attr("transform", "translate(0," + this.sliderHeight / 2 + ")");

      //size of handle
      handle.attr("transform", "translate(0," + this.sliderHeight / 2 + ")")
        .attr("r", radius);

      //this.sliderWidth = slider.node().getBoundingClientRect().width;

      // this.resizeSelectedLimiters();
      // this._resizeProgressBar();
      // this._setHandle();

    }

    /**
     * Returns width of slider text value.
     * Parameters in this function needed for memoize function, so they are not redundant.
     */
    _getValueWidth() {
      return this.valueText.node().getBoundingClientRect().width;
    }

    _brushed(event) {
      const { frame } = this.MDL;
      const { handle, valueText } = this.DOM;

      if (frame.playing) {
        frame.stopPlaying();
      }

      this.ui.dragging = true;
      this.element.classed(class_dragging, this.ui.dragging);

      let value;// = _this.brush.extent()[0];
      //var value = d3.brushSelection(_this.slide.node());

      //if(!value) return;

      //set brushed properties

      if (event.sourceEvent) {
        // Prevent window scrolling on cursor drag in Chrome/Chromium.
        event.sourceEvent.preventDefault();

        //_this.model.time.dragStart();
        let posX = event.x;
        const maxPosX = this.sliderWidth;

        const endBeforeForecast = frame.parseValue(this.root.ui.chart.endBeforeForecast);
        const forecastBoundaryIsOn = this.root.ui.chart.showForecast && (frame.data.domain.at(-1) > endBeforeForecast);
        const forecastBoundaryPos = this.xScale(endBeforeForecast);
        const snappyMargin = 0.5 * handle.attr("r");

        if (posX > maxPosX) {
          posX = maxPosX;
        } else if (posX < 0) {
          posX = 0;
        } else if ((Math.abs(posX - forecastBoundaryPos) < snappyMargin) && event.sourceEvent.shiftKey && forecastBoundaryIsOn) {
          posX = forecastBoundaryPos;
        }

        value = this.xScale.invert(posX);
        //set handle position
        handle.attr("cx", posX);
        valueText.attr("transform", "translate(" + posX + "," + (this.sliderHeight / 2) + ")");
        valueText.text(this.localise(value));
      }

      //set time according to dragged position
      if (value - this.MDL.frame.value !== 0) {
        this._setTime(value);
      }
    }

    /**
     * Gets brushedEnd function to be executed when dragging ends
     * @returns {Function} brushedEnd function
     */
    _brushedEnd() {
      this.element.classed(class_dragging, this.ui.dragging);
      this.MDL.frame.snap();
      this.ui.dragging = false;
    }

    _setHandle() {
      this.services.layout.size;
      this.services.layout.hGrid;

      const { value, speed, playing } = this.MDL.frame;

      if (this.ui.dragging || this._isDomainNotVeryGood()) return;
      const { handle, valueText } = this.DOM; 
    
      //this.slide.call(this.brush.extent([value, value]));
      const newPos = this.xScale(value);
      //this.brush.move(this.slide, [newPos, newPos])

      //    this.valueText.text(this.model.time.formatDate(value));

      //    var old_pos = this.handle.attr("cx");
      //var newPos = this.xScale(value);
      //if (_this.prevPosition == null) _this.prevPosition = newPos;
      //const delayAnimations = newPos > _this.prevPosition ? this.model.time.delayAnimations : 0;
      const delayAnimations = speed;
      if (playing) {
        handle//.attr("cx", _this.prevPosition)
          .transition()
          .duration(delayAnimations)
          .ease(d3.easeLinear)
          .attr("cx", newPos);

        valueText//.attr("transform", "translate(" + _this.prevPosition + "," + (this.height / 2) + ")")
          .transition("text")
          .delay(delayAnimations)
          .text(this.localise(value));
        valueText
          .transition()
          .duration(delayAnimations)
          .ease(d3.easeLinear)
          .attr("transform", "translate(" + newPos + "," + (this.sliderHeight / 2) + ")");
      } else {
        handle
          //cancel active transition
          .interrupt()
          .attr("cx", newPos);

        valueText
          //cancel active transition
          .interrupt()
          .interrupt("text")
          .transition("text");
        valueText
          .attr("transform", "translate(" + newPos + "," + (this.sliderHeight / 2) + ")")
          .text(this.localise(value));
      }
      //_this.prevPosition = newPos;

    }

    /**
     * Sets the current time model to time
     * @param {number} time The time
     */
    _setTime(time) {
      //update state
      const _this = this;
      const frameRate = 50;

      //avoid updating more than once in "frameRate"
      var now = new Date();
      if (this._updTime != null && now - this._updTime < frameRate) return;
      this._updTime = now;
      //const persistent = !this.model.time.dragging && !this.model.time.playing;
      //_this.model.time.getModelObject("value").set(time, false, persistent); // non persistent
      _this.MDL.frame.setValue(time);

    }

    /**
     * Applies some classes to the element according to options
     */
    _optionClasses() {
      //show/hide classes
      const { frame } = this.MDL;

      const show_ticks = this.ui.show_ticks;
      const show_value = this.ui.show_value;
      const show_value_when_drag_play = this.ui.show_value_when_drag_play;
      const axis_aligned = this.ui.axis_aligned;
      const show_play = (this.ui.show_button) && (frame.playable);

      this.xAxis.labelerOptions({
        scaleType: "time",
        removeAllLabels: !show_ticks,
        limitMaxTickNumber: 3,
        showOuter: false,
        toolMargin: {
          left: 10,
          right: 10,
          top: 0,
          bottom: 30
        },
        fitIntoScale: "optimistic"
      });
      this.DOM.axis
        .classed("vzb-hidden", this.services.layout.projector)
        .call(this.xAxis);

      this.element.classed("vzb-ts-disabled", this._isDomainNotVeryGood());
      this.element.classed(class_hide_play, !show_play);
      this.element.classed(class_playing, frame.playing);
      this.element.classed(class_show_value, show_value);
      this.element.classed(class_show_value_when_drag_play, show_value_when_drag_play);
      this.element.classed(class_axis_aligned, axis_aligned);
    }

    _isDomainNotVeryGood(){
      const domain = this.xScale.domain();
      //domain not available
      if(!domain || domain.length !== 2) return true;
      //domain inverted or shrunk to one point
      if(domain[1] - domain[0] <= 0) return true;
      //domain sucks in some other way
      if(domain.some(s => s == null || isNaN(s))) return true;
      return false;
    }
  }

  TimeSlider.DEFAULT_UI = {
    show_ticks: false,
    show_value: false,
    show_value_when_drag_play: true,
    axis_aligned: false,
    show_button: true,
    dragging: false
  };

  const decorated$4 = mobx.decorate(TimeSlider, {
    "xScale": mobx.computed,
    "MDL": mobx.computed
  });

  /*!
   * VIZABI BUBBLE SIZE slider
   * Reusable bubble size slider
   */

  const OPTIONS$2 = {
    THUMB_HEIGHT: 17,
    THUMB_STROKE_WIDTH: 3,
    domain: null,
    suppressInput: null,
    snapValue: null
  };

  class SingleHandleSlider extends decorated$b {


    setup(_options) {
      this.type = this.type || "singlehandleslider";
      
      const options = extend(extend({}, OPTIONS$2), _options || {});

      super.setup(options);

      if (this.options.domain) this._setDomain(this.options.domain);

      this.DOM.slider.selectAll(".w").classed("vzb-hidden", true);
      this.DOM.slider.select(".selection").classed("vzb-hidden", true);

      this.DOM.slider.select(".overlay")
        .lower()
        .style("stroke-opacity", "0")
        .style("stroke-width", (this.options.THUMB_HEIGHT * 0.5) + "px")
        .attr("rx", this.options.BAR_WIDTH * 0.5)
        .attr("ry", this.options.BAR_WIDTH * 0.5);

      this.DOM.slider.selectAll(".vzb-slider-thumb-badge")
        .style("stroke-width", this.options.THUMB_STROKE_WIDTH + "px");
    }

    _setDomain(domain){
      this.options.EXTENT_MIN = this.options.domain[0];
      this.options.EXTENT_MAX = this.options.domain[1];
      this.rescaler.domain(domain);
    }

    _createThumbs(thumbsEl) {
      const halfThumbHeight = this.options.THUMB_HEIGHT * 0.5;

      const thumbArc = d3.arc()
        .outerRadius(halfThumbHeight)
        .startAngle(0)
        .endAngle(2 * Math.PI);

      thumbsEl
        .attr("transform", "translate(" + (halfThumbHeight + this.options.THUMB_STROKE_WIDTH * 0.5) + "," + (halfThumbHeight + this.options.THUMB_STROKE_WIDTH * 0.5) + ")")
        .append("path")
        .attr("d", thumbArc);
    }

    _getBrushEventListeners() {
      const _this = this;
      const _superListeners = super._getBrushEventListeners();

      return {
        start: _superListeners.start,
        brush: (event, d) => {
          if (_this.nonBrushChange || !event.sourceEvent) return;
          if (!_this.options.suppressInput) {
            _superListeners.brush(event, d);
          } else {
            _this._snap(event.selection);
          }
        },
        end: (event) => {
          if (_this.nonBrushChange || !event.sourceEvent) return;
          if (_this.options.snapValue) {
            this._snap(event.selection);
          }
          _this._setFromExtent(true, true); // force a persistent change
        }
      };
    }

    _snap(selection) {
      let value = this.rescaler.invert(this._extentToValue(selection));
      const domain = this.rescaler.domain();
      const ascendingDomain = domain[domain.length - 1] > domain[0];
      const next = d3.bisector(d3[ascendingDomain ? "ascending" : "descending"]).left(domain, value) || 1;
      value = (ascendingDomain ? 1 : -1) * ((value - domain[next - 1]) - (domain[next] - value)) > 0 ? domain[next] : domain[next - 1];
      this._moveBrush(this._valueToExtent(value));
    }

    _getHandleSize() {
      return this.options.THUMB_HEIGHT + this.options.THUMB_STROKE_WIDTH;
    }

    _getPadding() {
      const barWidth = this.options.BAR_WIDTH;
      const thumbHeight = this.options.THUMB_HEIGHT;
      const padding = super._getPadding();

      padding.top = (thumbHeight + this.options.THUMB_STROKE_WIDTH) * 0.5;
      padding.bottom = (thumbHeight + this.options.THUMB_STROKE_WIDTH) * 0.5 - barWidth;
      
      return padding;
    }

    _updateSize() {
      super._updateSize();

      const componentWidth = this._getComponentWidth();
      this.rescaler.range(d3.range(0, componentWidth || 1, (componentWidth / (this.rescaler.domain().length - 1)) || 1).concat([componentWidth]));
    }

    _valueToExtent(value) {
      return [this.rescaler.domain()[0], value];
    }

    _extentToValue(extent) {
      return extent[1];
    }

    _setModel(value, force, persistent) {
      if (this.options.suppressInput) {
        const _value = this._extentToValue(value).toFixed(this.options.ROUND_DIGITS);
        if (_value == this.MDL.model[this.value]) return;
      }
      super._setModel(value, force, persistent);
    }

  }

  /*!
   * VIZABI BUBBLE SIZE slider
   * Reusable bubble size slider
   */

  const OPTIONS$1 = {
    TEXT_PARAMS: { TOP: 11, LEFT: 10, MAX_WIDTH: 42, MAX_HEIGHT: 16 },
    THUMB_STROKE_WIDTH: 4,
    labelsValue: "domain",

    PROFILE_CONSTANTS: {
      SMALL: {
      },
      MEDIUM: {
      },
      LARGE: {
      }
    }
  };

  class BubbleSize extends decorated$b {
    setup(_options) {
      const options = deepExtend(deepExtend({}, OPTIONS$1), _options || {});

      super.setup(options);

      this.showArcs = this.options.showArcs;

      if (this.showArcs) {
        this.DOM.sliderArcs = this.DOM.slider.selectAll(".vzb-bs-slider-thumb-arc").data([0, 0]).enter()
          .append("path")
          .attr("class", "vzb-bs-slider-thumb-arc");
      }

      this.DOM.sliderLabelsWrapper = this.DOM.slider.append("g");
      this.DOM.sliderLabels = this.DOM.sliderLabelsWrapper.selectAll("text").data([0, 0]).enter()
        .append("text")
        .attr("class", "vzb-bs-slider-thumb-label")
        .attr("text-anchor", (d, i) => i ? "start" : "end")
        .attr("dy", (d, i) => i ? "-0.7em" : "1.4em");
    }

    draw() { 
      super.draw();
    
      this.addReaction(this._setLabelsText);
    }

    _getPadding() {
      const padding = super._getPadding();
      padding.bottom = this.options.BAR_WIDTH + this.options.TEXT_PARAMS.MAX_HEIGHT;
      return padding;
    }

    _updateThumbs(extent) {
      this._updateArcs(extent);
      this._updateLabels(extent);
    }

    _updateArcs(s) {
      if (!this.showArcs) return;
      const _this = this;
      const valueArc = d3.arc()
        .outerRadius(d => _this.rescaler(d) * 0.5)
        .innerRadius(d => _this.rescaler(d) * 0.5)
        .startAngle(-Math.PI * 0.5)
        .endAngle(Math.PI * 0.5);
      this.DOM.sliderArcs.data(s)
        .attr("d", valueArc)
        .attr("transform", d => "translate(" + (_this.rescaler(d) * 0.5) + ",0)");
    }

    _updateLabels(s) {
      if (s) { this.DOM.sliderLabels.data(s); }
      this.DOM.sliderLabels
        .attr("transform", (d, i) => {
          const textMargin = { v: this.options.TEXT_PARAMS.TOP, h: this.options.TEXT_PARAMS.LEFT };
          const dX = textMargin.h * (i ? 0.5 : -1.0) + this.rescaler(d);
          const dY = 0;
          return "translate(" + ((this.services.locale.isRTL() ? -1 : 1) * dX) + "," + (dY) + ")";
        });
    }

    _setLabelsText() {
      let texts = [];

      if (this.MDL.model.data.isConstant) {
        texts = ["", ""];
      } else {
        texts = this.MDL.model[this.options.labelsValue].map(this.localise);
      }

      this.DOM.sliderLabels.text((d, i) => texts[i]);
    }

    _getMinMaxBubbleRadius() {
      if(this.root.ui.minMaxRadius) return this.root.ui.minMaxRadius;
      const range = this.model.encoding.size.scale.range;
      const min = areaToRadius(d3.min(range));
      const max = areaToRadius(d3.max(range));
      return { min, max };
    }

    _updateSize() {
      const minMaxBubbleRadius = this._getMinMaxBubbleRadius();
      const padding = this.element.node().offsetWidth - minMaxBubbleRadius.max * 2;
      this.padding.top = minMaxBubbleRadius.max + this.options.BAR_WIDTH,
      this.padding.left = padding * 0.5;
      this.padding.right = padding * 0.5;

      super._updateSize();

      this.DOM.sliderLabelsWrapper
        .attr("transform", this.isRTL ? "scale(-1,1)" : null);
      this.DOM.sliderLabels
        .attr("text-anchor", (d, i) => (this.isRTL ? !i : i) ? "start" : "end");
    }

    _updateRescaler() {
      const minMaxBubbleRadius = this._getMinMaxBubbleRadius();
      this.rescaler.range([minMaxBubbleRadius.min * 2, minMaxBubbleRadius.max * 2]);
    }

    _getComponentWidth() {
      return this._getMinMaxBubbleRadius().max * 2;
    }

  }

  /*!
   * VIZABI BUBBLE SIZE slider
   * Reusable bubble size slider
   */

  const OPTIONS = {
    propertyName: "LabelTextSize",

    PROFILE_CONSTANTS: {
      SMALL: {
        minLabelTextSize: 7,
        maxLabelTextSize: 21,
        defaultLabelTextSize: 12
      },
      MEDIUM: {
        minLabelTextSize: 7,
        maxLabelTextSize: 30,
        defaultLabelTextSize: 15
      },
      LARGE: {
        minLabelTextSize: 6,
        maxLabelTextSize: 48,
        defaultLabelTextSize: 20
      }
    }
  };

  class SizeSlider extends decorated$b {
    setup(_options) {
      const options = deepExtend(deepExtend({}, OPTIONS), _options || {});

      super.setup(options);

      const barWidth = this.options.BAR_WIDTH;

      this.DOM.sliderLabelsWrapper = this.DOM.slider.append("g");
      this.DOM.sliderLabelsWrapper.selectAll("text").data([0, 0]).enter()
        .append("text")
        .attr("class", (d, i) => "vzb-szs-slider-thumb-label " + (i ? "e" : "w"))
        .attr("dy", (-barWidth * 1.25) + "px");

      this.DOM.sliderLabels = this.DOM.slider.selectAll("text.vzb-szs-slider-thumb-label");

      this.propertyScale = d3.scaleLinear()
        .domain([this.options.EXTENT_MIN, this.options.EXTENT_MAX])
        .clamp(true);

    }

    draw() { 
      super.draw();

      if (this.MDL.model.data.isConstant) {
        this.DOM.slider.selectAll(".w").classed("vzb-hidden", true);
        this.DOM.slider.select(".selection").classed("vzb-hidden", true);
        this.DOM.slider.select(".overlay").classed("vzb-pointerevents-none", true);
      } else {
        this.DOM.slider.selectAll(".w").classed("vzb-hidden", false);
        this.DOM.slider.select(".selection").classed("vzb-hidden", false);
        this.DOM.slider.select(".overlay").classed("vzb-pointerevents-none", false);
      }

      this.addReaction(this._setLabelsText);
    }

    _updateThumbs(extent) {
      this._updateLabels(extent);
    }

    _updateLabels(s) {
      if (s) { this.DOM.sliderLabels.data(s); }
      this.DOM.sliderLabels
        .attr("transform", (d, i) => {
          const dX = this.rescaler(i);
          const dY = 0;
          return "translate(" + ((this.services.locale.isRTL() ? -1 : 1) * dX) + "," + (dY) + ")";
        })
        .attr("font-size", (d) => this.propertyScale(d));
      if (this.MDL.model.data.isConstant)
        this.DOM.sliderLabels.text(d => ~~(this.propertyScale(d)) + (this.localise(this.options.constantUnit) || ""));
    }

    _setLabelsText() {
      const domain = this.MDL.model.domain;
      const texts = [domain[0], domain[domain.length - 1]].map(this.localise);

      if (this.MDL.model.data.isConstant) return;

      this.DOM.sliderLabels.text((d, i) => texts[i]);
    }

    _getMinMaxDefaultPropertyValues() {
      const propertyName = this.options.propertyName;

      return {
        min: this.profileConstants["min" + propertyName],
        max: this.profileConstants["max" + propertyName],
        default: this.profileConstants["default" + propertyName],
      };
    }

    _updateSize() {
      const propertyValues = this._getMinMaxDefaultPropertyValues();

      this.padding.top = propertyValues.max + this.options.BAR_WIDTH * 1.25;
      this.propertyScale.range([propertyValues.min, propertyValues.max]);

      super._updateSize();

      const isRTL = this.services.locale.isRTL();
      this.DOM.sliderLabelsWrapper
        .attr("transform", isRTL ? "scale(-1,1)" : null);
      this.DOM.sliderLabels
        .attr("text-anchor", (d, i) => (isRTL ? i : !i) ? "start" : "end");
    }

    _valueToExtent(value) {
      if (this.MDL.model.data.isConstant && value[1] === null) {
        return super._valueToExtent([value[0], this.propertyScale.invert(this._getMinMaxDefaultPropertyValues().default)]);
      }
      return super._valueToExtent(value);
    }

  }

  // var class_active_locked = "vzb-active-locked";
  // var class_hide_btn = "vzb-dialog-side-btn";
  // var class_unavailable = "vzb-unavailable";
  // var class_vzb_fullscreen = "vzb-force-fullscreen";
  // var class_container_fullscreen = "vzb-container-fullscreen";


  class OptionsButtonList extends ButtonList {
    setup() {
      super.setup();
      Object.keys(this._available_buttons).forEach(buttonId => {
        const button = this._available_buttons[buttonId];
        button.required = !button.required;
      });

    }

    draw() {
      super.draw();

      const buttonList = this.root.findChild({ name: "buttons" });
      buttonList.element.on("custom-togglebuttons", (event) => {
        const { hiddenButtons } = event.detail;
        this.element.selectAll(".vzb-buttonlist-btn")
          .style("display", d => hiddenButtons.indexOf(d.id) == -1 ? "none" : "");
      });
    }

    _toggleButtons() {

    }
  }

  /*
   * About dialog
   */
  function formatVersion(version){
    return version || "N/A";
  }

  function formatBuild(timestamp){
    if (!timestamp) return "N/A";
    return d3.utcFormat("%Y-%m-%d at %H:%M")(new Date(parseInt(timestamp)));
  }

  function url(text = "", link = ""){
    if (!link) return text;
    return `<a class='vzb-underline' href='${link}' target='_blank'>⧉ ${text}</a>`;
  }

  class About extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title"> 
          <span data-localise="buttons/about"></span>
        </div>

        <div class="vzb-dialog-content">
          <div class="vzb-about-header"></div>
          <div class="vzb-about-body"></div>
          <div class="vzb-about-footer"></div>
        </div>
    
        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>
      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {
        header: this.element.select(".vzb-about-header"),
        body: this.element.select(".vzb-about-body"),
        footer: this.element.select(".vzb-about-footer")
      };
    }

    draw(){
      this.addReaction(this.drawHeader);
      this.addReaction(this.drawBody);
      this.addReaction(this.drawFooter);
    }


    drawHeader(){
      const author = this.root.constructor.versionInfo?.sharedComponents?.package?.author || {};

      this.DOM.header.html("");
      this.DOM.header.append("p").html(url("Report a problem", "https://github.com/Gapminder/tools-page/issues"));
      this.DOM.header.append("p").html("This chart is made with Vizabi, <br/> a project by " + url(author.name, author.url));
    }


    drawBody(){
      const vizabiModulesData = [
        this.root.constructor.versionInfo || {},
        this.root.constructor.versionInfo?.sharedComponents || {},
        this.services.Vizabi.Vizabi.versionInfo || {}
      ];

      const readerData = this.services.Vizabi.Vizabi.stores.dataSources.getAll().map(dataSource => {
        return {
          name: dataSource.config.name,
          service: dataSource.config.service,
          type: dataSource.config.modelType
        };
      }); 

      this.DOM.body.html("");
      this.DOM.body.append("div").append("p").append("h1").html("Components:");
      this.DOM.body.append("div").selectAll("p")
        .data(vizabiModulesData)
        .enter().append("p")
        .html(d => url(d.package?.description || d.package?.name, d.package?.homepage) + `<br/> - Version: ${formatVersion(d.version)} <br/> - Build ${formatBuild(d.build)}`);
      
      this.DOM.body.append("div").append("p").append("h1").html("Data sources:");
      this.DOM.body.append("div").selectAll("p")
        .data(readerData)
        .enter().append("p")
        .html(d => url(d.type + " " + d.name, d.service));
    }


    drawFooter(){
      const contributors = this.root.constructor.versionInfo?.sharedComponents?.package?.contributors || [];
      
      this.DOM.footer.html("");
      this.DOM.footer.append("p").append("h1").html(`Contributors:`);
      this.DOM.footer.append("p").selectAll("span")
        .data(contributors)
        .enter().append("span")
        .html(d => url(d.name, d.url));
    }
  }

  decorated$7.add("about", About);

  /*!
   * VIZABI COLOR DIALOG
   */

  class Colors extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="colors" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="colors" data-click="dragDialog"></span>
        
        <div class="vzb-dialog-title">
          <span data-localise="buttons/colors"></span>
          <span class="vzb-caxis-selector"></span>
        </div>
      
        <div class="vzb-dialog-content vzb-dialog-scrollable">
          <div class="vzb-clegend-container">
            <svg>
              <g class="vzb-timedisplay"></g>
            </svg>
          </div>
        </div>

        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>

      </div>
    `;
      
      config.subcomponents = [{
        type: IndicatorPicker,
        placeholder: ".vzb-caxis-selector",
        options: {
          submodel: "encoding",
          targetProp: "color",
          showHoverValues: true
        },
        //model: config.root.model.stores.markers.get("legend")
        state: {
          get hoverKeyLabels() {
            const legendMarker = config.root.model.markers?.legend;
            if (!legendMarker) return null;
            if (legendMarker.state === STATUS.READY) {
              //TODO: fix on multi dimensions config
              const labelKey = legendMarker.data.space[0];
              return legendMarker.dataArray.reduce((labels, data) => {
                labels[data[labelKey]] = data.name;
                return labels;
              }, {});
            }
            
            return null;
          }
        }
      }, {
        type: decorated$a,
        placeholder: ".vzb-clegend-container",
        options: {
          colorModelName: "color",
          legendModelName: config.root.options.legendMarkerName || "legend"
        }
      }];
      
      super(config);
    }

  }

  decorated$7.add("colors", Colors);

  /*
   * Axes dialog
   */

  class Axes extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="axes" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="axes" data-click="dragDialog"></span>
        <div class="vzb-dialog-title">
          <span data-localise="buttons/axes"></span>
        </div>
        <div class="vzb-dialog-content">
          <p class="vzb-dialog-sublabel">
            <span data-localise="buttons/x"></span>
            <span class="vzb-xaxis-selector"></span>
          </p>
          <div class="vzb-xaxis-minmax vzb-dialog-paragraph"></div>
          <p class="vzb-dialog-sublabel">
            <span data-localise="buttons/y"></span>
            <span class="vzb-yaxis-selector"></span>
          </p>
          <div class="vzb-yaxis-minmax vzb-dialog-paragraph"></div>
        </div>
        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>
      </div>    
    `;

      config.subcomponents = [{
        type: IndicatorPicker,
        placeholder: ".vzb-xaxis-selector",
        options: {
          submodel: "encoding",
          targetProp: "x"
        }
      },{
        type: decorated$6,
        placeholder: ".vzb-xaxis-minmax",
        state: {
          submodel: "encoding.x.scale"
        }
      },{
        type: IndicatorPicker,
        placeholder: ".vzb-yaxis-selector",
        options: {
          submodel: "encoding",
          targetProp: "y"
        }
      },{
        type: decorated$6,
        placeholder: ".vzb-yaxis-minmax",
        state: {
          submodel: "encoding.y.scale"
        }
      }];

      super(config);
    }

  }

  decorated$7.add("axes", Axes);

  /*
   * Label dialog
   */

  class Label extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="label" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="label" data-click="dragDialog"></span>
        <div class="vzb-dialog-title"> 
          <span data-localise="buttons/label"></span>
        </div>

        <div class="vzb-dialog-content">
          <span class="vzb-saxis-selector"></span>
          <div class="vzb-dialog-sizeslider"></div>
          <div class="vzb-removelabelbox-switch"></div>
        </div>

        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>

      </div>
    `;

      config.subcomponents = [{
        type: SizeSlider,
        placeholder: ".vzb-dialog-sizeslider",
        options: {
          constantUnit: "unit/pixels",
          submodelFunc: () => this.model.encoding.size_label.scale,
        }
      }, {
        type: IndicatorPicker,
        placeholder: ".vzb-saxis-selector",
        options: {
          submodel: "encoding",
          targetProp: "size_label",
        }
      }, {
        type: SimpleCheckbox,
        placeholder: ".vzb-removelabelbox-switch",
        options: {
          checkbox: "removeLabelBox",
          submodel: "root.ui.chart.labels"
        }
      }];

      super(config);
    }
  }

  decorated$7.add("label", Label);

  /*
   * More options dialog
   */

  class MoreOptions extends decorated$7 {
    constructor(config) {
      const { moreoptions = [], popup = []} = config.parent.ui.dialogs;
      const templateArray  = [];
      const subcomponents = [{
        type: OptionsButtonList,
        placeholder: ".vzb-dialog-options-buttonlist",
      }];

      const dialogList = moreoptions === true ? popup : moreoptions;

      dialogList.forEach(dlg => {      
        subcomponents.push({
          type: decorated$7.get(dlg),
          placeholder: '.vzb-dialogs-dialog[data-dlg="' + dlg + '"]',
          model: config.model,
          name: dlg,
        });

        templateArray.push(
          `<div data-dlg="${dlg}" class="vzb-dialogs-dialog  vzb-moreoptions vzb-accordion-section"></div>`
        );
      });

      config.subcomponents = subcomponents;

      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="moreoptions" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="moreoptions" data-click="dragDialog"></span>

        <div class="vzb-dialog-title">
          <span></span>
        </div>

        <div class="vzb-dialog-content vzb-dialog-scrollable">
          <div class='vzb-dialog-options-buttonlist'>
          </div>
          <div class="vzb-accordion">
            ${templateArray.join("\n")}
          </div>
        </div>

        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span></span>
          </div>
        </div>

      </div>
    `;

      super(config);
    }

    setup(options) {
      super.setup(options);

      this.element.on("custom-dragend", () => {
        this._setMaxHeight();
      });

      const _this = this;
      this.DOM.accordion = this.DOM.content.select(".vzb-accordion");

      //accordion
      if (this.DOM.accordion) {
        const sections = this.DOM.accordion.selectAll(".vzb-accordion-section");
        sections.data(this.children.slice(1).map(c => ({ 
          name: c.name
        })));
        const titleEl = sections
          .select(".vzb-dialog-title>span:first-child");
        titleEl.on("click", (event, d) => {
          const sectionEl = _this.findChild({ name: d.name }).element;
          const activeEl = _this.DOM.accordion.select(".vzb-accordion-active");
          if (activeEl) {
            activeEl.classed("vzb-accordion-active", false);
          }
          if (sectionEl.node() !== activeEl.node()) {
            sectionEl.classed("vzb-accordion-active", true);
            _this.transitionEvents.forEach(event => {
              sectionEl.on(event, () => {
                _this.transitionEvents.forEach(event => {
                  sectionEl.on(event, null);
                });
                //_this.components[d.component].trigger("resize");
              });
            });
          }
        });
      }
    }

    draw() {
      super.draw();

      this.DOM.title.select("span").text(this.localise("buttons/more_options"));
      this.DOM.buttons.select("span").text(this.localise("buttons/ok"));

    }
  }

  decorated$7.add("moreoptions", MoreOptions);

  /*
   * Size dialog
   */

  class Presentation extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title"> 
          <span data-localise="dialogs/presentation"></span>
        </div>

        <div class="vzb-dialog-content">
          <div class="vzb-presentationmode-switch"></div>
          <div class="vzb-decorations-switch"></div>
          <div class="vzb-time-background-switch"></div>
          <div class="vzb-time-trails-switch"></div>
          <div class="vzb-format-si-prefix-switch"></div>
        </div>

      </div>
    `;

      config.subcomponents = [{
        type: SimpleCheckbox,
        placeholder: ".vzb-presentationmode-switch",
        options: {
          checkbox: "projector",
          submodel: "services.layout"
        }
      }, {
        type: SimpleCheckbox,
        placeholder: ".vzb-decorations-switch",
        options: {
          checkbox: "enabled",
          prefix: "decorations",
          submodel: "root.ui.chart.decorations"
        }
      }, {
        type: SimpleCheckbox,
        placeholder: ".vzb-time-background-switch",
        options: {
          checkbox: "timeInBackground",
          submodel: "root.ui.chart"
        }
      }, {
        type: SimpleCheckbox,
        placeholder: ".vzb-time-trails-switch",
        options: {
          checkbox: "timeInTrails",
          submodel: "root.ui.chart"
        }
      }, {
        type: SimpleCheckbox,
        placeholder: ".vzb-format-si-prefix-switch",
        options: {
          checkbox: "numberFormatSIPrefix",
          submodel: "root.ui.chart"
        }
      }];

      super(config);
    }


  }

  decorated$7.add("presentation", Presentation);

  /*
   * Repeat dialog
   */


  class Repeat extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="colors" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="colors" data-click="dragDialog"></span>

        <div class="vzb-dialog-title"> 
          <span data-localise="buttons/repeat"></span>
        </div>

        <div class="vzb-dialog-content">
          <div class="vzb-repeat-header"></div>
          <div class="vzb-repeat-body">
            <div class="vzb-repeat-grid"></div>
          </div>
        </div>
    
        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>
      </div>
    `;

      super(config);
    }

    setup(options) {
      super.setup(options);

      this.DOM.header = this.element.select(".vzb-repeat-header");
      this.DOM.body = this.element.select(".vzb-repeat-body");
      this.DOM.grid = this.element.select(".vzb-repeat-grid");
    }

    get MDL(){
      return {
        repeat: this.model.encoding.repeat
      };
    }

    draw(){
      super.draw();

      this.addReaction(this.drawHeader);
      this.addReaction(this.drawBody);
    }


    drawHeader(){
      const header = this.DOM.header;
      const localise = this.services.locale.auto();
      const {allowEnc, useConnectedRowsAndColumns} = this.MDL.repeat;

      header.selectAll("p").remove();
      header.append("p")
        .attr("class", "vzb-repeat-experimental")
        .html(localise("hint/experimentalfeature"));
      header.append("p")
        .html(localise("hint/repeat/addremovecharts"));

      if (useConnectedRowsAndColumns) {
        header.append("p")
          .html(allowEnc[0] + " " + localise("hint/repeat/issharedacrossrows"));
        header.append("p")
          .html(allowEnc[1] + " " + localise("hint/repeat/issharedacroscolumns"));
      }
    }

    drawBody(){
      const {rowcolumn, ncolumns, nrows} = this.MDL.repeat;
      const repeat = this.MDL.repeat;
      const localise = this.services.locale.auto();

      this.DOM.grid
        .style("grid-template-rows", "1fr ".repeat(nrows) + "30px")
        .style("grid-template-columns", "1fr ".repeat(ncolumns) + "30px");

      this.DOM.grid.selectAll("div").remove();

      this.DOM.grid.selectAll("div")
        .data(rowcolumn, d => repeat.getName(d))
        .enter().append("div")
        .attr("class", "vzb-repeat-segment")
        .attr("title", d => JSON.stringify(d, null, 1))
        .style("grid-row-start", (_, i) => repeat.getRowIndex(i) + 1)
        .style("grid-column-start", (_, i) => repeat.getColumnIndex(i) + 1)
        .html(() => ncolumns == 1 && nrows == 1 ? localise("hint/repeat/pressplus") : "")
        .on("mouseover", (event, d) => {
          d3.select(".vzb-" + repeat.getName(d))
            .classed("vzb-chart-highlight", true);
        })
        .on("mouseout", (event, d) => {
          d3.select(".vzb-" + repeat.getName(d))
            .classed("vzb-chart-highlight", false);
        });

      if (ncolumns > 1) {
        this.DOM.grid.selectAll("div.vzb-repeat-removecolumn")
          .data(Array(ncolumns))
          .enter().append("div")
          .attr("class", "vzb-repeat-removecolumn")
          .html("✖︎")
          .style("grid-column-start", (_, i) => i + 1)
          .on("click", (_, i) => {
            this._remove("column", i);
            this._clearHoverClasses(rowcolumn);
          })
          .on("mouseover", (_, i) => {
            rowcolumn.forEach((d, index) => {
              if (index % ncolumns == i)
                d3.select(".vzb-" + repeat.getName(d))
                  .classed("vzb-chart-removepreview", true);
            });
          })
          .on("mouseout", () => {
            this._clearHoverClasses(rowcolumn, "vzb-chart-removepreview");
          });
      }

      if (nrows > 1) {
        this.DOM.grid.selectAll("div.vzb-repeat-removerow")
          .data(Array(nrows))
          .enter().append("div")
          .attr("class", "vzb-repeat-removerow")
          .html("✖︎")
          .style("grid-row-start", (_, i) => i + 1)
          .on("click", (_, i) => {
            this._remove("row", i);
            this._clearHoverClasses(rowcolumn);
          })
          .on("mouseover", (_, i) => {
            rowcolumn.forEach((d, index) => {
              if (Math.floor(index / ncolumns) == i)
                d3.select(".vzb-" + repeat.getName(d))
                  .classed("vzb-chart-removepreview", true);
            });
          })
          .on("mouseout", () => {
            this._clearHoverClasses(rowcolumn, "vzb-chart-removepreview");
          });
      }

      this.DOM.grid.append("div")
        .attr("class", "vzb-repeat-addcolumn")
        .html("✚")
        .style("grid-row-start", 1)
        .style("grid-row-end", nrows + 1)
        .style("grid-column-start", ncolumns + 1)
        .on("click", () => {
          this._createNew("column");
          this._clearHoverClasses(rowcolumn);
        })
        .on("mouseover", () => {
          rowcolumn.forEach((d, i) => {
            if ((i + 1) % ncolumns == 0)
              d3.select(".vzb-" + repeat.getName(d))
                .classed("vzb-chart-addrightpreview", true);
          });
        })
        .on("mouseout", () => {
          this._clearHoverClasses(rowcolumn, "vzb-chart-addrightpreview");
        });

      this.DOM.grid.append("div")
        .attr("class", "vzb-repeat-addrow")
        .html("✚")
        .style("grid-row-start", nrows + 1)
        .style("grid-column-start", 1)
        .style("grid-column-end", ncolumns + 1)
        .on("click", () => {
          this._createNew("row");
          this._clearHoverClasses(rowcolumn);
        })
        .on("mouseover", () => {
          rowcolumn.forEach((d, i) => {
            if (Math.floor(i / ncolumns) + 1 == nrows)
              d3.select(".vzb-" + repeat.getName(d))
                .classed("vzb-chart-addbelowpreview", true);
          });
        })
        .on("mouseout", () => {
          this._clearHoverClasses(rowcolumn, "vzb-chart-addbelowpreview");
        });
    }

    _clearHoverClasses(array, cssclass){
      array.forEach(d => {
        const selection = d3.select(".vzb-" + this.MDL.repeat.getName(d));

        if(!cssclass || cssclass == "vzb-chart-highlight")
          selection.classed("vzb-chart-highlight", false);

        if(!cssclass || cssclass == "vzb-chart-removepreview")
          selection.classed("vzb-chart-removepreview", false);

        if(!cssclass || cssclass == "vzb-chart-addbelowpreview")
          selection.classed("vzb-chart-addbelowpreview", false);

        if(!cssclass || cssclass == "vzb-chart-addrightpreview")
          selection.classed("vzb-chart-addrightpreview", false);
      });
    }

    _remove(direction, index){
      if(direction !== "row" && direction !== "column") return console.error("incorrect use of function _remove in repeat dialog");
      const {ncolumns, nrows, useConnectedRowsAndColumns} = this.MDL.repeat;
      mobx.runInAction(() => {
        if(useConnectedRowsAndColumns) {
          this.MDL.repeat.config[direction].splice(index, 1);
        } else {
          if(direction == "column"){
            for (let i = 1; i <= nrows; i++) {
              this.MDL.repeat.config.rowcolumn.splice(i * index, 1);
            }
            this.MDL.repeat.config.ncolumns = ncolumns - 1;
          }
          if (direction == "row") {
            this.MDL.repeat.config.rowcolumn.splice(ncolumns * index, ncolumns);
          }   
        }
      });
    }

    _createNew(direction){
      if(direction !== "row" && direction !== "column") return console.error("incorrect use of function _createNew in repeat dialog");
      const {ncolumns, nrows, allowEnc, useConnectedRowsAndColumns} = this.MDL.repeat;
      mobx.runInAction(() => {
        if(useConnectedRowsAndColumns) {
          const newEncName = this._generateEncodingNames(direction);
          this.model.config.encoding[newEncName] = {data: {concept: this._getConceptOfLast(direction)}};
          this.MDL.repeat.config[direction].push(newEncName);
        } else {
          this.MDL.repeat.config.rowcolumn = this.MDL.repeat.rowcolumn;
          if(direction == "column"){
            for (let i = 1; i <= nrows; i++) {
              const newEncNames = this._generateEncodingNames();
              allowEnc.forEach(e => {
                this.model.config.encoding[newEncNames[e]] = {data: {concept: this._getConceptOfLast(e)}};
              });
              this.MDL.repeat.config.rowcolumn.splice(i * ncolumns, 0, newEncNames);
            }
            this.MDL.repeat.config.ncolumns = ncolumns + 1;
          }
          if (direction == "row") {
            for (let i = 1; i <= ncolumns; i++) {
              const newEncNames = this._generateEncodingNames();
              allowEnc.forEach(e => {
                this.model.config.encoding[newEncNames[e]] = {data: {concept: this._getConceptOfLast(e)}};
              });
              this.MDL.repeat.config.rowcolumn.push(newEncNames);
            }
          }   
        }
      });
    }

    _getConceptOfLast(arg){
      const {rowcolumn, allowEnc} = this.MDL.repeat;

      let alias = arg;

      if(arg == "row") 
        alias = allowEnc[0];
        
      if(arg == "column") 
        alias = allowEnc[1];

      return rowcolumn
        .map(d => this.model.encoding[d[alias]]?.data?.concept)
        .filter(f => f)
        .at(-1) || "population_total";
    }
    _generateEncodingNames(direction){
      const {allowEnc} = this.MDL.repeat;

      if(direction == "row") 
        return this._generateEncodingName(allowEnc[0]);

      if(direction == "column") 
        return this._generateEncodingName(allowEnc[1]);
      
      return allowEnc.reduce((obj, alias) => {
        obj[alias] = this._generateEncodingName(alias);
        return obj;
      }, {});
    }
    _generateEncodingName(alias){
      const {rowcolumn} = this.MDL.repeat;
      const prefix = alias; //can be "repeat_"+alias or something
      return prefix + (d3.max(rowcolumn.map(d => +d[alias].replace(prefix,"") || 0)) + 1);
    }



  }


  const decorated$3 = mobx.decorate(Repeat, {
    "MDL": mobx.computed
  });
    
  decorated$7.add("repeat", decorated$3);

  /*
   * Size dialog
   */

  class Size extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="size" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="size" data-click="dragDialog"></span>
        <div class="vzb-dialog-title"> 
          <span data-localise="buttons/size"></span>
          <span class="vzb-saxis-selector"></span>
        </div>
        <div class="vzb-dialog-content">
          <div class="vzb-dialog-bubblesize"></div>
          <span class="vzb-dialog-subtitle"></span>
        </div>
        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>
      </div>    
    `;

      config.subcomponents = [{
        type: IndicatorPicker,
        placeholder: ".vzb-saxis-selector",
        options: {
          submodel: "encoding",
          targetProp: "size",
          showHoverValues: true
        }
      },{
        type: BubbleSize,
        placeholder: ".vzb-dialog-bubblesize",
        options: {
          showArcs: true,
          submodelFunc: () => this.model.encoding.size.scale,
        }
      }];

      super(config);
    }

    draw() {
      super.draw();

      this.addReaction(this._updateSubtitle);
    }

    _updateSubtitle() {
      const conceptProps = this.model.encoding.size.data.conceptProps;
      const subtitle = getSubtitle(conceptProps.name, conceptProps.name_short);

      this.element.select(".vzb-dialog-subtitle").text(subtitle);
    }
  }

  decorated$7.add("size", Size);

  /*
   * Timedisplay dialog
   */
  class TimeDisplay extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class="vzb-dialog-modal">
        <div class="vzb-dialog-content vzb-dialog-content-fixed">
          <svg>
            <g class="vzb-timedisplay"></g>
          </svg>
        </div>
        <div class="vzb-dialog-buttons"></div>
      </div>`;
    
      config.subcomponents = [{
        type: decorated$9,
        placeholder: ".vzb-timedisplay"
      }];
      
      super(config);
    }

    setup(options) {
      super.setup(options);

      this._date = this.findChild({type: "DateTimeBackground"});
      this._date.setConditions({ widthRatio: 1, heightRatio: 1 });
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame
      };
    }

    draw() {
      super.draw();

      const _this = this;
      Object.assign(this.state, {
        get duration() {
          return _this.MDL.frame.playing ? _this.MDL.frame.speed || 0 : 0;
        }
      });

      this.addReaction(this._updateTime);
      this.addReaction(this._updateSize);

    }

    _updateTime() {
      const frame = this.MDL.frame;
      this._date.setText(frame.value, this.state.duration);
    }

    _updateSize() {
      this.services.layout.size;

      if (this._date) {
        this._date.resizeText(this.DOM.content.style("width"), this.DOM.content.style("height"));
      }
    }
  }

  decorated$7.add("timedisplay", TimeDisplay);
  const decorated$2 = mobx.decorate(TimeDisplay, {
    "MDL": mobx.computed
  });

  /*
   * Zoom dialog
   */

  class Zoom extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="label" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="label" data-click="dragDialog"></span>
        <div class="vzb-dialog-title"> 
          <span></span>
          <div class="vzb-dialog-zoom-buttonlist"></div>
        </div>
            
            
        <div class="vzb-dialog-content">
          <div class="vzb-panwitharrow-switch"></div>
          <div class="vzb-zoomonscrolling-switch"></div>
          <div class="vzb-adaptminmaxzoom-switch"></div>
        </div>
      
        <div class="vzb-dialog-buttons">
          <div data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span><span/>
          </div>
        </div>
      
      </div>    
    `;

      config.subcomponents = [{
        type: ZoomButtonList,
        placeholder: ".vzb-dialog-zoom-buttonlist"
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-panwitharrow-switch",
        options: {
          checkbox: "panWithArrow",
          submodel: "root.ui.chart"
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-zoomonscrolling-switch",
        options: {
          checkbox: "zoomOnScrolling",
          submodel: "root.ui.chart"
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-adaptminmaxzoom-switch",
        options: {
          checkbox: "adaptMinMaxZoom",
          submodel: "root.ui.chart"
        }
      }];

      super(config);
    }

    draw() {
      super.draw();

      this.DOM.title.select("span").text(this.localise("buttons/zoom"));
      this.DOM.buttons.select("span").text(this.localise("buttons/ok"));
    }
  }

  decorated$7.add("zoom", Zoom);

  class Speed extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title"> 
            <span data-localise="buttons/time"></span>
        </div>
            
        <div class="vzb-dialog-content">
          <p class="vzb-dialog-sublabel">
            <span data-localise="hints/speed"></span>
          </p>
            
          <form class="vzb-dialog-paragraph">
            <div class="vzb-speed-slider"></div>
          </form>
          
          <p class="vzb-dialog-sublabel">
            <span data-localise="hints/forecastoptions"></span>
          </p>

          <form class="vzb-dialog-paragraph">
            <div class="vzb-showforecast-switch"></div>
            <div class="vzb-pausebeforeforecast-switch"></div>
            <div class="vzb-showstripedpatternwhenforecast-switch"></div>
            <div>
              <span data-localise="hints/endbeforeforecast"></span>
              <input type="text" class="vzb-endbeforeforecast-field" name="endbeforeforecast"/>
            </div>
            <div>
              <span class="vzb-timeformatexample-hint" data-localise="hints/timeformatexample"></span>
              <span class="vzb-timeformatexample-label"></span>
            </div>
          </form>

          <p class="vzb-dialog-sublabel">
          <span data-localise="hints/sparsedata"></span>
          </p>

          <form class="vzb-dialog-paragraph">
            <span class="vzb-extrapolate-hint"></span>
            <div class="vzb-extrapolate-slider"></div>
          </form>
        </div>
      </div>  
    `;

      config.subcomponents = [{
        type: SingleHandleSlider,
        placeholder: ".vzb-speed-slider",
        //model: ["state.time", "locale"],
        options: {
          value: "speed",
          setValueFunc: "setSpeed",
          domain: [1200, 900, 450, 200, 150, 100],
          ROUND_DIGITS: 0,
          submodel: "model.encoding.frame"
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-showforecast-switch",
        //model: ["state.time", "locale"],
        options: {
          checkbox: "showForecast",
          submodel: "root.ui.chart"
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-pausebeforeforecast-switch",
        //model: ["state.time", "locale"],
        options: {
          checkbox: "pauseBeforeForecast",
          submodel: "root.ui.chart",
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-showstripedpatternwhenforecast-switch",
        //model: ["ui.chart", "locale"],
        options: {
          checkbox: "showForecastOverlay",
          submodel: "root.ui.chart"
        }
      },{
        type: SingleHandleSlider,
        placeholder: ".vzb-extrapolate-slider",
        name: "extrapolate-slider",
        options: {
          value: "extrapolate",
          setValueFunc: "setExtrapolate",
          domain: d3.range(100),
          ROUND_DIGITS: 0,
          submodel: "model.encoding.frame"
        }
      }];

      super(config);
    }

    setup() {
      this.DOM = {
        timeFormatExample: this.element.select(".vzb-timeformatexample-label"),
        forecastField: this.element.select(".vzb-endbeforeforecast-field"),
        extrapolateHint: this.element.select(".vzb-extrapolate-hint")
      };

      const _this = this;
      this.DOM.forecastField
        .on("keypress", function(event) {
          if (event.charCode == 13 || event.keyCode == 13) {
            //this prevents form submission action with subsequent page reload
            event.preventDefault();
            this.blur();
          }
        })
        .on("change", function() {
          //TODO: where is time parser nowdays
          const frame = _this.MDL.frame;
          const parsed = frame.parseValue(this.value);
          if (isDate(parsed)) {
            _this.root.ui.chart.endBeforeForecast = this.value;
          }
        });

    }


    get MDL() {
      return {
        frame: this.model.encoding.frame
      };
    }

    draw() {
      this.localise = this.services.locale.auto();

      this.addReaction(this.updateForecastField);
      this.addReaction(this.updateExtrapolateSlider);
    }

    updateForecastField() {
      this.DOM.forecastField.property("value",
        this.localise(this.root.ui.chart.endBeforeForecast)
      );
      this.DOM.timeFormatExample.text(this.localise(new Date()));
    }

    updateExtrapolateSlider(){
      const sliderSize = this.MDL.frame.stepCount <= 2 ? 2 : this.MDL.frame.stepCount;
      this.findChild({name: "extrapolate-slider"})
        ._setDomain(d3.range(sliderSize));

      const hintText = this.MDL.frame.extrapolate ? 
        this.localise("hints/extendDataNSteps").replace("{n}", this.MDL.frame.extrapolate)
        : this.localise("hints/dontExtendData");

      this.DOM.extrapolateHint
        .text(hintText)
        .attr("title", this.localise("hints/extrapolation"));
    }

  }

  const decorated$1 = mobx.decorate(Speed, {
    "MDL": mobx.computed
  });

  decorated$7.add("speed", decorated$1);

  class Technical extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title"> 
          <span data-localise="dialogs/technical"></span>
        </div>

        <div class="vzb-dialog-content">
          <div class="vzb-advancedshowandselect-switch"></div>
          <div class="vzb-advancedmarkerspace-switch"></div>
          <div class="vzb-showdatasources-switch"></div>
        </div>

      </div>
    `;

      config.subcomponents = [{
        type: SimpleCheckbox,
        placeholder: ".vzb-advancedshowandselect-switch",
        options: {
          checkbox: "enableSelectShowSwitch",
          submodelFunc: () => this.root
            .findChild({name: "dialogs"})
            .findChild({name: "find"}).ui
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-advancedmarkerspace-switch",
        options: {
          checkbox: "enableMarkerSpaceOptions",
          submodelFunc: () => this.root
            .findChild({name: "dialogs"})
            .findChild({name: "find"}).ui
        }
      },{
        type: SimpleCheckbox,
        placeholder: ".vzb-showdatasources-switch",
        options: {
          checkbox: "showDataSources",
          submodelFunc: () => this.root
            .findChild({name: "tree-menu"}).ui
        }
      }];

      super(config);
    }

  }

  decorated$7.add("technical", Technical);

  /*!
   * VIZABI SHOW PANEL CONTROL
   * Reusable show panel dialog
   */

  class Show extends BaseComponent {
    constructor(config) {
      config.template = `
      <div class="vzb-show-list vzb-accordion">
        <!-- list will be placed here -->
      </div>
    `;

      super(config);
    }

    setup() {
      this.DOM = {};
      this.DOM.list = this.element.select(".vzb-show-list");
      this.DOM.input_search = this.parent.element.select(".vzb-find-search");
      this.DOM.deselect_all = this.parent.element.select(".vzb-show-deselect");
      this.DOM.apply = this.parent.element.select(".vzb-show-apply");
    
      this.DOM.deselect_all.on("click", () => {
        this._resetShow();
      });

      this.DOM.apply.on("click", () => {
        this._applyShowChanges();
      });

      this.tabsConfig = this.ui.showTabs || {};
    }

    draw() {
      this.MDL = {
        selected: this.model.encoding.selected,
        frame: this.model.encoding.frame
      };

      this.localise = this.services.locale.auto();

      this.previewShow = {};
      const dimensionFilter = this.model.data.filter.dimensions;
      if (!this.resetFilter) this.resetFilter = deepClone(dimensionFilter);
      forEach(this.model.data.space, dim => {
        if (dimensionFilter[dim]) {
          this.previewShow[dim] = deepExtend({}, dimensionFilter[dim]);
          forEach(dimensionFilter[dim].$and || [dimensionFilter[dim]], filter$and => {
            forEach(filter$and, (filter, key) => {
              this.previewShow[dim][key] = (filter.$in || []).slice(0);
            });
          });
        }
      });

      this.checkedDifference = {};

      this.addReaction(this._updateView);
    }

    _updateView() {
      if (this.parent._getPanelMode() !== "show") return;

      
      function addCategory(catalog, dim) {
        if (catalog.entities) {
          categories.push({
            dim,
            key: catalog.concept.concept,
            entities: catalog.entities,
            name: catalog.concept.name
          });
        }
        if (catalog.properties) {
          Object.keys(catalog.properties).forEach(property => {
            addCategory(catalog.properties[property], dim);
          });
        }
      }
      
      const categories = [];
      this.model.data.spaceCatalog.then(spaceCatalog => {
        Object.keys(spaceCatalog).forEach(dim => {
          addCategory(spaceCatalog[dim], dim);
        });
        this.buildList(categories);
      });
    }

    buildList(categories) {
      const _this = this;
      this.DOM.list.html("");

      forEach(categories, ({ dim, key, name, entities }) => {
        const isSet = dim !== key;
          
        entities = [...entities.values()]
          .map(d => Object.assign(d, {
            isShown: this._isMarkerInDimFilter(d, dim, key)
          }))
          //sort data alphabetically
          .sort((a, b) => (a.name < b.name) ? -1 : 1);
      
        //TODO: HACK remove this UN state filter when we will be able to request entity properties separately
        if (this.model.encoding.unstate && key == this.model.encoding.unstate.data.space[0]){
          const response = this.model.encoding.unstate.data.response;
          entities = entities
            .filter(entity => response.get(entity).un_state);
        }
        
        const section = this.DOM.list.append("div")
          .attr("class", "vzb-accordion-section")
          .classed("vzb-accordion-active", this.tabsConfig[key] === "open")
          .datum({ key, isSet });

        section.append("div")
          .attr("class", "vzb-accordion-section-title")
          .on("click", function() {
            const parentEl = d3.select(this.parentNode);
            parentEl.classed("vzb-fullexpand", false)
              .classed("vzb-accordion-active", !parentEl.classed("vzb-accordion-active"));
          })
          .call(elem => elem.append("span")
            .attr("class", "vzb-show-category")
            .classed("vzb-show-category-set", d => d.isSet)
            .text(name)
            .attr("title", function() {
              return this.offsetWidth < this.scrollWidth ? name : null;
            })
          )
          .call(elem => elem.append("span")
            .attr("class", "vzb-show-clear-cross")
            .text("✖")
            .on("click", (event) => {
              event.stopPropagation();
              section.selectAll(".vzb-checked input")
                .property("checked", false)
                .dispatch("change");
            })
          )
          .call(elem => elem.append("span")
            .attr("class", "vzb-show-more vzb-dialog-button")
            .text(_this.localise("buttons/moreellipsis"))
            .on("click", (event) => {
              event.stopPropagation();
              section.classed("vzb-fullexpand", true);
            })
          );

        const list = section.append("div")
          .attr("class", "vzb-show-category-list");

        const items = list.selectAll(".vzb-show-item")
          .data(entities)
          .enter()
          .append("div")
          .attr("class", "vzb-show-item vzb-dialog-checkbox")
          .classed("vzb-checked", d => d.isShown);

        items.append("input")
          .attr("type", "checkbox")
          .attr("class", "vzb-show-item")
          .attr("id", d => "-show-" + key + "-" + d[key] + "-" + _this.id)
          .property("checked",  d => d.isShown)
          .on("change", (event, d) => {
            if (d.isShown !== event.currentTarget.checked) {
              this.checkedDifference[key + d[key]] = true;
            } else {
              delete this.checkedDifference[key + d[key]];
            }
            this.DOM.apply.classed("vzb-disabled", !Object.keys(this.checkedDifference).length);

            if (!this.previewShow[dim]) {
              this.previewShow[dim] = {};
            }
            if (!this.previewShow[dim][key]) {
              this.previewShow[dim][key] = [];
            }
            const index = this.previewShow[dim][key].indexOf(d[key]);
            index === -1 ? this.previewShow[dim][key].push(d[key]) : this.previewShow[dim][key].splice(index, 1);
          });

        items.append("label")
          .attr("for", d => "-show-" + key + "-" + d[key] + "-" + _this.id)
          .text(d => d.name)
          .attr("title", function(d) {
            return this.offsetWidth < this.scrollWidth ? d.name : null;
          });

        const lastCheckedNode = list.selectAll(".vzb-checked")
          .classed("vzb-separator", false)
          .lower()
          .nodes()[0];

        if (lastCheckedNode && lastCheckedNode.nextSibling) {
          //const lastCheckedEl = d3.select(lastCheckedNode).classed("vzb-separator", !!lastCheckedNode.nextSibling);
          const offsetTop = lastCheckedNode.parentNode.offsetTop + lastCheckedNode.offsetTop;
          d3.select(lastCheckedNode.parentNode.parentNode).style("max-height", (offsetTop + lastCheckedNode.offsetHeight + 25) + "px")
            .select(".vzb-show-more").style("transform", `translate(0, ${offsetTop}px)`);
        } else {
          section.select(".vzb-show-more").classed("vzb-hidden", true);
        }

        section.classed("vzb-filtered", !!lastCheckedNode);
        section.classed("vzb-fullexpand", !!lastCheckedNode && this.tabsConfig[key] === "open fully");
      });

      //_this.DOM.content.node().scrollTop = 0;

    }

    _showHideSearch() {
      if (this.parent._getPanelMode() !== "show") return;

      let search = this.DOM.input_search.node().value || "";
      search = search.toLowerCase();
      this.DOM.list.selectAll(".vzb-show-item")
        .classed("vzb-hidden", d => {
          const lower = (d.name || "").toString().toLowerCase();
          return (lower.indexOf(search) === -1);
        });

      if (search !== "") {
        this.DOM.list.selectAll(".vzb-accordion-section")
          .classed("vzb-accordion-active", true);
      }
    }

    _showHideButtons() {
      if (this.parent._getPanelMode() !== "show") return;

      this.DOM.deselect_all.classed("vzb-hidden", this._hideResetButton());
      //
      this.DOM.apply.classed("vzb-hidden", false)
        .classed("vzb-disabled", true);
    }

    _hideResetButton() {
      let showEquals = true;
      const space = this.model.data.space;
      forEach(space, key => {
        showEquals = comparePlainObjects(this.resetFilter[key] || {}, this.model.data.filter.dimensions[key]);
        return showEquals;
      });

      return showEquals;
    }

    _applyShowChanges() {
      mobx.runInAction(() => {
        this.MDL.selected.data.filter.delete([...this.MDL.selected.data.filter.markers]);

        const setObj = {};
        forEach(this.previewShow, (showObj, entities) => {
          const $and = {};
          const $andKeys = [];
          forEach(showObj, (entitiesArray, category) => {
            $andKeys.push(category);
            if (entitiesArray.length) {
              $and[category] = { $in: entitiesArray.slice(0) };
            }
          });

          forEach(this.model.data.filter.dimensions[entities], (filter, key) => {
            if (!$andKeys.includes(key)) {
              $and[key] = deepClone(filter);
            }
          });

          setObj[entities] = $and;
        });
        this.model.data.filter.config.dimensions = setObj;
      });
    }

    _resetShow() {
      mobx.runInAction(() => {
        this.model.data.filter.config.dimensions = this.resetFilter;
      });
    }

    _closeClick() {
      this._applyShowChanges();
    }

    _isMarkerInDimFilter(d, dim, key) {
      const dimensionFilter = this.model.data.filter.dimensions[dim] || {};

      return getProp(dimensionFilter, [key, "$in"], []).includes(d[key]);
    }

  }

  /*!
   * VIZABI FIND CONTROL
   * Reusable find dialog
   */

  class Find extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <span class="thumb-tack-class thumb-tack-class-ico-pin fa" data-dialogtype="find" data-click="pinDialog"></span>
        <span class="thumb-tack-class thumb-tack-class-ico-drag fa" data-dialogtype="find" data-click="dragDialog"></span>
        <div class="vzb-dialog-title">
          <label class="vzb-dialog-title-switch">
            <input type="checkbox">
            <span class="vzb-switch-slider round"></span>
            <span class="vzb-switch-off">
              <span data-localise="dialogs/find"></span>
            </span>
            <span class="vzb-switch-on">
              <span data-localise="buttons/show"></span>
            </span>
          </label>

          <span class="vzb-dialog-content vzb-find-filter">
            <form novalidate>
              <input class="vzb-find-search" type="search" required/>
              <button class="vzb-cancel-button" type="reset"></button>
            </form>
          </span>

          <span class="vzb-spaceconfig-button"></span>
        </div>

        <div class="vzb-dialog-content vzb-dialog-content-fixed vzb-dialog-scrollable">
          <div class="vzb-dialog-content vzb-dialog-scrollable vzb-dialog-panel vzb-dialog-panel-find vzb-active">
            <div class="vzb-find-list">
              <!-- list will be placed here -->
            </div>
          </div>

          <div class="vzb-dialog-content vzb-dialog-scrollable vzb-dialog-panel vzb-dialog-panel-show">
          </div>
        </div>

        <div class="vzb-dialog-buttons">
          <div class="vzb-dialog-bubbleopacity vzb-dialog-control" data-panel="find"></div>
          <div class="vzb-dialog-button vzb-find-deselect" data-panel="find">
            <span data-localise="buttons/deselect"></span>
          </div>
          <div class="vzb-dialog-button vzb-show-deselect" data-panel="show">
            <span data-localise="buttons/reset"></span>
          </div>
          <div class="vzb-dialog-button vzb-show-apply" data-panel="show">
            <span data-localise="buttons/apply"></span>
          </div>

          <div data-dialogtype="find" data-click="closeDialog" class="vzb-dialog-button vzb-label-primary">
            <span data-localise="buttons/ok"></span>
          </div>
        </div>  

      </div>      
    `;

      config.subcomponents = [{
        type: Show,
        placeholder: ".vzb-dialog-panel-show"
      }, {
        type: SingleHandleSlider,
        placeholder: ".vzb-dialog-bubbleopacity",
        options: {
          value: "opacitySelectDim",
          submodel: "root.ui.chart"
        }
      }];

      super(config);
    }

    setup(options) {
      super.setup(options);

      this.DOM.findList = this.element.select(".vzb-find-list");
      this.DOM.titleSwitch = this.element.select(".vzb-dialog-title-switch");
      this.DOM.titleSwitchSlider = this.DOM.titleSwitch.select(".vzb-switch-slider");
      this.DOM.titleSwitchInput = this.DOM.titleSwitch.select("input");
      this.DOM.panels = this.DOM.content.selectAll(".vzb-dialog-content");
      this.DOM.panelFind = this.DOM.content.select(".vzb-dialog-panel-find");
      this.DOM.input_search = this.element.select(".vzb-find-search");
      this.DOM.deselect_all = this.element.select(".vzb-find-deselect");
      this.DOM.markerSpaceButton = this.element.select(".vzb-spaceconfig-button");
      this.DOM.opacity_nonselected = this.element.select(".vzb-dialog-bubbleopacity");

      this.DOM.titleSwitchInput.on("change", () => {
        this.ui.panelMode = this.DOM.titleSwitchInput.property("checked") ? "show" : "find";
      }).property("checked", this._getPanelMode() !== "find");

      this.DOM.input_search.on("keyup", event => {
        if (event.keyCode == 13 && this.DOM.input_search.node().value == "select all") {
          this.DOM.input_search.node().value = "";

          //TODO: select all markers

          // //clear highlight so it doesn't get in the way when selecting an entity        
          // if (!utils.isTouchDevice()) _this.model.state.marker.clearHighlighted();
          // _this.model.state.marker.selectAll();
          // utils.defer(() => _this.panelComps[_this.getPanelMode()].showHideSearch());
        }
      });

      this.DOM.input_search.on("input", () => {
        this.panelComps[this._getPanelMode()]._showHideSearch();
      });

      d3.select(this.DOM.input_search.node().parentNode)
        .on("reset", () => {
          defer(() => this.panelComps[this._getPanelMode()]._showHideSearch());
        })
        .on("submit", event => {
          event.preventDefault();
          return false;
        });

      this.DOM.deselect_all.on("click", () => {
        this.MDL.selected.data.filter.clear();
      });






      this.panelComps = { find: this, show: this.findChild({ type: "Show" }) };
    }

    get MDL() {
      return {
        frame: this.model.encoding.frame,
        selected: this.model.encoding.selected,
        highlighted: this.model.encoding.highlighted
      };
    }

    draw() {
      super.draw();

      this.TIMEDIM = this.MDL.frame.data.concept;
      this.KEY = Symbol.for("key");
      this.KEYS = this.model.data.space.filter(dim => dim !== this.TIMEDIM);

      this.DOM.input_search.attr("placeholder", this.localise("placeholder/search") + "...");

      this.addReaction(this._enablePanelModeSwitch);
      this.addReaction(this._enableMarkerSpaceOptions);
      this.addReaction(this._changePanelMode);
      this.addReaction(this._createFindList);
      this.addReaction(this._updateBrokenData);
      this.addReaction(this._selectDataPoints);
    }

    _changePanelMode() {
      const panelMode = this._getPanelMode();
      this.DOM.panels.classed("vzb-active", false);
      this.DOM.content.select(".vzb-dialog-panel-" + panelMode).classed("vzb-active", true);
      this.panelComps[panelMode]._showHideSearch();
      this._buttonAdjust();
      this.panelComps[panelMode]._showHideButtons();
    }

    _getPanelMode() {
      return this.ui.panelMode;
    }

    _enablePanelModeSwitch() {
      this.DOM.titleSwitchSlider.classed("vzb-hidden", !this.ui.enableSelectShowSwitch);
      this.DOM.titleSwitch.style("pointer-events", this.ui.enableSelectShowSwitch ? "auto" : "none");
    }

    _enableMarkerSpaceOptions() {
      this.DOM.markerSpaceButton.classed("vzb-hidden", !this.ui.enableMarkerSpaceOptions);
    }

    _buttonAdjust() {
      this.DOM.buttons.selectAll(".vzb-dialog-buttons > :not([data-dialogtype])").classed("vzb-hidden", true);
      this.DOM.buttons.selectAll(`[data-panel=${this._getPanelMode()}]`).classed("vzb-hidden", false);
    }

    _processFramesData() {
      const KEY = this.KEY;
      const data = new Map();
      this.model.getTransformedDataMap("filterRequired").each(frame => frame.forEach((valuesObj, key) => {
        if (!data.has(key)) data.set(key, { 
          [KEY]: key, 
          name: this._getCompoundLabelText(valuesObj)
        });
      }));
      return data;
    }

    _createFindList() {
      const findList = this.DOM.findList;
      const KEY = this.KEY;

      const data = [...this._processFramesData().values()];

      //sort data alphabetically
      data.sort((a, b) => (a.name < b.name) ? -1 : 1);

      this.DOM.findListItems = findList.text("").selectAll("div")
        .data(data, function(d) { return d[KEY]; })
        .join("div")
        .attr("class", "vzb-find-item vzb-dialog-checkbox")
        .call(this._createListItem.bind(this));
    }

    _createListItem(listItem) {
      listItem.append("input")
        .attr("type", "checkbox")
        .attr("class", "vzb-find-item")
        .attr("id", (d, i) => "-find-" + i + "-" + this.id)
        .on("change", (event, d) => {
          //clear highlight so it doesn't get in the way when selecting an entity
          if (!isTouchDevice()) this.MDL.highlighted.data.filter.delete(d);
          this.MDL.selected.data.filter.toggle(d);
          this.DOM.panelFind.node().scrollTop = 0;
          //return to highlighted state
          if (!isTouchDevice() && !d.brokenData) this.MDL.highlighted.data.filter.set(d);
        });

      listItem.append("label")
        .attr("for", (d, i) => "-find-" + i + "-" + this.id)
        .text(d => d.name)
        .on("mouseover", (event, d) => {
          if (!isTouchDevice() && !d.brokenData) this.MDL.highlighted.data.filter.set(d);
        })
        .on("mouseout", (event, d) => {
          if (!isTouchDevice()) this.MDL.highlighted.data.filter.delete(d);
        });
    }

    _getCompoundLabelText(d) {
      if (typeof d.label == "object") {
        return Object.entries(d.label)
          .filter(entry => entry[0] != this.MDL.frame.data.concept)
          .map(entry => isNumber(entry[1]) ? (entry[0] + ": " + entry[1]) : entry[1])
          .join(", ");
      }
      if (d.label != null) return "" + d.label;
      return d[Symbol.for("key")];
    }

    _updateBrokenData() {
      const currentDataMap = this.model.dataMap;
      const findListItems = this.DOM.findListItems;
      const KEY = this.KEY;

      findListItems.data().forEach(d => {
        d.brokenData = !currentDataMap.hasByStr(d[KEY]);
      });

      this._updateLabelTitle();
    }

    _updateLabelTitle() {
      const noDataSubstr = this.localise(this.MDL.frame.value) + ": " + this.localise("hints/nodata");
      this.DOM.findListItems.select("label")
        .classed("vzb-find-item-brokendata", d => d.brokenData)
        .attr("title", d => d.nameIfEllipsis + (d.brokenData ? (d.nameIfEllipsis ? " | " : "") + noDataSubstr : ""));
    }

    _updateView() {

    }

    _selectDataPoints() {
      //    const selected = this.model.state.marker.getSelected(KEY);
      const selected = this.MDL.selected.data.filter;
      this.DOM.findListItems.order().select("input")
      //      .property("checked", d => (selected.indexOf(d[KEY]) !== -1));
        .property("checked", function(d) {
          const isSelected = selected.has(d);
          d3.select(this.parentNode).classed("vzb-checked", isSelected);
          return isSelected;
        });
      
      const checkedItems = this.DOM.findList.selectAll(".vzb-checked");
      checkedItems
        .lower()
        .classed("vzb-separator", (d, i) => !i);    
    }

    _showHideSearch() {
      if (this._getPanelMode() !== "find") return;

      let search = this.DOM.input_search.node().value || "";
      search = search.toLowerCase();

      this.DOM.findList.selectAll(".vzb-find-item")
        .classed("vzb-hidden", d => {
          const lower = (d.name || "").toString().toLowerCase();
          return (lower.indexOf(search) === -1);
        });
    }

    _showHideButtons() {
      if (this._getPanelMode() !== "find") return;

      const someSelected = this.MDL.selected.data.filter.any();
      this.DOM.deselect_all.classed("vzb-hidden", !someSelected);
      this.DOM.opacity_nonselected.classed("vzb-hidden", !someSelected);
      if (someSelected) {
        mobx.runInAction(() => {
          const opacityNonSelectedSlider = this.findChild({ type: "SingleHandleSlider" });
          opacityNonSelectedSlider._updateSize();
          opacityNonSelectedSlider._updateView();
        });
      }
    }
  }

  Find.DEFAULT_UI = {
    enableSelectShowSwitch: false,
    enableMarkerSpaceOptions: false,
    panelMode: "find",
    enablePicker: false
  };

  const decorated = mobx.decorate(Find, {
    "MDL": mobx.computed
  });

  decorated$7.add("find", decorated);

  /*
   * Size dialog
   */

  class Opacity extends decorated$7 {
    constructor(config) {
      config.template = `
      <div class='vzb-dialog-modal'>
        <div class="vzb-dialog-title"> 
          <span data-localise="buttons/opacity"></span>
        </div>
            
        <div class="vzb-dialog-content">
          <p class="vzb-dialog-sublabel">
            <span data-localise="buttons/opacityRegular"></span>
          </p>
          <div class="vzb-dialog-bubbleopacity-regular"></div>

          <p class="vzb-dialog-sublabel">
            <span data-localise="buttons/opacityNonselect"></span>
          </p>
          <div class="vzb-dialog-bubbleopacity-selectdim"></div>
          </div>
        </div>

      </div>
    `;

      config.subcomponents = [{
        type: SingleHandleSlider,
        placeholder: ".vzb-dialog-bubbleopacity-regular",
        options: {
          value: "opacityRegular",
          submodel: "root.ui.chart"
        }
      },{
        type: SingleHandleSlider,
        placeholder: ".vzb-dialog-bubbleopacity-selectdim",
        options: {
          value: "opacitySelectDim",
          submodel: "root.ui.chart"
        }
      }];

      super(config);
    }
  }

  decorated$7.add("opacity", Opacity);

  exports.About = About;
  exports.Axes = Axes;
  exports.BaseComponent = BaseComponent;
  exports.BaseService = BaseService;
  exports.BrushSlider = decorated$b;
  exports.BubbleSize = BubbleSize;
  exports.Button = Button;
  exports.ButtonList = ButtonList;
  exports.CapitalVizabiService = CapitalVizabiService;
  exports.Chart = Chart;
  exports.ColorLegend = decorated$a;
  exports.Colors = Colors;
  exports.DataNotes = DataNotes;
  exports.DataWarning = DataWarning;
  exports.DateTimeBackground = decorated$9;
  exports.DeepLeaf = DeepLeaf;
  exports.Dialog = decorated$7;
  exports.Dialogs = Dialogs;
  exports.ErrorMessage = ErrorMessage;
  exports.Facet = Facet;
  exports.Find = decorated;
  exports.Icons = Icons;
  exports.IndicatorPicker = IndicatorPicker;
  exports.Label = Label;
  exports.Labels = decorated$8;
  exports.LayoutService = LayoutService;
  exports.LegacyUtils = LegacyUtils;
  exports.LocaleService = LocaleService;
  exports.Menu = Menu;
  exports.MinMaxInputs = decorated$6;
  exports.MoreOptions = MoreOptions;
  exports.Opacity = Opacity;
  exports.OptionsButtonList = OptionsButtonList;
  exports.PlayButton = PlayButton;
  exports.Presentation = Presentation;
  exports.Repeat = decorated$3;
  exports.Repeater = Repeater;
  exports.Show = Show;
  exports.SimpleCheckbox = SimpleCheckbox;
  exports.SingleHandleSlider = SingleHandleSlider;
  exports.Size = Size;
  exports.SizeSlider = SizeSlider;
  exports.SpaceConfig = SpaceConfig;
  exports.Speed = decorated$1;
  exports.SteppedSlider = decorated$5;
  exports.Technical = Technical;
  exports.TextEllipsis = TextEllipsis;
  exports.TimeDisplay = decorated$2;
  exports.TimeSlider = decorated$4;
  exports.TreeMenu = TreeMenu;
  exports.Utils = Utils;
  exports.Zoom = Zoom;
  exports.ZoomButtonList = ZoomButtonList;
  exports.axisSmart = axisSmart;
  exports.collisionResolver = collisionResolver;
  exports.updateRainbowLegend = updateRainbowLegend;
  exports.versionInfo = versionInfo;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=VizabiSharedComponents.js.map
