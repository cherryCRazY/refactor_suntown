import React from 'react';

const main_preview_title_box = () => (
  <div className='main_preview_title_box'>
    <h2>Решения для <span className='company_color'>оптимизации</span> Вашего бизнеса</h2>
    <p>Наша компания предлагает услуги по <span className='company_color'>внедрению ESL-ценников</span>  – революционного маркетингового решения. Использование инновационной технологии цифровой бумаги позволяет централизованно  <span className='company_color'> в режиме реального времени следить за всеми изменениями рынка:</span> ценой, специальными предложениями, объемами партий.</p>
  </div>
);


const main_new_technology_text = () => (<div className='main_new_technology_text'>
  <h2>Внедряем <span className='company_color'>новые технологии</span></h2>
    <p>Технология ESL-ценников базируется на идее использования цифровых технологий в розничной торговле. Забудьте про неудобные бумажные этикетки, на которых несколько раз было изменено цену и дописано «акция», «цену снижено» или «специальное предложение». Мы предлагаем систематизированную online-систему контроля всей доступной покупателю информации. Только актуальные данные, мгновенная коррекция, оптимальные решения, максимальная оптимизация процесса. </p>
  </div>  
)

const main_abou_bottom_left_text = (about_pricer_line) => (
  <div className='main_abou_bottom_left_text'>
    <img className='about_pricer_line' src={about_pricer_line} alt=''/> 
    <p>Представители <span className='company_color'>«Сантаун-Украина»</span> являются постоянными участниками профильных мероприятий, на которых <span className='company_color'>демонстрируют преимущества новых технологических решений</span> для отечественных компаний и внедряют использование передовых мировых практик в украинской бизнес-среде.
 </p>
  </div>
)

const main_abou_bottom_text = (pricer_logo) => (
  <div className='main_abou_bottom_text'>
      <img className='pricer_logo' src={pricer_logo} alt=''/>
      <p>
      Компания <span className='company_color'>«Сантаун-Украина»</span>является официальным партнером корпорации Pricer – мирового лидера по внедрению систем ESL-ценников. Подробную информацию про компанию Pricer Вы можете найти по <a className='company_color' href='#'>ссылке.</a>
      </p>
  </div>
)

const main_description_text_box = () => (
  <div className='main_description_text_box'>
      <p>На сегодняшний день аналоговый бизнес сталкивается с все более широким кругом преград. Уплотнение времени, повышение динамичности событий, рост нагрузки на логистическую составляющую, рост конкуренции и многое другое. Единственный способ не только удержаться на плаву, но и выбиться в лидеры — быть лучшим, иметь безусловные преимущества. Все это требует от владельцев и управленцев решительных действий, направленных на максимальную оптимизацию рабочего процесса. Одним из актуальных решений является введение инновационной технологии ESL(electronic shelf labels). Это не просто технология, это новая маркетинговая философия, которая делает ставку на постоянные изменения торговой среды. Контроль за всеми процессами в режиме реального времени, централизованное управление, значительная экономия ресурсов и ускорение процесса выводят менеджмент на новый уровень.</p>
  </div>
)

const first_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Оптимизация работы</h3>
      <ul>
          <li>Любое решение может быть воплощено в жизнь буквально за несколько кликов.</li>
          <li>Простота интеграции системы с сервисами учета, мобильными приложениями, дополнительными опциями.</li>
          <li>Простота изменения схемы размещения товаров на прилавках, управления маркетинговыми активностями.</li>
      </ul>
  </div>
)

const second_main_advantages_test = () => (
  <div className='main_advantages_text'>
    <h3>Уменьшение затрат</h3>
    <ul>
        <li>Сокращение объемов ручной работы → освобождение дополнительного времени сотрудников, которое можно потратить на клиентов.</li>
        <li>Уменьшение производственных затрат на обновление информационных брошюр, производство ценников и их размещение в торговых залах.</li>
        <li>Оптимизация рабочего процесса сотрудников.</li>
    </ul>
  </div>
)

const third_main_advantages_test = () => (
  <div className='main_advantages_text'>
    <h3>Более качественный контроль</h3>
    <ul>
        <li>Систематизация и стандартизация как информации, так и методов ее донесения до покупателей.</li>
        <li>Единая система реестров.</li>
        <li>Централизованный механизм управления.</li>
        <li>Универсальная система защиты от радиопомех.</li>
    </ul>
  </div>
)

const fourth_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Абсолютно другой уровень компании</h3>
      <ul>
          <li>Инновационность решений.</li>
          <li>Статусность сервиса электронных ценников.</li>
          <li>Репутационный буст.</li>
      </ul>
  </div>
)

const fifth_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Дополнительное конкурентное преимущество.</h3>
      <ul>
          <li>Возможность избежать каких-либо рисков, связанных с недостоверными ценами.</li>
      </ul>
  </div>
)

const first_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>1</span>
      <div>
          <h4>Сокращай</h4>
          <p>РУЧНОЙ ТРУД: на печать, вырезание, сортировку и расстановку ценников.
ОШИБКИ: единая цена на ценнике и кассе при расчете в любое время.
ВРЕМЯ при перепланировке магазина
НЕГАТИВНОЕ ВЛИЯНИЕ «человеческого фактора» на </p>
      </div>
  </div>
)

const second_main_chart_text = () => (
  <div className='main_chart_text'>
  <span>2</span>
  <div>
      <h4>Выбирай</h4>
      <p>E-Paper/SmartFlash ХАРАКТЕРИСТИКА</p>
      <ul>
          <li>Четкая передача информации под любым углом при любой освещенности</li>
          <li>Разборчивость текста на расстоянии до 10 м</li>
          <li>Мгновенная активация ценника.</li>
          <li>Мощная общая подсветка</li>
          <li>Мягкая подсветка для рекламных материалов</li>
          <li>Малый расход заряда батареи</li>
      </ul>
  </div>
  </div>
)

const third_main_chart_text = () => (
  <div className='main_chart_text'>
    <span>3</span>
    <div>
        <h4>Наблюдай</h4>
        <p>УНИКАЛЬНАЯ ПЛАТФОРМА: связь и геолокация Экономичные Bluetooth (BLE) маячки для внутренней индикации Оптимизация маршрутов движения покупателей благодаря указанию места положения нужных продуктов Указание места положения самого покупателя внутри помещения BLE-маячки по умолчанию встроены в ИК-системы</p>
    </div>
  </div>
)

const fourth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>4</span>
      <div>
          <h4>Привлекай</h4>
          <p>SmartFlash ГЕОЛОКАЦИЯ</p>
          <ul>
              <li>Приложение «Click & Collect» (покупка и доставка)</li>
              <li>Stock-to-light / Task-to-light</li>
              <li>Списки покупок / Наличие товара</li>
              <li>Целевая реклама (доступ покупателя к WEB-страницам не отходя от полки)</li>
              <li>Совместимость со смартфонами.</li>
          </ul>
      </div>
  </div>
)

const fifth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>5</span>
      <div>
          <h4>Оптимизируй</h4>
          <p>ОПТИМИЗАЦИЯ ЗАТРАТ БЛАГОДАРЯ: • контролю остатков не отходя от полки управляемого мерчиндайзинга • сокращению количества пустых полок, указывая на сопутствующие товары • ценообразованию на основе спроса в режиме Online • увеличению эффективности всего персонала</p>
      </div>
  </div>
)

const sixth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>6</span>
      <div>
          <h4>Управляй доходами - управляй перспективами!</h4>
          <p>ИСПОЛЬЗОВАНИЕ ESL-систем поможет Вам: Мгновенно реагировать на ценовые изменение поставщиков Оперативно реагировать на изменение цен конкурентов Простота использования программ лояльности Гибкость управления маржей при акциях и распродажах Выделять самый интересный продукт сети БЫТЬ ИННОВАЦИОННЫМ - БЫТЬ ЛИДЕРОМ !!!</p>
      </div>
  </div>
)

const main_scope_text = () => (
  <div className='main_scope_text'>
      <h2>Сферы применения</h2>
      <p>Мы внедряем передовые технологии в широком спектре сфер деятельности. В первую очередь преимущества чувствуются в промышленности и логистике, где предотвращают задержки и сбои, связанные с человеческим фактором, а за счет системы управления дисплеями значительно снижается время комплектации товаров. Фармакология не стала исключением. Огромные ассортимент товаров, частые изменения в ценах, гибкая система скидок требуют постоянного и тщательного контроля — система Pricer становится все более популярной среди сетей аптек. В конце концов, в силу специфики и динамики работы, АЗС стали еще одними пользователями системы Pricer. Она дала возможность быстро реагировать на любые изменения и подстраивать под них цены, а также удобно контролировать все процессы за счет унифицированного управления.</p>
      {/* <div className='button_preview main_open_scope_button'>
          <span>Просмотреть</span>
          <svg className='arrow_right_img' xmlns='http://www.w3.org/2000/svg' width='46.932' height='23.774' viewBox='0 0 46.932 23.774'>
              <path d='M3250.754,4531.5h43.932l-14.434-10.6,14.434,10.6-14.434,10.171' 
                  transform='translate(-3249.254 -4519.397)' 
                  fill='none' 
                  stroke='#86b82a' 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth='3' />
          </svg>
      </div> */}
  </div>
)

const first_main_scope_line = (retail_img) => (
<div className='main_scope_line'>
  <div>
        <h3>Ритейл</h3>
        <p>Технологии ESL стали неотъемлемой составляющей ритейла. Использование этой инновации в масштабной розничной торговли <span className='company_color'>Экономия времени и ресурсов, в свою очередь, позволяют значительно повысить</span><span className='company_color'>эффективность и доходность</span> бизнеса.</p>
    </div>
    <img className='main_scope_line_img' src={retail_img} alt=''/>
</div>
)

const second_main_scope_line = (network_trade_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={network_trade_img} alt=''/>
      <div>
          <h3>Сетевая торговля</h3>
          <p>Сетевая торговля также по достоинству оценила преимущества данной технологии. Преимущества, которые предлагает данный маркетинговый инструмент, позволяют значительно <span className='company_color'>оптимизировать рабочий процесс, выиграв время и сократив расходы</span>, что в свою очередь стимулирует развитие сети и дает ей дополнительное <span className='company_color'>конкурентное преимущество.</span></p>
      </div>
  </div>
)

const third_main_scope_line = (scope_first_line, refueling_img) => (
  <div className='main_scope_line'>
      <img className='scope_first_line' src={scope_first_line} alt=''/>
      <div>
          <h3>АЗС</h3>
          <p>В конце концов, в силу специфики и динамики работы, <span className='company_color'>АЗС</span> стали еще одними пользователями системы Pricer. Она дала <span className='company_color'>возможность быстро реагировать на любые изменения и подстраивать под них цены</span>, а также удобно <span className='company_color'>контролировать</span> все процессы за счет унифицированного управления.</p>
      </div>
      <img className='main_scope_line_img' src={refueling_img} alt=''/>
  </div>
)

const fourth_main_scope_line = (pharmacy_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={pharmacy_img} alt=''/>
      <div>
          <h3>Аптеки</h3>
          <p>Фармакология не стала исключением. <span className='company_color'>Огромный ассортимент товаров, частые изменения в ценах, гибкая система скидок</span> требуют постоянного и тщательного контроля — система Pricer становится все более популярной среди сетей аптек. </p>
      </div>
  </div>
)

const fifth_main_scope_line = (scope_second_line, industry_img) => (
  <div className='main_scope_line'>
      <img className='scope_second_line' src={scope_second_line} alt=''/>
      <div>
          <h3>Промышленность и АПК</h3>
          <p>Мы внедряем передовые технологии в широком спектре сфер деятельности. В первую очередь преимущества чувствуются в <span className='company_color'>промышленности и логистике</span>, где <span className='company_color'>предотвращают задержки и сбои, связанные с человеческим фактором</span>, а за счет системы управления дисплеями значительно сокращается время комплектации товаров.</p>
      </div>
      <img className='main_scope_line_img' src={industry_img} alt=''/>
  </div>
)

const sixth_main_scope_line = (_industry_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={_industry_img} alt=''/>
      <div>
          <p>Этим сфера использования наших продуктов не ограничивается. <span className='company_color'>Любая компания</span>, которая имеет дело с учетом товаров может воспользоваться всеми <span className='company_color'>преимуществами</span> нашей системы.</p>
      </div>
  </div>
)

const footer = () => (
  <footer className='footer'>
      <div>
          <p>Все права защищены 2019 SunTown</p>
      </div>
  </footer>
)

export default {
  main_preview_title_box,
  main_new_technology_text,
  main_abou_bottom_left_text,
  main_abou_bottom_text,
  main_description_text_box,
  first_main_advantages_test,
  second_main_advantages_test,
  third_main_advantages_test,
  fourth_main_advantages_test,
  fifth_main_advantages_test,
  first_main_chart_text,
  second_main_chart_text,
  third_main_chart_text,
  fourth_main_chart_text,
  fifth_main_chart_text,
  sixth_main_chart_text,
  main_scope_text,
  first_main_scope_line,
  second_main_scope_line,
  third_main_scope_line,
  fourth_main_scope_line,
  fifth_main_scope_line,
  sixth_main_scope_line,
  footer
}