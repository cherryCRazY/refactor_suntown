import React from 'react'

const container_about_us_preview_box = preview_img => (
  <div className='container about_us_preview_box'>
    <div>
      <h2>Як працює ця система</h2>
      <p>Архітектура системи дозволяє використовувати в одній структурі від <span className='company_color'>5 до 100 тисяч цінників</span>, а потужне програмне забезпечення робить можливим використання <span className='company_color'>до 5 000 рішень паралельно</span> в рамках одної замкненої системи. <span className='company_color'>Площа роботи базової станції становить до 5 000 кв.м.</span> Додатково <span className='company_color'>можна приєднати до 32 приймачів-передатчиків</span>, які живляться за рахунок локальної мережі. Кожний такий <span className='company_color'>передатчик охоплює площу до 170 кв. м.</span> Така система гарантує високу швидкість передачі сигналів та їх захищеність від РЧ-перешкод. Використання двонаправленої системи зв’язку дозволяє своєчасно слідкувати за усіма компонентами і одразу реагувати на нештатні ситуації. До того ж, можливість отримувати звіти про роботу в режимі реального часу значно спрощує процедуру збору інформації та її подальшого аналізу. Такі рішення можуть використовуватись при роботі як з локальними, так і з централізованими/хмарними системами. Власна повноцінна <span className='company_color'>IP-архітектура дозволяє додавати нові компоненти і дистанційно ними керувати.</span></p>
    </div>
    <img src={preview_img} className='about_us_preview_img' alt='' />
  </div>
)

const about_us_preview_description_top = () => (
  <p className='about_us_preview_description_top'>
  Власна архітектура програмного забезпечення гарантує надійну взаємодію з різноманітними мобільними додатками, в тому числі багатоканальні підключення. <span className='company_color'>Система Pricer може використовуватися користувацькими програмами для обробки електронної документації</span> в якості базової платформи, а також для взаємодії з іншими сторонніми додатками.
  </p>
)

const about_us_preview_description_bottom = () => (
  <div className='about_us_preview_description_bottom'>
    <p>Провайдер <span className='company_color'>№1</span> в сегменті систем електронних цінників.</p>
    <ul>
      <li>Заснована у 1991 році у Швеції.</li>
      <li>Дистриб’юторська мережа охоплює більше 50 країн.</li>
      <li>Більш ніж 13500 обладнаних об’єктів в усьому світі.</li>
      <li>Встановлено більше <span className='company_color'>140 мільйонів ESL-систем.</span></li>
      <li>Pricer співпрацює з лідируючими торговими мережами Європи, Америки та Азії.</li>
      <li>Використовуються найновіші технології передачі ІЧ-команд.</li>
    </ul>
  </div>
)

const about_us_task_box = task_img => (
  <div className='container about_us_task_box'>
    <h2>Завдання</h2>
    <div className='about_us_task_line'>
      <img className='task_picture' src={task_img} />
      <div>
        <p>Повний контроль за рахунок функції зворотного зв’язку, яка навіть при передачі великих обсягів інформації гарантує надійність і, при цьому, не призводить до зменшення ресурсу батареї. Дозволяє знати не лише дані на ціннику, а <span className='company_color'>і дає впевненість</span> у тому, що електронний цінник знаходиться в належному місці і коректно функціонує.</p>
        <ul>
          <li>Надати високий ступінь захищеності від наведень з іншого устаткування, що працює в промисловому діапазоні частот (ISM). Дозволяє системі спокійно працювати в безпосередній близькості до інших життєво важливих профільних додатків, що використовують діапазон <span className='company_color'>вище 2.4 ГГц або 800-900 МГц.</span></li>
          <li>Пришвидшення роботи з можливістю подальшого збільшення швидкості після переходу торгівельних майданчиків на багатоканальні системи. Передбачається, що в майбутньому швидкість роботи подібних систем буде основним конкурентним параметром.</li>
          <li>Оптимізація робочого процесу за рахунок використання ближнього зв’язку <span className='company_color'>NFC та високої швидкості</span> відповіді при мінімальній затримці.</li>
          <li>Забезпечення надійної взаємодії з іншими пристроями зв’язку для геолокації, а також геолокації всередині приміщення.</li>
          <li>Підтримка роботи з сегментними та графічними дисплеями, що дозволяє отримати економічну вигоду і, при цьому, передавати значні обсяги інформації.</li>
          <li>Підтримка сумісності зі смартфонами для зручної взаємодії з іншими додатками.</li>
        </ul>
      </div>
    </div>
  </div>
)

const about_us_advantages = advantages_img => (
  <div className='container about_us_advantages'>
    <h2>Переваги</h2>
    <div className='about_us_task_line'>
      <div>
        <p>Можливість подачі персоніфікованої інформації користувачів за рахунок зчитування та обробки даних.</p>
        <ul>
          <li><span className='company_color'>100% надійність</span>, своєчасне оновлення інформації та простота перевірки й контролю завдяки перевіреній системі двонаправленої передачі ІЧ-команд на частоті 1.24 МГц.</li>
          <li>Надійна робота системи; безпека; дотримання частотного діапазону; захищеність від радіоперешкод та захист даних, що передаються; збільшений ресурс батарей.</li>
          <li>Найвища швидкість отримання оновлень на ринку – <span className='company_color'>до 90 000 циклів</span> оновлення пам’яті на годину. </li>
          <li>Висока швидкість роботи, ширина робочого діапазону, функція самодіагностики.</li>
          <li>Функція точкового доосвітлення, яка активується дистанційно.</li>
          <li><span className='company_color'>Функція інтерактивних ярликів, що значно полегшує інформаційний супровід товарів</span>, що продаються, а також оновлення даних в режимі реального часу.</li>
          <li>Функція геолокації всередині великих приміщень, а також покращені планограми.</li>
        </ul>
      </div>
      <img className='advantages_picture' src={advantages_img} alt='' />
    </div>
  </div>
)

const first_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>Великий екран, що підходить для певного типу вивісок, наприклад фруктів/ овочей, або електронних приладів</li>
      <li>Можливість налаштування спалаху під клієнта або місцезнаходження співробітника (затримка / реактивність до 4 сек)</li>
      <li>Наявність  графічного відображення електронних документів для різних ракурсів читання</li>
      <li>Колір дисплея - чорно-білий/ чорний, білий та червоний</li>
      <li>Термін служби батареї - до 7 років (лідер галузі)</li>
      <li>Змінні батареї (відповідають міжнародним кодам пожежної безпеки)</li>
      <li>Високошвидкісна двостороння комунікація</li>
      <li>Автоматизована геолокація</li>
      <li>Наявність NFC </li>
      <li>Унікальний задній слот (SmartCLIP) для адаптації товарів або технологій (M / L)</li>
      <li>Міцний корпус і фронтальний захист</li>
    </ol>
  </div>
)

const second_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>Колір дисплея: чорний, білий та червоний</li>
      <li>Налаштування спалаху світла в залежності від  місцезнаходження клієнта або співробітника (реактивність до 4 сек)</li>
      <li>Ідеальна читабельність з різних ракурсів</li>
      <li>Термін експлуатації батареї - до 7 років  (лідер галузі)</li>
      <li>Змінний акумулятор (відповідно до міжнародних стандартів пожежної безпеки)</li>
      <li>Надшвидкий двосторонній зв'язок (до 25000 комплексних оновлень на годину)</li>
      <li>Автоматична геолокація</li>
      <li>Наявність NFC </li>
      <li>Запатентована конструкція для встановлення SmartCLIP та  стоп-промені (М / Л)</li>
      <li>Міцний корпус і фронтальний захист</li>
    </ol>
  </div>
)

const third_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>
      Електронний ярлик зі смарт-спалахом
                      </p>
    <ol>
      <li>Можливість спалаху, що видимий з висоти до 10 метрів, налаштовується на місцезнаходження клієнта або певну локацію</li>
      <li>Графічний дисплей для найкращої зручності читання при будь-яких обставинах</li>
      <li>Запатентована система ESL,  розроблена спеціально для морозильних середовищ</li>
      <li>Тільки ESL : термін експлуатації до 7 років у середовищі морозильника + змінна касета акумулятора (без втручання в корпус)</li>
      <li>Двостороння комунікація, обов'язкова для геолокаційних рішень</li>
    </ol>
  </div>
)

const fourth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>Можливість налаштування спалаху під клієнта або місцезнаходження співробітника (затримка / реактивність до 4 сек)</li>
      <li>Графічний дисплей, що забезпечує ідеальну читабельність з різних ракурсів</li>
      <li>Запатентований ESL,  розроблений спеціально для морозильних середовищ</li>
      <li>Термін служби батареї до 7 років (лідер галузі)</li>
      <li>Змінна касета акумулятора (відповідає міжнародним кодам)</li>
      <li>Високошвидкісна двостороння комунікація (до 20 000 повних оновлень на годину)</li>
      <li>Автоматизована геолокація</li>
      <li>Наявність NFC </li>
      <li>Запатентована конструкція для встановлення SmartCLIP та  стоп-промені (М / Л)</li>
      <li>Міцний корпус і фронтальний захист</li>
    </ol>
  </div>
)

const fifth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>Найбільший екран, що здебільшого використовується для позначення фруктів та овочів, а також побутової техніки.</li>
      <li>Передбачається налаштування спалаху під вимоги клієнта або відповідного місцезнаходження (Затримка/час відповіді до 4 секунд).</li>
      <li>Графічний дисплей з електронного паперу для ширшого кута читабельності. </li>
      <li>Чорно-білий дисплей або ж дисплей чорного, білого та червоного кольорів.</li>
      <li>Батарея тримає заряд до 7 років (лідер в індустрії).</li>
      <li>Змінні блоки акумуляторів (відповідають міжнародним пусковим кодам/кодам протипожежної безпеки).</li>
      <li>Високошвидкісний двосторонній зв’язок.</li>
      <li>Автоматизована геолокація.</li>
      <li>Робочий NFC.</li>
      <li>Надійний корпус.</li>
    </ol>
  </div>
)

const sixth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>Дійсно революційний винахід в сфері електронних цінників, який виводить ці пристрої на новий рівень ефективності. Використання високоякісної оптики дозволило збільшити кут огляду до гарантованих 180 градусів, а віддалення, на якому чітко видно всю інформацію, до 10 м. Поєднання фірмових комплектуючих, високоякісної оптики, використання світлового випромінювання особливо спектра, а також системна архітектура з надмалим енергоспоживанням роблять це рішення дуже економічно привабливим, так як термін експлуатації такого пристрою (без заміни батарей) досягає п’яти років.<br />Переваги:</p>
    <ol>
      <li>Миттєва активація цінника</li>
      <li>Розбірливість тексту на відстані до 10 м.</li>
      <li>Потужна загальна підсвітка</li>
      <li>М’яка підсвітка для рекламних матеріалів</li>
      <li>Мала витрата заряду батареї.</li>
    </ol>
  </div>
)

const seventh_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>Зазначення місця розташування самого покупця всередині приміщення</li>
      <li>BLE-маячки за замовченням вмонтовані в ІЧ-системи.</li>
    </ol>
  </div>
)

const eighth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>Додаток «Click & Collect» (покупка і доставка)</p>
    <ol>
      <li>Виконує завантаження в електронний пристрій покупця списку его покупок. ESL-система автоматично перевіряє наявність необхідних товарів.</li>
      <li>Додаток направляє покупця до найближчого доступного товару. На електронній схемі магазина додаток автоматично будує найбільш оптимальний маршрут руху (до полиць, кас, точки доставки товару).</li>
      <li>При наближенні до потрібного товару його електронний цінник починає блимати (відстань змінюється за бажанням). Після того, як покупець взяв товар з полиці, програма автоматично видалить його зі списку покупок, а ярлик товару перестає блимати.</li>
      <li>Ярлик товару при наближенні покупця починає блимати.</li>
    </ol>
  </div>
)

const nineth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <ol>
      <li>SmartFlash:  Click & Collect, task-to-light і перевірка наявності товару.</li>
      <li>Вмонтовані BLE-маячки для додатку геолокації.</li>
      <li>Ближній зв’язок NFC для роботи з електронними пристроями покупця.</li>
      <li>QR-коди для швидкого переходу до необхідного товару.</li>
    </ol>
  </div>
)

const tenth_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>Об’єднуйте в одному широкоформатному екрані одразу декілька пропозицій, створюйте набори шаблонів на свій смак і вказуйте прямі посилання на продукти.<br />Переваги:</p>
    <ol>
      <li>Можливість швидкої зміни вказаних позицій у випадку їх закінчення на складі або будь-яких змін</li>
      <li>Просте оновлення рекламного контенту з метою просування найбільш актуальних найменувань, що є в наявності.</li>
      <li>Зручність для встановлення у місцях, де складно встановити звичайні цінники для кожного окремого продукту (кулінарія, випічка, м’ясна лавка тощо)</li>
      <li>Немає потреби вручну змінювати паперові цінники, розташовані в різних місцях.</li>
    </ol>
  </div>
)

const eleventh_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>Широкий вибір спеціальних табличок, які націлені на підвищення впізнаваності товару та обсягів його продажів.</p>
    <ol>
      <li>Взаємовигідні контакти з постачальниками всього обладнання та комплектуючих.</li>
      <li>Сумісність з усіма світовими стандартами.</li>
      <li>Концепція «відкритих» систем, головна мета яких – зручність використання клієнтами.</li>
    </ol>
  </div>
)

const new_price_about_us_offer_text_box = () => (
  <div className='about_us_offer_text_box'>
    <p>Дисплей, оптимізований для показу детальної інформації на краю полиці</p>
    <ol>
      <li>2,7 '', колір: чорно-білий,чорний & білий & червоний</li>
      <li>Останні технології електронних ярликів</li>
      <li>Кут перегляду – близько 180 °</li>
      <li>Висока контрастність та роздільна здатність</li>
      <li>Антиблікове покриття</li>
      <li>Спалах (час відповіді -1 сек.)</li>
      <li>Змінна касета для акумуляторів (5 секунд зміни)</li>
      <li>Найвища двостороння швидкість (до 28 000 оновлень цін на годину)</li>
      <li>Автоматизована геолокація</li>
      <li>Наявність NFC </li>    
      <li>Унікальний задній слот (SmartCLIP) для адаптації товарів або технології</li>
      <li>Міцний корпус й фронтальний захист</li>
      <li>Штрих-код переднього та заднього облицювання</li>
    </ol>
  </div>
)

export default {
  container_about_us_preview_box,
  about_us_preview_description_bottom,
  about_us_preview_description_top,
  about_us_task_box,
  about_us_advantages,
  first_about_us_offer_text_box,
  second_about_us_offer_text_box,
  third_about_us_offer_text_box,
  fourth_about_us_offer_text_box,
  fifth_about_us_offer_text_box,
  sixth_about_us_offer_text_box,
  seventh_about_us_offer_text_box,
  eighth_about_us_offer_text_box,
  nineth_about_us_offer_text_box,
  tenth_about_us_offer_text_box,
  eleventh_about_us_offer_text_box,
  new_price_about_us_offer_text_box
}