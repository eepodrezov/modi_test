import { getVacancyPropertyValue } from "../utils/getVacancyPropertyValue.js";
import { formatDateWithoutTime, formatTime, formatDateWithTime } from "../utils/dateFormat.js";
import { Carousel, useCarousel } from "../components/carousel.js";
import { photosMock } from "../components/photosMock.js";

export const renderProject = (project) => {
  const root = document.querySelector("#root");
  const formatedDates = [formatDateWithoutTime(project.dateStart),formatDateWithoutTime(project.dateEnd)]

  if (project) {
      root.innerHTML =
          root.innerHTML +
          `
          <div class="project">
            <div class="project__wrapper">
                ${renderHeader(project)}
                <div class="project__wrapper__photos">
                    <div
                        class='mobileCarousel'
                    >
                        ${Carousel()}
                    </div>
                    <h1>${project.name}</h1>
                </div>
                <div class="project__info">
                    <div class="project__info__main">
                        <div class="project__info__main__owner">
                            <img class="project__info__main__avatar" src=${project.owner.avatar.path}/>
                            <div class="project__info__main__owner__name">${!!project.owner.fullName.trim() ? project.owner.fullName : project.owner.myModelCompany.name}</div>
                            <div class="project__info__main__owner__rate">${project.owner.rating}</div>
                        </div>
                        <div class="project__info__main__geo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.5 7.00015C12.163 7.00015 12.7989 7.26355 13.2677 7.73239C13.7366 8.20123 14 8.83711 14 9.50015C14 10.1632 13.7366 10.7991 13.2677 11.2679C12.7989 11.7368 12.163 12.0002 11.5 12.0002C10.8369 12.0002 10.2011 11.7368 9.73221 11.2679C9.26337 10.7991 8.99998 10.1632 8.99998 9.50015C8.99998 8.83711 9.26337 8.20123 9.73221 7.73239C10.2011 7.26355 10.8369 7.00015 11.5 7.00015ZM11.5 8.00015C11.1022 8.00015 10.7206 8.15819 10.4393 8.43949C10.158 8.7208 9.99998 9.10233 9.99998 9.50015C9.99998 9.89798 10.158 10.2795 10.4393 10.5608C10.7206 10.8421 11.1022 11.0002 11.5 11.0002C11.8978 11.0002 12.2793 10.8421 12.5606 10.5608C12.8419 10.2795 13 9.89798 13 9.50015C13 9.10233 12.8419 8.7208 12.5606 8.43949C12.2793 8.15819 11.8978 8.00015 11.5 8.00015ZM6.79998 12.3572L11.5 20.0872L16.2 12.3572C16.7069 11.5232 16.9827 10.5693 16.9992 9.59348C17.0157 8.61767 16.7722 7.65504 16.2938 6.80439C15.8154 5.95375 15.1192 5.24573 14.2768 4.753C13.4343 4.26027 12.4759 4.00058 11.5 4.00058C10.524 4.00058 9.56564 4.26027 8.7232 4.753C7.88076 5.24573 7.1846 5.95375 6.70617 6.80439C6.22774 7.65504 5.98428 8.61767 6.00076 9.59348C6.01725 10.5693 6.29309 11.5232 6.79998 12.3572ZM17.054 12.8772L11.5 22.0122L5.94598 12.8772C5.3471 11.8915 5.02126 10.7643 5.00189 9.61109C4.98253 8.45792 5.27034 7.32037 5.83578 6.31517C6.40123 5.30996 7.22395 4.47331 8.21952 3.89107C9.21509 3.30882 10.3476 3.00195 11.501 3.00195C12.6543 3.00195 13.7869 3.30882 14.7824 3.89107C15.778 4.47331 16.6007 5.30996 17.1662 6.31517C17.7316 7.32037 18.0194 8.45792 18.0001 9.61109C17.9807 10.7643 17.6549 11.8915 17.056 12.8772H17.054Z" fill="#AAAAAA"/>
                            </svg>
                            <div class="project__info__main__geo__text">
                                ${project.city.region.country.nameRu}, ${project.city.nameRu}
                            </div>
                        </div>
                        <div class="project__info__main__dates">
                            ${formatedDates[0]} - ${formatedDates[1]}
                        </div>
                    </div>
                    <div class="project__info__date">
                        <div class="project__info__date__header">Расписание работы</div>
                        <div class="project__info__date__time_table" id="shedule">
                        </div>
                    </div>
                    <div class='project__info__bottom__wrapper'>
                        <div class='project__info__discription__wrapper'>
                            <div class="project__info__discription">${project.description}</div>
                            ${renderCasting(project.casting)}
                        </div>
                        <div class="project__info__btns">
                            <button class="primary" id="respondBtn">Откликнуться</button>
                            <button class="secondary" id="openAppBtn">Открыть в приложении</button>
                        </div>
                    </div>
                    <div class="vacancies_wrapper">
                    <h2 class="vacancies_wrapper__header">Доступные вакансии</h2>
                    <div class="vacancies" id="vacancies">
                    </div>
                    </div>
                </div>
            </div>
            <div class="desktopCarousel">${Carousel()}</div>
        </div>
              `;
              project.projectVacancies.forEach(vacancy => renderVacancy(vacancy))
              project.timetables.map((time,i) => renderScheduleItem(time,i))
              useCarousel(project.photos, 'mobileCarousel')
              useCarousel(project.photos, 'desktopCarousel')
  }

}

export const renderVacancy = (vacancy) => {
    const vacancies = document.querySelector("#vacancies");
    const salaryType = [
        {
            type: 0,
            text: 'Р'
        },
        {
            type: 1,
            text: 'Р/час'
        },
    ]
    if (vacancy && vacancies?.innerHTML) {
        vacancies.innerHTML =
        vacancies.innerHTML +
            `
            <div class="vacancies_item open" id='${'vacancyBlock' + vacancy.id}'>
                <div class="vacancies_item__top" id='${'vacancyBlockTop' + vacancy.id}'>
                    <div class="vacancies_item__top__main_info">
                        <div class="vacancies_item__top__main_info__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11.5 8C12.6935 8 13.8381 8.47411 14.682 9.31802C15.5259 10.1619 16 11.3065 16 12.5C16 13.6935 15.5259 14.8381 14.682 15.682C13.8381 16.5259 12.6935 17 11.5 17C10.3065 17 9.16193 16.5259 8.31802 15.682C7.47411 14.8381 7 13.6935 7 12.5C7 11.3065 7.47411 10.1619 8.31802 9.31802C9.16193 8.47411 10.3065 8 11.5 8ZM11.5 9C10.5717 9 9.6815 9.36875 9.02513 10.0251C8.36875 10.6815 8 11.5717 8 12.5C8 13.4283 8.36875 14.3185 9.02513 14.9749C9.6815 15.6313 10.5717 16 11.5 16C12.4283 16 13.3185 15.6313 13.9749 14.9749C14.6313 14.3185 15 13.4283 15 12.5C15 11.5717 14.6313 10.6815 13.9749 10.0251C13.3185 9.36875 12.4283 9 11.5 9ZM5 5H7L9 3H14L16 5H18C18.7956 5 19.5587 5.31607 20.1213 5.87868C20.6839 6.44129 21 7.20435 21 8V17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17V8C2 7.20435 2.31607 6.44129 2.87868 5.87868C3.44129 5.31607 4.20435 5 5 5ZM9.414 4L7.414 6H5C4.46957 6 3.96086 6.21071 3.58579 6.58579C3.21071 6.96086 3 7.46957 3 8V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H18C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17V8C20 7.46957 19.7893 6.96086 19.4142 6.58579C19.0391 6.21071 18.5304 6 18 6H15.586L13.586 4H9.414Z" fill="#AAAAAA"/>
                            </svg>
                        </div>
                        <div class="vacancies_item__top__main_info__name">${vacancy.vacancy.name}</div>
                        <div class="vacancies_item__top__main_info__salary">${vacancy.salary} ${salaryType[vacancy.paymentType].text}</div>
                    </div>
                    <svg class="vacancies_item__top__arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M0.582712 5.3895L9.06821 13.875L17.5537 5.3895L16.4932 4.329L9.06821 11.754L1.64321 4.329L0.582712 5.3895Z" fill="#AAAAAA"/>
                    </svg>
                </div>
                <div class="vacancies_item__info" id="vacancy_${vacancy.id}_properties">
                </div>

            </div>
                `
    vacancy.properties.map(property => renderVacancyProperty(property, vacancy.id))
    const vacancyBlockTop = document.querySelector('#vacancyBlockTop' + vacancy.id)
    function toggleVacancy(id) {
        const vacancyBlock = document.querySelector('#vacancyBlock' + id)
        if (vacancyBlock.classList.contains('open')) {
            vacancyBlock.classList.remove('open')
        } else {
            vacancyBlock.classList.add('open')

        }
    }
    vacancyBlockTop.addEventListener('click', () => toggleVacancy(vacancy.id))
        
    }
  }

  export const renderVacancyProperty = (property, vacancyId) => {
    const properties = document.querySelector(`#vacancy_${vacancyId}_properties`);
    const value = getVacancyPropertyValue(property.values)
    if (property && properties?.innerHTML && value) {
        properties.innerHTML =
        properties.innerHTML +

        `
        <div class="vacancies_item__info__row"><span>${property.name}:</span>${' ' + value}</div>
        `   
    }
}

  

export const renderScheduleItem = (time, index) => {
    const date = formatDateWithoutTime(time.date)
    const formatedTime = [formatTime(time.timeRangeStart),formatTime(time.timeRangeEnd)]
    const shedule = document.querySelector("#shedule");
    if (time && shedule?.innerHTML) {
        shedule.innerHTML =
        shedule.innerHTML +
        `
            <div class="project__info__date__time_table__item">
                <span>День ${index + 1}</span>
                <span>${date}</span>
                <span>-</span>
                <span>${formatedTime[0]}<span class="dash">-</span>${formatedTime[1]}</span>
            </div>
        `
    }
}

export const renderHeader = (project) => {
    const formatedDates = [formatDateWithoutTime(project.dateStart),formatDateWithoutTime(project.dateEnd)]

    return `
    <div class="header">
        <div class="header__info">
            <img src="./img//logo.png" alt="logo">
            <div class="header__info__block">
                <div class="header__info__block__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.475 9.75C9.475 8.35548 10.6055 7.225 12 7.225C13.3945 7.225 14.525 8.35548 14.525 9.75C14.525 11.1445 13.3945 12.275 12 12.275C10.6055 12.275 9.475 11.1445 9.475 9.75ZM12 6.275C10.0808 6.275 8.525 7.83081 8.525 9.75C8.525 11.6692 10.0808 13.225 12 13.225C13.9192 13.225 15.475 11.6692 15.475 9.75C15.475 7.83081 13.9192 6.275 12 6.275Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.7253 22.1375L11.7252 22.1374L11.7204 22.1341L11.7201 22.1338L11.7025 22.1213L11.7023 22.1212C11.6869 22.1102 11.6645 22.0941 11.6357 22.073C11.5781 22.031 11.4947 21.9692 11.3893 21.8886C11.1784 21.7275 10.879 21.4909 10.5205 21.1861C9.80414 20.5772 8.84846 19.6934 7.89156 18.5929C5.98938 16.4054 4.025 13.296 4.025 9.75C4.025 7.6349 4.86522 5.60643 6.36082 4.11082C7.85643 2.61522 9.8849 1.775 12 1.775C14.1151 1.775 16.1436 2.61522 17.6392 4.11082C19.1348 5.60643 19.975 7.6349 19.975 9.75C19.975 13.296 18.0106 16.4054 16.1084 18.5929C15.1515 19.6934 14.1959 20.5772 13.4795 21.1861C13.121 21.4909 12.8216 21.7275 12.6107 21.8886C12.5053 21.9692 12.4219 22.031 12.3643 22.073C12.3355 22.0941 12.3131 22.1102 12.2977 22.1212L12.2975 22.1213L12.2799 22.1338L12.2796 22.1341L12.2748 22.1374L12.2746 22.1376L12.2734 22.1384L11.7253 22.1375ZM11.7253 22.1375L11.7266 22.1384M11.7253 22.1375L11.7266 22.1384M11.7266 22.1384C11.7267 22.1385 11.7267 22.1385 11.7267 22.1385M11.7266 22.1384L11.7267 22.1385M11.7267 22.1385L11.727 22.1387C11.7269 22.1387 11.7268 22.1386 11.7267 22.1385ZM11.7309 22.1414C11.894 22.2536 12.1099 22.2529 12.2724 22.1391L11.7309 22.1414ZM11.7309 22.1414C11.7282 22.1397 11.727 22.1387 11.7276 22.1392L11.7309 22.1414ZM7.03257 4.78257C8.35002 3.46513 10.1369 2.725 12 2.725C13.8631 2.725 15.65 3.46513 16.9674 4.78257C18.2849 6.10002 19.025 7.88685 19.025 9.75C19.025 12.954 17.2394 15.8446 15.3916 17.9696C14.4735 19.0254 13.5541 19.8759 12.8642 20.4623C12.5196 20.7552 12.2331 20.9815 12.0338 21.1338C12.0223 21.1427 12.011 21.1513 12 21.1596C11.989 21.1513 11.9777 21.1427 11.9662 21.1338C11.7669 20.9815 11.4804 20.7552 11.1358 20.4623C10.4459 19.8759 9.52654 19.0254 8.60844 17.9696C6.76063 15.8446 4.975 12.954 4.975 9.75C4.975 7.88685 5.71513 6.10002 7.03257 4.78257Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ${project.city.region.country.nameRu}, ${project.city.nameRu}
                </div>
                <div class="header__info__block__item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4.225 4.5C4.225 4.34812 4.34812 4.225 4.5 4.225H19.5C19.6519 4.225 19.775 4.34812 19.775 4.5V19.5C19.775 19.6519 19.6519 19.775 19.5 19.775H4.5C4.34812 19.775 4.225 19.6519 4.225 19.5V4.5ZM4.5 3.275C3.82345 3.275 3.275 3.82345 3.275 4.5V19.5C3.275 20.1765 3.82345 20.725 4.5 20.725H19.5C20.1765 20.725 20.725 20.1765 20.725 19.5V4.5C20.725 3.82345 20.1765 3.275 19.5 3.275H4.5Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.975 2.25C16.975 1.98766 16.7623 1.775 16.5 1.775C16.2377 1.775 16.025 1.98766 16.025 2.25V5.25C16.025 5.51234 16.2377 5.725 16.5 5.725C16.7623 5.725 16.975 5.51234 16.975 5.25V2.25Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.975 2.25C7.975 1.98766 7.76234 1.775 7.5 1.775C7.23766 1.775 7.025 1.98766 7.025 2.25V5.25C7.025 5.51234 7.23766 5.725 7.5 5.725C7.76234 5.725 7.975 5.51234 7.975 5.25V2.25Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.75 7.775C3.48766 7.775 3.275 7.98766 3.275 8.25C3.275 8.51234 3.48766 8.725 3.75 8.725H20.25C20.5123 8.725 20.725 8.51234 20.725 8.25C20.725 7.98766 20.5123 7.775 20.25 7.775H3.75Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    ${formatedDates[0]} - ${formatedDates[1]}
                </div>
            </div>
        </div>
        <div class="header__owner">
            <img class="header__owner__avatar" src=${project.owner.avatar.path}/>
            <div class="header__owner__info">
                <div class="header__owner__info__item">
                    ${!!project.owner.fullName.trim() ? project.owner.fullName : project.owner.myModelCompany.name}
                </div>
                <div class="header__owner__info__item rating">
                    ${project.owner.rating}
                </div>
            </div>
        </div>
    </div>
`
}

export const renderCasting = (casting) => {
    if (!casting) return ''

    return `
    <div class="casting">
        <div class="casting__header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                <path d="M10.9 17.5V17.6H11H12H12.1V17.5V15.5V15.4H12H11H10.9V15.5V17.5ZM10.9 13.5V13.6H11H12H12.1V13.5V8.5V8.4H12H11H10.9V8.5V13.5ZM18.2882 6.21177C16.4879 4.41143 14.0461 3.4 11.5 3.4C8.95392 3.4 6.51212 4.41143 4.71177 6.21177C2.91143 8.01212 1.9 10.4539 1.9 13C1.9 15.5461 2.91143 17.9879 4.71177 19.7882C6.51212 21.5886 8.95392 22.6 11.5 22.6C14.0461 22.6 16.4879 21.5886 18.2882 19.7882C20.0886 17.9879 21.1 15.5461 21.1 13C21.1 10.4539 20.0886 8.01212 18.2882 6.21177ZM5.5603 7.0603C7.13561 5.485 9.27218 4.6 11.5 4.6C13.7278 4.6 15.8644 5.485 17.4397 7.0603C19.015 8.63561 19.9 10.7722 19.9 13C19.9 15.2278 19.015 17.3644 17.4397 18.9397C15.8644 20.515 13.7278 21.4 11.5 21.4C9.27218 21.4 7.13561 20.515 5.5603 18.9397C3.985 17.3644 3.1 15.2278 3.1 13C3.1 10.7722 3.985 8.63561 5.5603 7.0603Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2"/>
            </svg>
            <strong>Требуется очный кастинг</strong>
        </div>
        <div class="casting__info">
            <div class="casting__info__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.475 12C3.475 7.29177 7.29177 3.475 12 3.475C16.7082 3.475 20.525 7.29177 20.525 12C20.525 16.7082 16.7082 20.525 12 20.525C7.29177 20.525 3.475 16.7082 3.475 12ZM12 2.525C6.7671 2.525 2.525 6.7671 2.525 12C2.525 17.2329 6.7671 21.475 12 21.475C17.2329 21.475 21.475 17.2329 21.475 12C21.475 6.7671 17.2329 2.525 12 2.525Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.475 6.75C12.475 6.48766 12.2623 6.275 12 6.275C11.7377 6.275 11.525 6.48766 11.525 6.75V12C11.525 12.2623 11.7377 12.475 12 12.475H17.25C17.5123 12.475 17.725 12.2623 17.725 12C17.725 11.7377 17.5123 11.525 17.25 11.525H12.475V6.75Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <strong>Дата и время:</strong> ${formatDateWithTime(casting.timeRangeStart)}
            </div>
            <div class="casting__info__item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.475 9.75C9.475 8.35548 10.6055 7.225 12 7.225C13.3945 7.225 14.525 8.35548 14.525 9.75C14.525 11.1445 13.3945 12.275 12 12.275C10.6055 12.275 9.475 11.1445 9.475 9.75ZM12 6.275C10.0808 6.275 8.525 7.83081 8.525 9.75C8.525 11.6692 10.0808 13.225 12 13.225C13.9192 13.225 15.475 11.6692 15.475 9.75C15.475 7.83081 13.9192 6.275 12 6.275Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.7253 22.1375L11.7252 22.1374L11.7204 22.1341L11.7201 22.1338L11.7025 22.1213L11.7023 22.1212C11.6869 22.1102 11.6645 22.0941 11.6357 22.073C11.5781 22.031 11.4947 21.9692 11.3893 21.8886C11.1784 21.7275 10.879 21.4909 10.5205 21.1861C9.80414 20.5772 8.84846 19.6934 7.89156 18.5929C5.98938 16.4054 4.025 13.296 4.025 9.75C4.025 7.6349 4.86522 5.60643 6.36082 4.11082C7.85643 2.61522 9.8849 1.775 12 1.775C14.1151 1.775 16.1436 2.61522 17.6392 4.11082C19.1348 5.60643 19.975 7.6349 19.975 9.75C19.975 13.296 18.0106 16.4054 16.1084 18.5929C15.1515 19.6934 14.1959 20.5772 13.4795 21.1861C13.121 21.4909 12.8216 21.7275 12.6107 21.8886C12.5053 21.9692 12.4219 22.031 12.3643 22.073C12.3355 22.0941 12.3131 22.1102 12.2977 22.1212L12.2975 22.1213L12.2799 22.1338L12.2796 22.1341L12.2748 22.1374L12.2746 22.1376L12.2734 22.1384L11.7253 22.1375ZM11.7253 22.1375L11.7266 22.1384M11.7253 22.1375L11.7266 22.1384M11.7266 22.1384C11.7267 22.1385 11.7267 22.1385 11.7267 22.1385M11.7266 22.1384L11.7267 22.1385M11.7267 22.1385L11.727 22.1387C11.7269 22.1387 11.7268 22.1386 11.7267 22.1385ZM11.7309 22.1414C11.894 22.2536 12.1099 22.2529 12.2724 22.1391L11.7309 22.1414ZM11.7309 22.1414C11.7282 22.1397 11.727 22.1387 11.7276 22.1392L11.7309 22.1414ZM7.03257 4.78257C8.35002 3.46513 10.1369 2.725 12 2.725C13.8631 2.725 15.65 3.46513 16.9674 4.78257C18.2849 6.10002 19.025 7.88685 19.025 9.75C19.025 12.954 17.2394 15.8446 15.3916 17.9696C14.4735 19.0254 13.5541 19.8759 12.8642 20.4623C12.5196 20.7552 12.2331 20.9815 12.0338 21.1338C12.0223 21.1427 12.011 21.1513 12 21.1596C11.989 21.1513 11.9777 21.1427 11.9662 21.1338C11.7669 20.9815 11.4804 20.7552 11.1358 20.4623C10.4459 19.8759 9.52654 19.0254 8.60844 17.9696C6.76063 15.8446 4.975 12.954 4.975 9.75C4.975 7.88685 5.71513 6.10002 7.03257 4.78257Z" fill="#F342D1" stroke="#F342D1" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <strong>Место:</strong> ${casting.place}
            </div>
        </div>
    </div>
    `
}