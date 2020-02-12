$(function () {
  /*- Tabs --------------
  - Контейнеру кнопок задаем класс j-tabs
  и указываем целевой контейнер в атрибуте data-target

  - Кнопкам задаем класс j-tab-item

  - Контейнеру контентных блоков j-tabs-content-container и идентификатор data-tabs-content

  - Контентным блокам j-tab-content

  - Активная вкладка должна иметь класс is-active

  Порядок Кнопок относительно Контентных блолков определяется автоматически, или атрибутом data-tab-index у кнопок(отсчет с 0) / ----*/

  const intitTabs = () => {
    const $allTabs = $('.j-tabs');

    $allTabs.each((i, element) => {
      const $tab = $(element).find('.j-tab-item');

      if ($tab.hasClass('is-active')) {
        const context = $(element).attr('data-target');
        const isSetDataIndex = $(element).find('[data-tab-index]').length;
        let index = undefined;

        if (isSetDataIndex) {
          index = $tab.closest('.is-active').attr('data-tab-index');
        } else {
          index = $tab.closest('.is-active').index();
        }

        const $contentContainer = $(`[data-tabs-content='${context}'`);
        const $contentItem = $contentContainer.find('.j-tab-content');

        //- Задаем класс is-active для вкладки соответствующей активной кнопке
        //- Задаем высоту контейнера равную высоте активной вкладки
        $contentContainer.height($contentItem.eq(index).addClass('is-active').innerHeight());
      }
    });
  };

  intitTabs();


  const $tab = $('.j-tab-item');

  $tab.click(function (e) {
    const $tabs = $(this).closest('.j-tabs');
    const context = $tabs.attr('data-target');
    const $contentContainer = $(`[data-tabs-content='${context}'`);
    const $contentItem = $contentContainer.find('.j-tab-content');

    const isSetDataIndex = $tabs.find('[data-tab-index]').length;
    let index = undefined;

    if (isSetDataIndex) {
      index = $(this).attr('data-tab-index');
    } else {
      index = $(this).index();
    }

    $tab.removeClass('is-active');
    $(this).addClass('is-active');

    $contentItem.removeClass('is-active');
    //- Задаем класс is-active для вкладки соответствующей активной кнопке
    //- Задаем высоту контейнера равную высоте активной вкладки
    $contentContainer.height($contentItem.eq(index).addClass('is-active').innerHeight());
  });
});
