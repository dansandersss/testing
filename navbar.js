class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setup();
  }

  // Полный список вкладок с полными названиями
  THRID_PANEL_TABS = [
    ["объяв.", "", "Объявления"],
    ["ваканс.", "", "Вакансии"],
    ["ПОИСК", "", "Поиск"],
    ["соиск.", "", "Соискатели"],
    ["отклики", "", "Отклики"],
    ["фио", "", "ФИО"],
    ["Адреса", "", "Адреса"],
    ["Комп.", "", "Компании"],
    ["Уч. зав.", "", "Учебные заведения"],

    ["ваканс. объедин.", "", "Вакансии объединённые"],
    ["Альт.", "", "Альтернативные"],
    ["Филиалы", "", "Филиалы"],
    ["Кв. Специальности", "", "Квалификации и специальности"],
    ["Тел. коды", "", "Телефонные коды"],
    ["Адм.", "", "Администрация"],
    ["email расс.", "", "Email рассылки"],
    ["КАК БЫЛО...", "", "Как было / Как надо"],
    ["ПРЕФИКСЫ...", "", "Префиксы счетов"],
    ["Сокр.Ю.Ф.", "", "Сокращения Ю.Ф."],
    ["БАНКИ", "", "Банки"],
    ["РУБРИКАТОР", "", "Рубрикатор"],
  ];

  THIRD_PANEL_TAB_TEMPLATE = (
    tabName,
    icon,
    fullName,
    { classes, id, tabNameClasses } = {
      classes: "",
      id: "",
      tabNameClasses: "",
    }
  ) => {
    return /*html*/ `
        <div class="third-panel__tab" ${id ? `id=${id.trim()}` : ""}>
            ${
              icon
                ? `<span class="third-panel__tab-icon icon ads-icon in-panel ${classes}">${icon}</span>`
                : ""
            }
            <p class="third-panel__tab-text ${tabNameClasses}">${tabName}</p>
            <div class="tab-popup">${fullName}</div>
        </div>
    `;
  };

  render() {
    const STYLE = /*html*/ `
            <style>
                .no-white{
                    white-space: nowrap !important;
                }
                .reversed{
                    display: inline-block !important;
                    transform: rotate(180deg);
                }
                .tab-popup {
                    position: absolute;
                    text-transform: uppercase;
                    bottom: 0;
                    background-color: #333;
                    color: white;
                    padding: 5px;
                    border-radius: 4px;
                    display: none;
                    z-index: 10;
                    font-size: 14px;
                    white-space: nowrap;
                }

                .tab-popup::after {
                    content: "";
                    position: absolute;
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent transparent #333 transparent;
                    top: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .navbar-top-panel{
                    background-color: #414f51;
                    color: white;
                    height: 40px;
                    padding: 0 20px;
                    display:flex;
                    justify-content: flex-end;
                    align-items: center;
                    
                    a{
                        color: white;
                        text-decoration: none;
                        cursor: pointer;
                        display:flex;
                        align-items: center;
                    }
                }
                navbar-elem{
                    width: 100%;
                }
                .panels__panel {
                    box-sizing: border-box;
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                    height: min-content;
                }
                #navbar {
                    display: flex;
                    flex-direction: column;
                }
                .second-panel__tab {
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    height: 60px;
                    box-sizing: border-box;
                    font-size: 18px;
                    text-transform: capitalize;
                }
                .second-panel__tab > p {
                    font-size: inherit;
                }
                .second-panel .tab > span.icon {
                    font-size: 35px;
                }
                .second-panel .tab:hover > span.icon {
                    color: white;
                }
                .second-panel .tab:hover {
                    background-color: var(--blue);
                    color: white;
                }
                .second-panel .tab {
                    display: flex;
                    align-items: center;
                }
                .third-panel{
                    align-items: center;
                    row-gap: 20px;
                    box-sizing: border-box;
                    padding: 25px 10px 20px 10px;
                    background-color: var(--blue);
                    align-items: start;
                }
                
                .third-panel__tab {
                    position:relative;
                    padding-top:3px;
                    padding-left: 4px;
                    padding-right: 4px;
                    box-sizing: border-box;
                    font-weight: 100;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                }
                .third-panel__tab_active{
                    color: var(--yellow);
                    font-weight: 900;
                    font-family: 'Inter-Bold'
                }
                span.third-panel__tab-icon {
                    font-weight: normal;
                    color: inherit;
                    font-size: 30px;
                    margin-bottom: 6px;
                }
                .third-panel__tab-text {
                    font-weight: inherit;
                    font-family: inherit;
                    color: inherit;
                    font-size: inherit;
                    text-transform: uppercase;
                    text-align: center;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .panels {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .other-tabs{
                    display: none;
                }
                .other-tabs_active{
                    display: contents;
                }
                .third-panel__tab.more{
                    align-self: end;
                }
                .third-panel__tab.more > p.third-panel__tab-text{
                    text-align: center;
                }
                .third-panel__tab.more > p.third-panel__tab-text > span{
                    position: absolute;
                }
                @media (width <= 880px) {
                    p.third-panel__tab-text{
                        font-size: 18px;
                    }
                    div#navbar {
                        display: none;
                        grid-template-columns: 2fr 5fr;
                        padding: 0;
                    }
                    .panels {
                        display: grid;
                        width: 100%;
                        grid-template-rows: 1fr;
                    }
                    .second-panel{
                        grid-auto-flow: row;
                    }
                    .third-panel__tab.more{
                        display: none;
                    }

                    .panels__panel{
                        grid-template-columns: none;
                    }
                    div.third-panel{
                        align-items: center;
                        column-gap: 10px;
                        row-gap: 0;
                        padding: 0;
                        padding-right: 25px;
                        padding-left: 15px;
                        box-sizing: border-box;
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: repeat(11, minmax(50px, auto));
                    }
                    .other-tabs{
                        display: contents;
                    }
                    .second-panel__tab {
                        height: 50px;
                        background-color: white;
                        color: var(--blue);
                    }
                    .tab_active {
                        background-color: var(--blue);
                        color: var(--yellow);
                    }
                    .tab_active > p {
                        color: var(--yellow);
                    }
                    div.second-panel__tab > p {
                        font-size: 18px;
                        text-align: left;
                        width: 100%;
                        padding-left: 25px;
                    }
                    .third-panel__tab > span.icon{
                        height: auto;
                        font-size: 20px;
                    }
                    p.third-panel__tab-text {
                        box-sizing: border-box;
                        padding-left: 10px;
                        width: fit-content;
                        text-align: end;
                        font-size: 18px;
                        text-transform: uppercase;
                        white-space: nowrap;
                    }
                    .third-panel__tab-icon.icon {
                        display: block;
                        font-size: 26px;
                    }
                    .third-panel__tab {
                        width: 100%;
                        overflow: hidden;
                        font-size: 16px;
                    }
                }
                @media (width <= 1024px) {
                    .third-panel__tab {
                        font-size: 16px;
                        font-family: Inter-Regular;
                    }
                    .third-panel__tab-text {
                        font-size: 16px;
                    }
                }
                @media (width <= 800px) {
                    .third-panel__tab {
                        font-size: 14px;
                        font-family: Inter-Regular;
                    }
                    .third-panel__tab-text {
                        font-size: 14px;
                    }
                }
                @media (width <= 500px) {
                    .third-panel__tab {
                        font-size: 12px;
                        font-family: Inter-Regular;
                    }
                    .third-panel__tab-text {
                        font-size: 12px;
                    }
                }
            </style>
        `;
    this.innerHTML = /*html*/ `
        ${STYLE}
            <div class="navbar-top-panel">
                <a href="#" class="navbar-top__link"><img src="assets/icons/fixed_icons/login.svg" width="20px"   alt=""> Войти</a>
            </div>
            <div class="mobile-control__menu-button">
                <p>Меню</p>
                <span class="icon burger"></span>
            </div>
            <div id="navbar">
                <div class="panels__panel second-panel ">
                    <div class="tab second-panel__tab" id="interface_tab">
                        <p>Интерфейс</p>
                        <div class="tab-popup">Интерфейс</div>
                    </div>
                    
                    <div class="tab second-panel__tab" id="social_tab">
                        <p>Соц. сети</p>
                    </div>
                    <div class="tab second-panel__tab tab_active" id="journals_tab" >
                        <p>Журналы</p>
                    </div>
                    <div class="tab second-panel__tab" id="import_tab">
                        <p>Импорт</p>
                    </div>
                    <div class="tab second-panel__tab" id="export_tab">
                        <p>Экспорт</p>
                    </div>

                    <div class="tab second-panel__tab" id="users_tab">
                        <p>Пользователи</p>
                    </div>
                    <div class="tab second-panel__tab" id="emails_tab">
                        <p>Email ящики</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Ключи.Пароли</p>
                    </div>
                    <div class="tab second-panel__tab">
                        <p>Разное</p>
                    </div>
                </div>
                <div class="third-panel journals panels__panel">
                    ${(() => {
                      let markup = "";
                      for (const [
                        shortName,
                        icon,
                        fullName,
                      ] of this.THRID_PANEL_TABS.slice(0, 8)) {
                        const isActive =
                          shortName === "Сокр.Ю.Ф."
                            ? "third-panel__tab_active"
                            : "";
                        if (shortName === "ваканс. объедин.") {
                          markup += this.THIRD_PANEL_TAB_TEMPLATE(
                            shortName,
                            icon,
                            fullName,
                            { tabNameClasses: "no-white", classes: isActive }
                          );
                          continue;
                        }
                        markup += this.THIRD_PANEL_TAB_TEMPLATE(
                          shortName,
                          icon,
                          fullName,
                          { classes: isActive }
                        );
                      }
                      return markup;
                    })()}
                    <div class="third-panel__tab more">
                        <p class="third-panel__tab-text">
                            <span style="width: 100%; text-align: center; position: static;">Все 21</span>
                            <br> журнала <span class="icon reversed" style="padding-left: 5px;"></span></p>
                    </div>
                    <div class="other-tabs">
                        ${(() => {
                          let markup = "";
                          for (const [
                            index,
                            [shortName, icon, fullName],
                          ] of this.THRID_PANEL_TABS.slice(8).entries()) {
                            if (index === 8) {
                              markup += `<div class="third-panel__tab more"></div>`;
                            }
                            markup += this.THIRD_PANEL_TAB_TEMPLATE(
                              shortName,
                              icon,
                              fullName
                            );
                          }
                          return markup;
                        })()}
                    </div>
                </div>
            </div>
        `;
  }

  setup() {
    const thirdPanel = this.querySelector(".third-panel");

    // Обработчики для вкладок второго уровня
    this.querySelectorAll(".second-panel__tab").forEach((el) => {
      el.addEventListener("click", () => {
        if (el.getAttribute("id") === "journals_tab") {
          thirdPanel.style.display = "grid";
        } else {
          thirdPanel.style.display = "none";
        }
        el.classList.add("tab_active");
      });

      // Обработчик для снятия активности с вкладок второго уровня
      document.addEventListener("click", (event) => {
        const isAnotherTabClicked = Array.from(
          document.querySelectorAll(".second-panel__tab")
        ).some((el) => el.contains(event.target));

        if (!el.contains(event.target) && isAnotherTabClicked) {
          el.classList.remove("tab_active");
        }
      });
    });

    // Обработчики для всплывающих подсказок вкладок третьего уровня
    this.querySelectorAll(".third-panel__tab").forEach((tab) => {
      const popup = tab.querySelector(".tab-popup");

      if (!popup) return; // Прекращаем выполнение, если попап не найден

      tab.addEventListener("mouseenter", () => {
        popup.style.display = "block";
      });

      tab.addEventListener("mouseleave", () => {
        popup.style.display = "none";
      });

      console.log("Popup found: ", popup); // Проверка наличия popup
    });

    // Установка активного класса для вкладки "Сокр.Ю.Ф."
    this.querySelectorAll(".third-panel__tab").forEach((tab) => {
      if (tab.textContent.includes("Сокр.Ю.Ф.")) {
        tab.classList.add("third-panel__tab_active");
      }
    });

    // Обработчик для вкладки "больше"
    const moreTab = this.querySelector(".third-panel__tab.more");
    if (moreTab) {
      moreTab.onclick = () => {
        const otherTabs = this.querySelector(".other-tabs");
        if (otherTabs.classList.contains("other-tabs_active")) {
          otherTabs.classList.remove("other-tabs_active");
          moreTab.querySelector("p span.icon").classList.add("reversed");
        } else {
          otherTabs.classList.add("other-tabs_active");
          moreTab.querySelector("p span.icon").classList.remove("reversed");
        }
      };
    }

    // Обработчики для активной вкладки третьего уровня
    this.querySelectorAll(".third-panel__tab:not(.more)").forEach((el) => {
      el.onclick = () => {
        this.querySelectorAll(".third-panel__tab").forEach((tab) => {
          tab.classList.remove("third-panel__tab_active");
        });
        el.classList.add("third-panel__tab_active");
      };
    });

    // Обработчик для мобильного меню
    document.querySelector(".icon.burger").onclick = () => {
      const menu = document.querySelector("#navbar");
      menu.classList.toggle("mobile-menu-wrapper_active");
    };

    // Обработчик изменения размера окна
    window.addEventListener("resize", () => {
      const menu = document.querySelector("#navbar");
      if (window.innerWidth <= 640) {
        menu.classList.remove("mobile-menu-wrapper_active");
      } else if (window.innerWidth >= 880) {
        menu.classList.add("mobile-menu-wrapper_active");
      }
    });
  }
}

customElements.define("navbar-elem", Navbar);
