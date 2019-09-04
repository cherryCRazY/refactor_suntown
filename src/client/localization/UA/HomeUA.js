import React from 'react';

const main_preview_title_box = () => (
  <div className='main_preview_title_box'>
    <h2>Рішення для <span className='company_color'>оптимізації</span> Вашого бізнесу</h2>
    <p>Наша компанія пропонує послуги з <span className='company_color'>впровадження ESL-цінників</span>  – революційного маркетингового рішення. Використання інноваційної технології цифрового паперу дозволяє централізовано  <span className='company_color'>в режимі реального часу слідкувати за всіма змінними ринку:</span> ціною, спеціальними пропозиціями, обсягами партій. </p>
  </div>
);


const main_new_technology_text = () => (<div className='main_new_technology_text'>
  <h2>Впроваджуємо <span className='company_color'>нові технології</span></h2>
    <p>Технологія ESL-цінників базується на ідеї використання цифрових технологій в роздрібній торгівлі. Забудьте про незручні паперові етикетки, на яких кілька разів було змінено ціну й дописано «акція», «ціну знижено» або «спеціальна пропозиція». Ми пропонуємо систематизовану online систему контролю всієї доступної покупцеві інформації. Тільки актуальні дані, миттєва корекція, оптимальні рішення, максимальна оптимізація процесу.</p>
  </div>  
)

const main_abou_bottom_left_text = (about_pricer_line) => (
  <div className='main_abou_bottom_left_text'>
    <img className='about_pricer_line' src={about_pricer_line} alt=''/> 
    <p>Представники <span className='company_color'>«Сантаун-Україна»</span> є постійними учасниками профільних заходів, на яких <span className='company_color'>демонструють переваги нових технологічних рішень</span> для вітчизняних компаній та впроваджують використання передових світових практик в українському бізнес-середовищі. </p>
  </div>
)

const main_abou_bottom_text = (pricer_logo) => (
  <div className='main_abou_bottom_text'>
      <img className='pricer_logo' src={pricer_logo} alt=''/>
      <p>
          Компанія <span className='company_color'>«Сантаун-Україна»</span>є офіційним партнером корпорації Pricer – світового лідера з впровадження систем ESL-цінників. Детальнішу інформацію про компанію Pricer Ви можете знайти за <a className='company_color' href='#'>посиланням.</a>
      </p>
  </div>
)

const main_description_text_box = () => (
  <div className='main_description_text_box'>
      <p>На сьогоднішній день аналоговий бізнес зіштовхується з дедалі ширшим колом перешкод. Ущільнення часу, підвищення динамічності подій, зростання навантаження на логістичну складову, зростання конкуренції і багато іншого. Єдиний спосіб не лише втриматися на плаву, але і вибитися в лідери – бути кращим, мати безсумнівні переваги. Все це вимагає від власників та управлінців рішучих дій, направлених на максимальну оптимізацію робочого процесу. Одним із актуальних рішень є введення інноваційної технології ESL(electronic shelf labels). Це не просто технологія, це нова маркетингова філософія, яка робить ставку на постійні зміни торгівельного середовища. Контроль за всіма процесами в режимі реального часу, централізоване управління, значна економія ресурсів та пришвидшення процесу виводять менеджмент на новий рівень.</p>
  </div>
)

const first_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Оптимізація роботи</h3>
      <ul>
          <li>Будь-яке рішення може бути втілене в життя буквально в декілька кліків.</li>
          <li>Простота інтеграції системи із сервісами обліку, мобільними додатками, додатковими опціями.</li>
          <li>Простота зміни схеми розміщення товарів на прилавках, управління маркетинговими активностями.</li>
      </ul>
  </div>
)

const second_main_advantages_test = () => (
  <div className='main_advantages_text'>
    <h3>Зменшення витрат</h3>
    <ul>
        <li>Скорочення обсягів ручної праці → вивільнення додаткового часу співробітників, який можна витратити на клієнтів.</li>
        <li>Зменшення виробничих витрат на оновлення інформаційних брошур, виробництво цінників та їх розміщення в торгових залах</li>
        <li>Оптимізація робочого процесу співробітників.</li>
    </ul>
  </div>
)

const third_main_advantages_test = () => (
  <div className='main_advantages_text'>
    <h3>Якісніший контроль</h3>
    <ul>
        <li>Систематизація та стандартизація як інформації так і методів її донесення до покупців.</li>
        <li>Єдина система реєстрів.</li>
        <li>Централізований механізм управління.</li>
        <li>Універсальна система захисту від радіоперешкод.</li>
    </ul>
  </div>
)

const fourth_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Абсолютно інший рівень компанії</h3>
      <ul>
          <li>Інноваційність рішень.</li>
          <li>Статусність сервісу електронних цінників.</li>
          <li>Репутаційний буст</li>
      </ul>
  </div>
)

const fifth_main_advantages_test = () => (
  <div className='main_advantages_text'>
      <h3>Додаткова конкурентна перевага</h3>
      <ul>
          <li>Можливість уникнути будь-яких ризиків, пов’язаних з недостовірними цінами.</li>
      </ul>
  </div>
)

const first_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>1</span>
      <div>
          <h4>Скорочуй</h4>
          <p>РУЧНУ ПРАЦЮ: на друк, вирізання, сортування та розстановку цінників ПОМИЛКИ: єдина ціна на ціннику і касі при розрахунку в любий час ЧАС, при переплануванні магазину НЕГАТИЧНИЙ ВПЛИВ «людського фактору» на налагоджений процес роботи. </p>
      </div>
  </div>
)

const second_main_chart_text = () => (
  <div className='main_chart_text'>
  <span>2</span>
  <div>
      <h4>Обирай</h4>
      <p>E-Paper/SmartFlash ХАРАКТЕРИСТИКА</p>
      <ul>
          <li>Чітка передача інформації під будь-яким кутом при будь-якому освітленні</li>
          <li>Розбірливість тексту на відстані до 10 м</li>
          <li>Миттєва активація цінника</li>
          <li>Потужне загальне підсвічування</li>
          <li>М’яке підсвічування для рекламних матеріалів</li>
          <li>Мала витрата (втрата) заряду батареї</li>
      </ul>
  </div>
  </div>
)

const third_main_chart_text = () => (
  <div className='main_chart_text'>
    <span>3</span>
    <div>
        <h4>Спостерігай</h4>
        <p>УНІКАЛЬНА ПЛАТФОРМА: зв’язок та геолокація. Економічні Bluetooth(BLE)-маячки для внутрішньої індикації. Оптимізація маршрутів руху покупців завдяки зазначенню місця розташування необхідних продуктів. Зазначення місця розташування самого покупця всередині приміщення. BLE-маячки за замовчуванням вмонтовані в ІЧ-системи.</p>
    </div>
  </div>
)

const fourth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>4</span>
      <div>
          <h4>Залучай</h4>
          <p>SmartFlash ГЕОЛОКАЦІЯ</p>
          <ul>
              <li>Додаток «Click & Collect» (купівля та доставка)</li>
              <li>Stock-to-light / Task-to-light</li>
              <li>Списки (переліки) покупок / Наявність товару</li>
              <li>Цільова реклама (доступ покупця до WEB-сторінок не відходячи під полиці)</li>
              <li>Сумісність із смартфонами.</li>
          </ul>
      </div>
  </div>
)

const fifth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>5</span>
      <div>
          <h4>Оптимізуй</h4>
          <p>ОПТИМІЗАЦІЯ ВИТРАТ ЗАВДЯКИ: Контролю залишків не відходячи від полиці керованого мерчандайзингу Скороченню кількості порожніх полиць, вказуючи на супутні товари Ціноутворення на основі попиту в режимі Online Збільшення ефективності всього персоналу</p>
      </div>
  </div>
)

const sixth_main_chart_text = () => (
  <div className='main_chart_text'>
      <span>6</span>
      <div>
          <h4>Керуй доходами – керуй перспективами!</h4>
          <p>ИСПОЛЬЗОВАНИЕ ESL-систем поможет Вам: Мгновенно реагировать на ценовые изменение поставщиков Оперативно реагировать на изменение цен конкурентов Простота использования программ лояльности Гибкость управления маржей при акциях и распродажах Выделять самый интересный продукт сети БЫТЬ ИННОВАЦИОННЫМ - БЫТЬ ЛИДЕРОМ !!!</p>
      </div>
  </div>
)

const main_scope_text = () => (
  <div className='main_scope_text'>
      <h2>Сфери застосування</h2>
      <p>Ми впроваджуємо передові технології в широкому спектрі галузей діяльності. В першу чергу переваги відчуваються в промисловості та логістиці, де запобігають затримкам і збоям, пов’язаним з людським фактором, а за рахунок системи управління дисплеями значно знижується час комплектації товарів. Фармакологія не стала винятком. Величезний асортимент товарів, часті зміни в цінах, гнучка система знижок вимагають постійного і ретельного контролю - система Pricer стає все більш популярною серед аптечних мереж. Зрештою, в силу специфіки та динаміки роботи, АЗС стали ще одними користувачами системи Pricer. Вона відкрила можливість швидко реагувати на будь-які зміни та підлаштовувати під них ціни, а також зручно контролювати всі процеси за рахунок уніфікованого управління.</p>
      {/* <div className='button_preview main_open_scope_button'>
          <span>Переглянути</span>
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
        <h3>Рітейл</h3>
        <p>ESL-цінники стали невід’ємною складовою рітейл-технологій. Використання цієї інновації в масштабній роздрібній торгівлі <span className='company_color'>допомагає швидко реагувати на зміни, відповідати запитам покупців та завжди тримати їх в курсі.</span> Економія часу та ресурсів, в свою чергу, дозволяють значно підвищити <span className='company_color'>ефективність та доходність</span> бізнесу.</p>
    </div>
    <img className='main_scope_line_img' src={retail_img} alt=''/>
</div>
)

const second_main_scope_line = (network_trade_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={network_trade_img} alt=''/>
      <div>
          <h3>Мережева торгівля</h3>
          <p>Мережева торгівля також гідно оцінила переваги інноваційної технології ESL-цінників. Переваги, які пропонує даний маркетинговий інструмент дозволяють значно <span className='company_color'>оптимізувати робочий процес, вигравши час та скоротивши витрати</span>, що в свою чергу стимулює розвиток мережі та дає їй додаткову <span className='company_color'>конкурентну перевагу.</span></p>
      </div>
  </div>
)

const third_main_scope_line = (scope_first_line, refueling_img) => (
  <div className='main_scope_line'>
      <img className='scope_first_line' src={scope_first_line} alt=''/>
      <div>
          <h3>АЗС</h3>
          <p>Зрештою, в силу специфіки та динаміки роботи, <span className='company_color'>АЗС</span> стали ще одними користувачами системи Pricer. Вона відкрила <span className='company_color'>можливість швидко реагувати на будь-які зміни та підлаштовувати під них ціни</span>, а також зручно <span className='company_color'>контролювати</span> всі процеси за рахунок уніфікованого управління.</p>
      </div>
      <img className='main_scope_line_img' src={refueling_img} alt=''/>
  </div>
)

const fourth_main_scope_line = (pharmacy_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={pharmacy_img} alt=''/>
      <div>
          <h3>Аптеки</h3>
          <p>Фармакологія не стала винятком. <span className='company_color'>Величезний асортимент товарів, часті зміни в цінах, гнучка система знижок</span> вимагають постійного і ретельного контролю - система Pricer стає все більш популярною серед аптечних мереж. </p>
      </div>
  </div>
)

const fifth_main_scope_line = (scope_second_line, industry_img) => (
  <div className='main_scope_line'>
      <img className='scope_second_line' src={scope_second_line} alt=''/>
      <div>
          <h3>Промисловість та АПК</h3>
          <p>Ми впроваджуємо передові технології в широкому спектрі галузей діяльності. В першу чергу переваги відчуваються в <span className='company_color'>промисловості та логістиці</span>, де <span className='company_color'>запобігають затримкам і збоям, пов’язаним з людським фактором</span>, а за рахунок системи управління дисплеями значно знижується час комплектації товарів.</p>
      </div>
      <img className='main_scope_line_img' src={industry_img} alt=''/>
  </div>
)

const sixth_main_scope_line = (_industry_img) => (
  <div className='main_scope_line'>
      <img className='main_scope_line_img' src={_industry_img} alt=''/>
      <div>
          <p>Цим сфера використання наших продуктів не обмежується. <span className='company_color'>Будь-яка компанія</span>, яка має справу з обліком товарів може скористатися всіма <span className='company_color'>перевагами</span> нашої системи.</p>
      </div>
  </div>
)

const footer = () => (
  <footer className='footer'>
      <div>
          <p>Всі права захищені 2019 © SunTown</p>
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