<?php

$api_result = json_decode(isset($_REQUEST['api_result']) ? $_REQUEST['api_result'] : "", true);

if(is_array($api_result) && isset($api_result['response']) && is_array($api_result['response'])) {
  $api_result = $api_result['response'];
  $isVisited = isset($api_result['info_visited']) && $api_result['info_visited'] == 1;
  $show_app = isset($_REQUEST['show_app']) && $_REQUEST['show_app'] == 1;

  if ($isVisited == false && $show_app == false) {
    echo file_get_contents('info.html');
    die();

  }
}
?>

<html>
  <head>
    <title>Поиск людей среди подписчиков</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="shortcut icon" href="//vk.com/images/faviconnew.ico" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content=" " />
    <link rel="stylesheet" type="text/css" href="//vk.com/css/al/common.css?276" />
    <link type="text/css" rel="stylesheet" href="//vk.com/css/al/search.css?37" />
    <link type="text/css" rel="stylesheet" href="//vk.com/css/al/im.css?37" />
    <link type="text/css" rel="stylesheet" href="//vk.com/css/ui_controls.css?27" />
    <link type="text/css" rel="stylesheet" href="//vk.com/css/al/stats.css?12" />
    <script type="text/javascript">
      var App = {
        api_id: '<?=$_GET['api_id'];?>',
        access_token: '<?=$_GET['access_token'];?>',
        viewer_id: <?=$_GET['viewer_id'];?>,
        base_url: 'http://ask.asmico.ru',
        user_id: <?=$_GET['user_id'];?>,
        api_result: <?=$_GET['api_result']?>,
        lang: <?=$_GET['language'];?>
      }, 
      cur = {
        followers: {},
        friends: {},
        stats: {}
      },
      vk = {
        al: 3
      };
    </script>
    <script type="text/javascript" src="//vk.com/js/al/common.js?2"></script>
    <script type="text/javascript" src="//vk.com/js/lib/ui_controls.js?"></script>
    <script type="text/javascript" src="js/lib/selects.js?"></script>
    <script type="text/javascript" src="//vk.com/js/api/xd_connection.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <style text="text/css">
      .im_friend:hover { background: #EDF1F5}
      #browsers { width: 300px; height: 115px; margin: 10px auto 0px; }
      #browsers a { float: left; width: 100px; height: 20px; padding: 80px 0px 7px; }
      #friends_query_progress { background: url("//vk.com/images/upload.gif") no-repeat scroll center center transparent; display: none; height: 23px; margin-left: -41px; margin-top: 1px; position: relative; width: 32px; z-index: 95}
    </style>
  </head>
  <body>
    <div id="app">
      <div id="content">
        <div class="tabs im_tabs t_bar clear_fix">
          <ul id="im_top_tabs" class="t0">
            <li id="search_content_tab" style="display: none;">
              <a onclick="followers.show()" name="qwe"><b class="tl1"><b></b></b><b class="tl2"></b>
                <b class="tab_word"><span id="main_tab_word">Подписчики</span> <span id="search_content_title"></span></b>
              </a>
            </li>
            <li id="profile_view_as_tab" class="active_link">
              <a onclick="friends.show()" name="qweqwe"><b class="tl1"><b></b></b><b class="tl2"></b>
                <b class="tab_word">Выбор пользователя</b>
              </a>
            </li>
          </ul>
        </div>

        <div id="profile_view_as" style="display: none;">
          <div style="background: #F7F7F7;padding: 10px;border-bottom: 1px solid #E7EAED;">
            <div class="search_input_cont fl_l" onclick="friends.search_click()">
              <div class="input_back_wrap no_select">
                <div class="input_back" id="input_friends_q" style="margin-top: 1px; padding-top: 5px; margin-bottom: 1px; z-index: 0; padding-bottom: 4px; margin-left: 1px; padding-left: 20px; margin-right: 1px; padding-right: 4px; ">
                  <div class="input_back_content" style="z-index:0">
                    Начните вводить имя друга или ссылку на пользователя
                  </div>
                </div> 
              </div>
              <input type="text" class="text" style="z-index: 1000; font-size:11px; height: 25px; width:510px; background-color: rgb(255, 255, 255);background: white url(//vk.com/images/magglass.png) no-repeat 5px 6px;padding: 5px 5px 5px 20px; " id="friends_query" placeholder="" onKeyup="friends.onkey();" autocomplete="off" value="" onblur="friends.onblur()">
            </div>
            <div id="friends_query_progress"  class="fl_l"></div>
            <div class="fl_r search_submit" style="width:87px;">
              <div class="button_blue button_wide">
                <button id="search_submit" onclick="followers.result();">Поиск</button>
              </div>
            </div>
             <br style="clear:both;" />
          </div>

          <div id="search_list"></div>
          <div id="friends_list"></div>
        </div>

        <div id="search_content" style="display:none;">
            <div id="search_query_wrap" class="wide clear_fix">
              <div class="clear_fix">
                <div class="search_isearch fl_l">
                  <div class="search_input_cont" onclick="followers.search_click()">
                    <div class="input_back_wrap no_select">
                      <div class="input_back" id="input_search_q" style="margin-top: 1px; padding-top: 5px; margin-bottom: 1px; z-index: 0; padding-bottom: 4px; margin-left: 1px; padding-left: 20px; margin-right: 1px; padding-right: 4px; ">
                        <div class="input_back_content" style="z-index:0">
                          Начните вводить имя подписчика
                        </div>
                      </div> 
                    </div>
                    <input type="text" class="text" style="z-index: 1000; font-size:11px; height: 25px; width:510px; background-color: rgb(255, 255, 255); " id="search_query" placeholder="" onKeyup="followers.onkey();" autocomplete="off" value="" onblur="followers.onblur()">
                  </div>

                  <div class="results_container" style="width: 512px;">
                    <div class="result_list_shadow" style="display: none; width: 512px;">
                      <div class="shadow1"></div>
                      <div class="shadow2"></div>
                    </div>
                  </div>
                </div>
                <div id="search_query_reset" class="fl_l" style="opacity: 0.5; "></div>
                <div id="search_query_progress" class="fl_l"></div>
                <div class="fl_r search_submit">
                  <div class="button_blue button_wide">
                    <button id="search_submit" onclick="followers.result();">Поиск</button>
                  </div>
                </div>
              </div>
              <div id="search_section_tabs" style="display:none;">
                <div id="search_followers_tab" class="search_subtab1 fl_l active" onmousedown="return followers.show(true);">
                  <div class="search_subtab2">
                    Подписчики
                  </div>
                </div>
                <div id="search_stats_tab" class="search_subtab1 fl_l " onmousedown="return stats.init();">
                  <div class="search_subtab2">
                    Аудитория
                  </div>
                </div>
              </div>
            </div>

            <div class="clear_fix" id="stats" style="display:none;position: relative;margin-left:20px;margin-top:20px;">
                <div id="wrapper_sex_chart" style="width:294px; height:130px;">
                  <div class="clear_fix">
                    <div id="wrapper_svg_sex_chart" class="fl_l" style="width: 130px; height: 130px; overflow: hidden;">
                      <embed id="svg_embed_sex_chart" src="js/piechart.svg?ver=10&amp;svgid=sex_chart&amp;dmn=vk.com" style="width: 100%; height: 100%;" preventhide="1">
                    </div>

                    <div id="rows_sex_chart" class="piechart_rows_root fl_l">
                      <div class="piechart_column fl_l">
                        <div id="piechart_row_sex_chart_0" class="piechart_row" onmouseover="if (cur.svgData['sex_chart']) cur.invokeSvgFunction('sex_chart', 'highlightSlice', [0, 1]); return false;" onmouseout="if (cur.svgData['sex_chart']) cur.invokeSvgFunction('sex_chart', 'highlightSlice', [0, 0]); return false;">
                          <span class="piechart_stat_name">мужчины</span>
                          <span class="piechart_stat_info" id="count_1_1"></span>
                        </div>
                        <div id="piechart_row_sex_chart_1" class="piechart_row" onmouseover="if (cur.svgData['sex_chart']) cur.invokeSvgFunction('sex_chart', 'highlightSlice', [1, 1]); return false;" onmouseout="if (cur.svgData['sex_chart']) cur.invokeSvgFunction('sex_chart', 'highlightSlice', [1, 0]); return false;" style="opacity: 1; ">
                          <span class="piechart_stat_name">женщины</span>
                          <span class="piechart_stat_info" id="count_1_0"></span>
                        </div>
                      </div>
                    </div>                
                  </div>
                </div>

                <div id="wrapper_age_chart" style="width:294px; height:130px;">
                  <div class="clear_fix">
                    <div id="wrapper_svg_age_chart" class="fl_l" style="width: 130px; height: 130px; overflow: hidden;">
                      <embed id="svg_embed_age_chart" src="js/piechart.svg?ver=10&amp;svgid=age_chart&amp;dmn=vk.com" style="width: 100%; height: 100%;" preventhide="1">
                    </div>
                    <div id="rows_age_chart" class="piechart_rows_root fl_l">
                      <div class="piechart_column fl_l"><div id="piechart_row_age_chart_0" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [0, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [0, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">до 18</span>
                        <span class="piechart_stat_info" id="count_2_1"></span>
                      </div>
                      <div id="piechart_row_age_chart_1" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [1, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [1, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 18 до 21</span>
                        <span class="piechart_stat_info" id="count_2_2"></span>
                      </div>
                      <div id="piechart_row_age_chart_2" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [2, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [2, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 21 до 24</span>
                        <span class="piechart_stat_info" id="count_2_3"></span>
                      </div>
                      <div id="piechart_row_age_chart_3" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [3, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [3, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 24 до 27</span>
                        <span class="piechart_stat_info" id="count_2_4"></span>
                      </div>
                      <div id="piechart_row_age_chart_4" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [4, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [4, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 27 до 30</span>
                        <span class="piechart_stat_info" id="count_2_5"></span>
                      </div>
                      <div id="piechart_row_age_chart_5" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [5, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [5, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 30 до 35</span>
                        <span class="piechart_stat_info" id="count_2_6"></span>
                      </div>
                      <div id="piechart_row_age_chart_6" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [6, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [6, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 35 до 45</span>
                        <span class="piechart_stat_info" id="count_2_7"></span>
                      </div>
                      <div id="piechart_row_age_chart_7" class="piechart_row" onmouseover="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [7, 1]); return false;" onmouseout="if (cur.svgData['age_chart']) cur.invokeSvgFunction('age_chart', 'highlightSlice', [7, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 45</span>
                        <span class="piechart_stat_info" id="count_2_8"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="wrapper_sex_age_chart" style="width:600px; height:270px;">
                <div class="clear_fix">
                  <div id="wrapper_svg_sex_age_chart" class="fl_l" style="width: 270px; height: 270px; overflow: hidden;">
                    <embed id="svg_embed_sex_age_chart" src="js/piechart.svg?ver=10&amp;svgid=sex_age_chart&amp;dmn=vk.com" style="width: 100%; height: 100%;" preventhide="1">
                  </div>
                  <div id="rows_sex_age_chart" class="piechart_rows_root fl_l">
                    <div class="piechart_column fl_l"><div class="piechart_col_header">женщины</div><div id="piechart_row_sex_age_chart_0" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [0, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [0, 0]); return false;">
                      <span class="piechart_stat_name">до 18</span>
                      <span class="piechart_stat_info" id="count_3_1"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_1" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [1, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [1, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 18 до 21</span>
                      <span class="piechart_stat_info" id="count_3_2"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_2" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [2, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [2, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 21 до 24</span>
                      <span class="piechart_stat_info" id="count_3_3"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_3" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [3, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [3, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 24 до 27</span>
                      <span class="piechart_stat_info" id="count_3_4"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_4" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [4, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [4, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 27 до 30</span>
                      <span class="piechart_stat_info" id="count_3_5"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_5" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [5, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [5, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 30 до 35</span>
                      <span class="piechart_stat_info" id="count_3_6"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_6" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [6, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [6, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 35 до 45</span>
                      <span class="piechart_stat_info" id="count_3_7"></span>
                    </div>
                    <div id="piechart_row_sex_age_chart_7" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [7, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [7, 0]); return false;" style="opacity: 1; ">
                      <span class="piechart_stat_name">от 45</span>
                      <span class="piechart_stat_info" id="count_3_8"></span>
                    </div>
                  </div>
                  <div class="piechart_column fl_l">
                    <div class="piechart_col_header">мужчины</div>
                      <div id="piechart_row_sex_age_chart_8" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [8, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [8, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">до 18</span>
                        <span class="piechart_stat_info" id="count_3_9"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_9" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [9, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [9, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 18 до 21</span>
                        <span class="piechart_stat_info" id="count_3_10"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_10" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [10, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [10, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 21 до 24</span>
                        <span class="piechart_stat_info" id="count_3_11"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_11" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [11, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [11, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 24 до 27</span>
                        <span class="piechart_stat_info" id="count_3_12"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_12" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [12, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [12, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 27 до 30</span>
                        <span class="piechart_stat_info" id="count_3_13"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_13" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [13, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [13, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 30 до 35</span>
                        <span class="piechart_stat_info" id="count_3_14"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_14" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [14, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [14, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 35 до 45</span>
                        <span class="piechart_stat_info" id="count_3_15"></span>
                      </div>
                      <div id="piechart_row_sex_age_chart_15" class="piechart_row" onmouseover="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [15, 1]); return false;" onmouseout="if (cur.svgData['sex_age_chart']) cur.invokeSvgFunction('sex_age_chart', 'highlightSlice', [15, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">от 45</span>
                        <span class="piechart_stat_info" id="count_3_16"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--div id="wrapper_cities_chart" style="width:400px; height:150px;">
                <div class="clear_fix">
                  <div id="wrapper_svg_cities_chart" class="fl_l" style="width: 150px; height: 150px; overflow: hidden;">
                    <embed id="svg_embed_cities_chart" src="js/piechart.svg?ver=10&amp;svgid=cities_chart&amp;dmn=vk.com" style="width: 100%; height: 100%;" preventhide="1">
                  </div>
                  <div id="rows_cities_chart" class="piechart_rows_root fl_l">
                    <div class="piechart_column fl_l">
                      <div id="piechart_row_cities_chart_0" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [0, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [0, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">Москва</span>
                        <span class="piechart_stat_info"> — <b>45.97%</b></span>
                      </div>
                      <div id="piechart_row_cities_chart_1" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [1, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [1, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">Київ</span>
                        <span class="piechart_stat_info"> — <b>18.92%</b></span>
                      </div>
                      <div id="piechart_row_cities_chart_2" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [2, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [2, 0]); return false;">
                        <span class="piechart_stat_name">Санкт-Петербург</span>
                        <span class="piechart_stat_info"> — <b>13.12%</b></span>
                      </div>
                      <div id="piechart_row_cities_chart_3" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [3, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [3, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">Донецьк</span>
                        <span class="piechart_stat_info"> — <b>5.03%</b></span>
                      </div>
                      <div id="piechart_row_cities_chart_4" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [4, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [4, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">Днiпропетровськ</span>
                        <span class="piechart_stat_info"> — <b>3.32%</b></span>
                      </div>
                      <div id="piechart_row_cities_chart_5" class="piechart_row" onmouseover="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [5, 1]); return false;" onmouseout="if (cur.svgData['cities_chart']) cur.invokeSvgFunction('cities_chart', 'highlightSlice', [5, 0]); return false;" style="opacity: 1; ">
                        <span class="piechart_stat_name">Інші</span>
                        <span class="piechart_stat_info"> — <b>13.63%</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div-->
            </div>

            <div id="followers">
              <div class="summary_wrap clear_fix" id="count_download">
                <div class="fl_r progress" id="feed_progress" style="display: none; "></div>
                <div class="summary" id="feed_summary">Ожидается выбор пользователя</div>
              </div>

              <table id="search_table" class="search_table" style="min-height:500px;">
                <tbody>
                  <tr>
                    <td id="results" class="results people_results"><div id="not_found" class="info_msg f_search" style="display: block;padding: 130px 10px;background: #F7F7F7;border: 1px solid #CCC;margin: 15px 5px;text-align: center;font-size: 12px;color: #777;border-image: initial;"><span class="by_search">В данный момент приложение загружает всех подписчиков. <br />Когда часть подписчиков будет загружена, Вы сможете начать поиск.</span></div></td>

                    <td id="filters_td" class="filters" style="font-size:11px;width:171px">
                      <div style="width:171px;" id="search_filters">
                        <form id="filter_form" name="filter_form">
                        <input type="hidden" id="q" name="c[q]" value="" />
                        <input type="hidden" id="section" name="c[section]" value="people" />
                        <input type="hidden" id="c[sort]" name="c[sort]" value="" />

                        <div class="noselect clear_fix filter_main " onselectstart="return false">
                          <div class="text fl_l">Регион</div>
                        </div>

                        <div class="inner_filter" id="region_filter">
                          <div id="cCountry" class="control">
                            <input id="country" name="c[country]" class="text" />
                          </div>
                          <div id="cCity" class="control" style="display: none">
                            <input id="city" name="c[city]" class="text" />
                          </div>
                        </div>
                        
                        <div class="noselect clear_fix filter_main " onselectstart="return false">
                            <div class="text fl_l">Возраст</div>
                          </div>

                          <div class="inner_filter" id="age_filter">
                            <div id="cAge" class="control clear_fix">
                              <div class="range_to fl_l">
                                <input id="ageFrom" name="c[age_from]" class="text" />
                              </div>
                              <div class="range_sep fl_l"> - </div>
                              <div class="range_to fl_l">
                                <input id="ageTo" name="c[age_to]" class="text" />
                              </div>
                            </div>
                          </div>

                          <input type="hidden" id="c[sex]" name="c[sex]" value="" />

                          <div class="noselect clear_fix filter_main sex" onselectstart="return false">
                          <div class="text fl_l">Пол</div>
                        </div>

                        <div class="inner_filter">
                          <div id="cSex" class="control">
                            <div class="radiobtn " onclick="radiobtn(this, 1, 'sex'); onSexChanged(1);"><div></div>Женский</div>
                            <div class="radiobtn " onclick="radiobtn(this, 2, 'sex'); onSexChanged(2);"><div></div>Мужской</div>
                            <div class="radiobtn on" onclick="radiobtn(this, 0, 'sex'); onSexChanged(0);"><div></div>Любой</div>
                          </div>
                        </div>

                        <div class="noselect clear_fix filter_main " onselectstart="return false">
                          <div class="text fl_l">Семейное положение</div>
                        </div>

                        <div class="inner_filter" id="marital_filter">
                          <div id="cStatus" class="control">
                            <input id="status" name="c[status]" class="text" />
                          </div>
                          <div style="font-size:11px;">
                            <input type="hidden" name="c[online]" id="online" value="0" />
                            <input type="hidden" name="c[only_photo]" id="only_photo" value="0" />
                            <input type="hidden" name="c[deleted]" id="deleted" value="1" />
                          </div>
                        </div> 
                      </form>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <script type="text/javascript">
      VK.init(function() {
        domReady();

        VK.api('storage.set', {key: "info_visited", value: 1}, function(r) {
          console.log(r)
        })
      });
    </script>
  </body>
</html>