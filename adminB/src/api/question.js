import axios from '@/libs/api.request';

export const getPlate = data => {
  return axios.request ({
    url: '/admin/Question/getPlate',
    params: data,
    method: 'get',
  });
};

export const questionList = data => {
  return axios.request ({
    url: '/admin/Question/questionList',
    params: data,
    method: 'get',
  });
};

export const knowThreeLevel = data => {
  return axios.request ({
    url: '/admin/Question/knowThreeLevel',
    params: data,
    method: 'get',
  });
};

export const questionExport = data => {
  return axios.request ({
    url: '/admin/Question/questionExport',
    params: data,
    method: 'get',
  });
};

export const knowQuestionoList = data => {
  return axios.request ({
    url: '/admin/Question/knowQuestionoList',
    params: data,
    method: 'get',
  });
};

export const knowFourLevel = data => {
  return axios.request ({
    url: '/admin/Question/knowFourLevel',
    params: data,
    method: 'get',
  });
};
export const paperList = data => {
  return axios.request ({
    url: '/admin/Question/paperList',
    params: data,
    method: 'get',
  });
};

export const statusQuestion = data => {
  return axios.request ({
    url: '/admin/Question/statusQuestion',
    params: data,
    method: 'get',
  });
};
export const addQuestion = data => {
  return axios.request ({
    url: '/admin/Question/addQuestion',
    data,
    method: 'post',
  });
};
export const getQuestion = data => {
  return axios.request ({
    url: '/admin/Question/getQuestion',
    params: data,
    method: 'get',
  });
};

export const addPaper = data => {
  return axios.request ({
    url: '/admin/Question/addPaper',
    data,
    method: 'post',
  });
};
export const teaching = data => {
  return axios.request ({
    url: '/admin/Question/teaching',
    params: data,
    method: 'get',
  });
};
export const statusPaper = data => {
  return axios.request ({
    url: '/admin/Question/statusPaper',
    params: data,
    method: 'get',
  });
};

export const addCachePaper = data => {
  return axios.request ({
    url: '/admin/Question/addCachePaper',
    params: data,
    method: 'get',
  });
};

export const delCachePaper = data => {
  return axios.request ({
    url: '/admin/Question/delCachePaper',
    params: data,
    method: 'get',
  });
};

export const getPaper = data => {
  return axios.request ({
    url: '/admin/Question/getPaper',
    params: data,
    method: 'get',
  });
};
export const putPaper = data => {
  return axios.request ({
    url: '/admin/Question/putPaper',
    data,
    method: 'post',
  });
};

export const putQuestion = data => {
  return axios.request ({
    url: '/admin/Question/putQuestion',
    data,
    method: 'post',
  });
};

export const testPaperList = data => {
  return axios.request ({
    url: '/admin/Question/testPaperList',
    params: data,
    method: 'get',
  });
};
export const paperQueMove = data => {
  return axios.request ({
    url: '/admin/Question/paperQueMove',
    params: data,
    method: 'get',
  });
};
export const paperQueList = data => {
  return axios.request ({
    url: '/admin/Question/paperQueList',
    params: data,
    method: 'get',
  });
};

export const delPaperQue = data => {
  return axios.request ({
    url: '/admin/Question/delPaperQue',
    params: data,
    method: 'get',
  });
};

export const addPaperQuestion = data => {
  return axios.request ({
    url: '/admin/Question/addPaperQuestion',
    params: data,
    method: 'get',
  });
};

export const mockList = data => {
  return axios.request ({
    url: '/admin/Question/mockList',
    params: data,
    method: 'get',
  });
};

export const addPaperMock = data => {
  return axios.request ({
    url: '/admin/Question/addPaperMock',
    data,
    method: 'post',
  });
};
export const getMock = data => {
  return axios.request ({
    url: '/admin/Question/getMock',
    params: data,
    method: 'get',
  });
};
export const putPaperMock = data => {
  return axios.request ({
    url: '/admin/Question/putPaperMock',
    data,
    method: 'post',
  });
};
export const addMockKnow = data => {
  return axios.request ({
    url: '/admin/Question/addMockKnow',
    data,
    method: 'post',
  });
};
export const mockKnowList = data => {
  return axios.request ({
    url: '/admin/Question/mockKnowList',
    params: data,
    method: 'get',
  });
};
export const putMockKnowNum = data => {
  return axios.request ({
    url: '/admin/Question/putMockKnowNum',
    params: data,
    method: 'get',
  });
};
export const delMockKnow = data => {
  return axios.request ({
    url: '/admin/Question/delMockKnow',
    params: data,
    method: 'get',
  });
};
export const statusMock = data => {
  return axios.request ({
    url: '/admin/Question/statusMock',
    params: data,
    method: 'get',
  });
};
export const experContList = data => {
  return axios.request ({
    url: '/admin/Question/experContList',
    params: data,
    method: 'get',
  });
};
export const addQuestionExper = data => {
  return axios.request ({
    url: '/admin/Question/addQuestionExper',
    data,
    method: 'post',
  });
};
export const experQuesList = data => {
  return axios.request ({
    url: '/admin/Question/experQuesList',
    params: data,
    method: 'get',
  });
};
export const delExper = data => {
  return axios.request ({
    url: '/admin/Question/delExper',
    params: data,
    method: 'get',
  });
};
export const statusCorrection = data => {
  return axios.request ({
    url: '/admin/Question/statusCorrection',
    params: data,
    method: 'get',
  });
};
export const correctionList = data => {
  return axios.request ({
    url: '/admin/Question/correctionList',
    params: data,
    method: 'get',
  });
};

export const paperContentExport = data => {
  return axios.request ({
    url: '/admin/Question/paperContentExport',
    params: data,
    method: 'get',
  });
};
export const sprintList = data => {
  return axios.request ({
    url: '/admin/Question/sprintList',
    params: data,
    method: 'get',
  });
};
export const sprintContentExport = data => {
  return axios.request ({
    url: '/admin/Question/sprintContentExport',
    params: data,
    method: 'get',
  });
};
export const sprintPaperMove = data => {
  return axios.request ({
    url: '/admin/Question/sprintPaperMove',
    params: data,
    method: 'get',
  });
};
export const statusSprintPaper = data => {
  return axios.request ({
    url: '/admin/Question/statusSprintPaper',
    params: data,
    method: 'get',
  });
};
export const addSprintPaper = data => {
  return axios.request ({
    url: '/admin/Question/addSprintPaper',
    data,
    method: 'post',
  });
};
export const getSprintPaper = data => {
  return axios.request ({
    url: '/admin/Question/getSprintPaper',
    params: data,
    method: 'get',
  });
};
export const putSprintPaper = data => {
  return axios.request ({
    url: '/admin/Question/putSprintPaper',
    data,
    method: 'post',
  });
};
export const testSprPaperList = data => {
  return axios.request ({
    url: '/admin/Question/testSprPaperList',
    params: data,
    method: 'get',
  });
};
export const addSprPaperQuestion = data => {
  return axios.request ({
    url: '/admin/Question/addSprPaperQuestion',
    data,
    method: 'post',
  });
};
export const sprQueList = data => {
  return axios.request ({
    url: '/admin/Question/sprQueList',
    params: data,
    method: 'get',
  });
};
export const delSprPaperQue = data => {
  return axios.request ({
    url: '/admin/Question/delSprPaperQue',
    params: data,
    method: 'get',
  });
};
export const paperMove = data => {
  return axios.request ({
    url: '/admin/Question/paperMove',
    params: data,
    method: 'get',
  });
};
export const putPlate = data => {
  return axios.request ({
    url: '/admin/Question/putPlate',
    params: data,
    method: 'get',
  });
};
