import React, { Component } from 'react'
import MetaTags from "react-meta-tags";
import * as d3 from "d3";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import animateScrollTo from "animated-scroll-to";
import preview_img from "../media/about_prev_img.png";
import arrow_down_img from "../media/arrow_down.svg";
import pricer_logo from "../media/pricer_logo_white.png";
import task_img from "../media/task_picture.png";
import advantages_img from "../media/advantages_picture.png";
import price_picture from "../media/price_picture.png";
import SmartTAG_HD_110 from "../media/prices/SmartTAG_HD_110.png";
import SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE from "../media/prices/SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE.png";
import SmartTAG_HD_M_FREEZER from "../media/prices/SmartTAG_HD_M_FREEZER.png";
import SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH from "../media/prices/SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH.png";
import SmartTAG_HD_200 from "../media/prices/SmartTAG_HD_200.png";
import SmartTAG_HD_T_E_PAPER_LABELS from "../media/prices/SmartTAG_HD_T_E_PAPER_LABELS.png";
import "../Styles/AboutUs.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import localizationUA from "../localization/UA/AboutUsUA";
import localizationRU from "../localization/RU/AboutUsRU";
import { seoActions } from "../actions/seoActions";
import Presentation from './Presentation'
import {Link} from 'react-router-dom';
import { initGA, logPageView } from '../analytics';
import hd110 from '../media/presentations/hd110.pdf'
import SmartTAG_HD_SM_L from '../media/presentations/SmartTAG_HD_SM_L.pdf';
import freezer from '../media/presentations/freezer.pdf';
import paper from '../media/presentations/paper.pdf';
import hd200 from '../media/presentations/hd200.pdf';
import e_paper from '../media/presentations/e_paper.pdf';
const getSeoByUrl = seoActions.getSeoByUrl;

class Products extends Component {
  componentDidMount() {
    const lang = window.location.href.split('/')[3] === 'ua' ? 'ua' : 'ru';
    initGA();
    this.props.getSeoByUrl("products", lang)
    .then(() =>  {
      try{
      logPageView(this.props.getMetaResult.result.title)
    } catch(e) {
      console.log('err')
    }
    });
    this.preSets();
    let that = this;
    if (window.innerWidth > 800) {
      d3.selectAll(".about_us_offer_line")
        .style("background", "#86B82A")
        .on("mouseover", that.mouseOverOffer)
        .on("mouseleave", that.mouseLeaveOffer);
      d3.selectAll(".about_us_product_picture_box").style("width", "0px");
    }
  }

  preSets() {
    let that = this;
    console.log(window.innerWidth);
    d3.selectAll(".offer_preview_button svg").style("right", "-60px");
    d3.selectAll(".offer_preview_button")
      .on("mouseover", that.overButton)
      .on("mouseleave", that.leaveButton);
  }

  leaveButton() {
    d3.select(this)
      .select("svg")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("right", "-60px");
  }

  overButton() {
    d3.select(this)
      .select("svg")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("right", "0px");
  }

  mouseLeaveOffer() {
    d3.select(this)
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .style("background", "#86B82A")
      .style("color", "#000");
    d3.select(this)
      .select(".about_us_product_picture_box")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("width", "0px");
  }

  mouseOverOffer() {
    d3.select(this)
      .transition()
      .duration(300)
      .ease(d3.easeLinear)
      .style("background", "#1D1D1D")
      .style("color", "#fff");
    d3.select(this)
      .select(".about_us_product_picture_box")
      .transition()
      .duration(200)
      .ease(d3.easeLinear)
      .style("width", "350px");
  }

  svgButton() {
    return (
      <svg
        className="arrow_right_img"
        xmlns="http://www.w3.org/2000/svg"
        width="46.932"
        height="23.774"
        viewBox="0 0 46.932 23.774"
      >
        <path
          d="M3250.754,4531.5h43.932l-14.434-10.6,14.434,10.6-14.434,10.171"
          transform="translate(-3249.254 -4519.397)"
          fill="none"
          stroke="#86b82a"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    );
  }

  getTopPosition(e) {
    return e.getBoundingClientRect().top - 70;
  }

  render() {
    let metaTags = this.props.getMetaResult && this.props.getMetaResult.result;
    const lang = window.location.href.split('/')[3] !== 'ua'
    return (
      <div>
        <MetaTags>
          <title>{metaTags && metaTags.title}</title>
          <meta name="description" content={metaTags && metaTags.description} />
          <meta name="keywords" content={metaTags && metaTags.keywords} />
        </MetaTags>
        <div className="about_us">
        <Header/>
        <ScrollToTop />
        <section className="about_us_offers">
            <div className="offer_title_container">
              <h2>
                {lang
                  ? "Предлагаемые продукты"
                  : "Пропоновані продукти"}
              </h2>
            </div>
            <div className="about_us_offers_box ">
              <div className="about_us_offer_line">
                <div className="container">
                  <h3>SmartTAG HD 110 Large graphic label with smartflash</h3>
                  <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                    
                      <span>
                      <Link style={{textDecoration: 'none'}} to={{pathname: '/product/hd110', state: {link: hd110} }} >
                        {lang ? "Просмотреть" : "Переглянути"}
                        </Link>
                      </span>
                      {this.svgButton()}
                    </div>
                    <div className="offer_container">
                      {lang
                        ? localizationRU.first_about_us_offer_text_box()
                        : localizationUA.first_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                    </div>
                    <div className="about_us_product_picture_box">
                    
                      <img src={SmartTAG_HD_110} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD S, M+, L ETIQUETTES E-PAPER NOIR, BLANC, ROUGE</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                     
                        <span>
                        <Link style={{textDecoration: 'none'}} to='/product/SmartTAG_HD_SM_L' >
                          {lang ? "Просмотреть" : "Переглянути"}
                          </Link>
                        </span>
                        {this.svgButton()}
                    
                      </div>
                      {lang
                        ? localizationRU.second_about_us_offer_text_box()
                        : localizationUA.first_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_S_M_LE_PAPER_NOIR_BLANC_ROUGE} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD M+ FREEZER</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                      
                        <span>
                        <Link style={{textDecoration: 'none'}} to={{pathname: '/product/freezer', state: {link: freezer} }} >
                          {lang ? "Просмотреть" : "Переглянути"}
                          </Link>
                        </span>
                        {this.svgButton()}
                      
                      </div>
                      {lang
                        ? localizationRU.third_about_us_offer_text_box()
                        : localizationUA.third_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_M_FREEZER} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD S, M+, L</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                   
                      <span>
                      <Link style={{textDecoration: 'none'}} to={{pathname: '/product/paper', state: {link: paper} }} >
                        {lang ? "Просмотреть" : "Переглянути"}
                        </Link>
                      </span>
                      {this.svgButton()}
                  
                    </div>
                      {lang
                        ? localizationRU.fourth_about_us_offer_text_box()
                        : localizationUA.fourth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                      <div className="about_us_product_picture_box">
                        <img
                        
                          src={SmartTAG_HD_S_M_L_E_PAPER_LABELS_WITH_SMARTFLASH}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HD 200</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                    
                      <span>
                      <Link style={{textDecoration: 'none'}} to={{pathname: '/product/hd200', state: {link: hd200} }} >
                        {lang ? "Просмотреть" : "Переглянути"}
                        </Link>
                      </span>
                      {this.svgButton()}
                
                    </div>
                      {lang
                        ? localizationRU.fifth_about_us_offer_text_box()
                        : localizationUA.fifth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                      <div className="about_us_product_picture_box">
                      
                        <img src={SmartTAG_HD_200} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>SmartTAG HT T E-PAPER LABELS</h3>
                    <div className="about_us_offer_flex_box">
                    <div className="offer_preview_button">
                      
                        <span>
                          <Link style={{textDecoration: 'none'}} to={{pathname: '/product/e_paper', state: {link: e_paper} }} >
                            {lang ? "Просмотреть" : "Переглянути"}
                          </Link>
                        </span>
                        {this.svgButton()}
                      </div>
                      {lang
                        ? localizationRU.new_price_about_us_offer_text_box()
                        : localizationUA.new_price_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
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
                    </div> */}
                      <div className="about_us_product_picture_box">
                        <img src={SmartTAG_HD_T_E_PAPER_LABELS} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>Pricer SmartFlash</h3>
                    <div className="about_us_offer_flex_box">

                      {lang
                        ? localizationRU.sixth_about_us_offer_text_box()
                        : localizationUA.sixth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <p>Дійсно революційний винахід в сфері електронних цінників, який виводить ці пристрої на новий рівень ефективності. Використання високоякісної оптики дозволило збільшити кут огляду до гарантованих 180 градусів, а віддалення, на якому чітко видно всю інформацію, до 10 м. Поєднання фірмових комплектуючих, високоякісної оптики, використання світлового випромінювання особливо спектра, а також системна архітектура з надмалим енергоспоживанням роблять це рішення дуже економічно привабливим, так як термін експлуатації такого пристрою (без заміни батарей) досягає п’яти років.<br />Переваги:</p>
                      <ol>
                        <li>Миттєва активація цінника</li>
                        <li>Розбірливість тексту на відстані до 10 м.</li>
                        <li>Потужна загальна підсвітка</li>
                        <li>М’яка підсвітка для рекламних матеріалів</li>
                        <li>Мала витрата заряду батареї.</li>
                      </ol>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Геолокация - продается отдельно"
                        : "Геолокація – продається окремо"}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.seventh_about_us_offer_text_box()
                        : localizationUA.seventh_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <ol>
                        <li>Зазначення місця розташування самого покупця всередині приміщення</li>
                        <li>BLE-маячки за замовченням вмонтовані в ІЧ-системи.</li>
                      </ol>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "SmartFlash ГЕОЛОКАЦИЯ"
                        : "SmartFlash і геолокація"}
                    </h3>
                    <div className="about_us_offer_flex_box">

                      {lang
                        ? localizationRU.eighth_about_us_offer_text_box()
                        : localizationUA.eighth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <p>Додаток «Click & Collect» (покупка і доставка)</p>
                      <ol>
                        <li>Виконує завантаження в електронний пристрій покупця списку его покупок. ESL-система автоматично перевіряє наявність необхідних товарів.</li>
                        <li>Додаток направляє покупця до найближчого доступного товару. На електронній схемі магазина додаток автоматично будує найбільш оптимальний маршрут руху (до полиць, кас, точки доставки товару).</li>
                        <li>При наближенні до потрібного товару його електронний цінник починає блимати (відстань змінюється за бажанням). Після того, як покупець взяв товар з полиці, програма автоматично видалить його зі списку покупок, а ярлик товару перестає блимати.</li>
                        <li>Ярлик товару при наближенні покупця починає блимати.</li>
                      </ol>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Осмотр дополнительных функций"
                        : "Огляд додаткових функцій"}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.nineth_about_us_offer_text_box()
                        : localizationUA.nineth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <ol>
                        <li>SmartFlash:  Click & Collect, task-to-light і перевірка наявності товару.</li>
                        <li>Вмонтовані BLE-маячки для додатку геолокації.</li>
                        <li>Ближній зв’язок NFC для роботи з електронними пристроями покупця.</li>
                        <li>QR-коди для швидкого переходу до необхідного товару.</li>
                      </ol>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>Pricer Poster</h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.tenth_about_us_offer_text_box()
                        : localizationUA.tenth_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <p>Об’єднуйте в одному широкоформатному екрані одразу декілька пропозицій, створюйте набори шаблонів на свій смак і вказуйте прямі посилання на продукти.<br />Переваги:</p>
                      <ol>
                        <li>Можливість швидкої зміни вказаних позицій у випадку їх закінчення на складі або будь-яких змін</li>
                        <li>Просте оновлення рекламного контенту з метою просування найбільш актуальних найменувань, що є в наявності.</li>
                        <li>Зручність для встановлення у місцях, де складно встановити звичайні цінники для кожного окремого продукту (кулінарія, випічка, м’ясна лавка тощо)</li>
                        <li>Немає потреби вручну змінювати паперові цінники, розташовані в різних місцях.</li>
                      </ol>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about_us_offer_line">
                <div className="offer_container">
                  <div className="container">
                    <h3>
                      {lang
                        ? "Многофункциональные решения для повышения продаж"
                        : "Багатофункціональні рішення для підвищення продажів."}
                    </h3>
                    <div className="about_us_offer_flex_box">
                      {lang
                        ? localizationRU.eleventh_about_us_offer_text_box()
                        : localizationUA.eleventh_about_us_offer_text_box()}
                      {/* <div className='about_us_offer_text_box'>
                      <p>Широкий вибір спеціальних табличок, які націлені на підвищення впізнаваності товару та обсягів його продажів.</p>
                      <ol>
                        <li>Взаємовигідні контакти з постачальниками всього обладнання та комплектуючих.</li>
                        <li>Сумісність з усіма світовими стандартами.</li>
                        <li>Концепція «відкритих» систем, головна мета яких – зручність використання клієнтами.</li>
                      </ol>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    lang: state.lang,
    getMetaResult: state.seo.getSeoByUrlResult
  };
};

export default connect(
  mapStateToProps,
  { getSeoByUrl }
)(Products);
