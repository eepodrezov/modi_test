import { PRIVATE_PROJECT_URL, PRIVATE_PROJECT_CONST_CODE, MODI_API_URL, PROJECT_URL } from './api.js';
import { getDataApi } from './utils/getDataApi.js';
import { renderProject } from './project-render-functions/renders.js';

(async () => {
  const privateProjectQueryParamPrefix = '?privateId='
  //todo заменить на реальный
  const requestLink = MODI_API_URL + PRIVATE_PROJECT_URL + privateProjectQueryParamPrefix + PRIVATE_PROJECT_CONST_CODE
  const project = await getDataApi.getData(requestLink)

  renderProject(project);
  const respondBtn = document.querySelector("#respondBtn");
  const openAppBtn = document.querySelector("#openAppBtn");
  function handleRespond() {
    console.log('Откликнуться')
  }
  respondBtn.addEventListener("click", handleRespond);
  openAppBtn.addEventListener("click", handleRespond);
})();
