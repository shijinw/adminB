const Main = () => import("@/view/main");
const ParentView = () => import("@/components/parent-view");
const Login = () => import("@/view/login/login.vue");
const Direction = () => import("@/view/feedback/direction.vue");
const Home = () => import("@/view/single-page/home");
const Error401 = () => import("@/view/error-page/401.vue");
const Error500 = () => import("@/view/error-page/500.vue");
const Error404 = () => import("@/view/error-page/404.vue");
const JoinPage = () => import("@/view/join-page.vue");
const CountTo = () => import("@/view/components/count-to/count-to.vue");
const DragList = () => import("@/view/components/drag-list/drag-list.vue");
const Table = () => import("@/view/components/tables/tables.vue");
const SplitPane = () => import("@/view/components/split-pane/split-pane.vue");
const Markdown = () => import("@/view/components/markdown/markdown.vue");
const Editor = () => import("@/view/components/editor/editor.vue");
const Icons = () => import("@/view/components/icons/icons.vue");
const UpdateTable = () => import("@/view/update/update-table.vue");
const UpdatePaste = () => import("@/view/update/update-paste.vue");
const UploadExcel = () => import("@/view/excel/upload-excel.vue");
const ExportExcel = () => import("@/view/excel/export-excel.vue");
const ToolsMethods = () => import("@/view/tools-methods/tools-methods.vue");
const Directive = () => import("@/view/directive/directive.vue");
const Level21 = () => import("@/view/multilevel/level-2-1.vue");
const Level31 = () => import("@/view/multilevel/level-2-2/level-3-1.vue");
const Level23 = () => import("@/view/multilevel/level-2-3.vue");
const Params = () => import("@/view/argu-page/params.vue");
const Query = () => import("@/view/argu-page/query.vue");

/*
 *系统管理
 */
// 权限管理
const Control = () => import("@/view/permission/control.vue");
// 角色列表
const Role = () => import("@/view/permission/role.vue");
// 日志管理
const Log = () => import("@/view/log/log.vue");
// 热搜索词统计
const Search = () => import("@/view/permission/search.vue");
// 推荐课程管理
const RecommendCourse = () => import("@/view/permission/recommendCourse.vue");
// 答疑超时设置
const TimeOut = () => import("@/view/permission/timeOut.vue");
// 网站统计管理
const Count = () => import("@/view/permission/count.vue");
// APK展示列表
const Apklist = () => import("@/view/permission/Apklist.vue");
/*
 *账号管理
 */
// 账号列表
const Number = () => import("@/view/number/number.vue");

/*
 *学员管理
 */
// 学员列表
const Student = () => import("@/view/student/student.vue");
// 学员操作记录
const Notes = () => import("@/view/student/notes.vue");
// 学员接收管理 - 班主任
const Receive = () => import("@/view/student/receive.vue");
// 审批学员 - 班主任管理员
const Audit = () => import("@/view/student/audit.vue");
// 学员列表 - 班主任
const StuListTeacher = () => import("@/view/student/stuListTeacher.vue");
// 学员列表 - 班主任管理员
const StuListAdmin = () => import("@/view/student/stuListAdmin.vue");
// 学员详情
const Details = () => import("@/view/student/details.vue");

/*
 *网站信息管理
 */
// 广告图管理
const Ad = () => import("@/view/info/ad.vue");
// 短信管理
const SMS = () => import("@/view/info/sms.vue");
// 在线咨询
const Advisory = () => import("@/view/info/advisory.vue");
// 基本信息配置
const Deploy = () => import("@/view/info/deploy.vue");
// 签到图管理
const Signlist = () => import("@/view/permission/signlist.vue");
// 友盟推送列表
const MessageList = () => import("@/view/permission/MessageList.vue");

/*
 *标签管理
 */
// 课程检索标签
const CourseTags = () => import("@/view/tags/courseTags.vue");

/*
 *讲师管理
 */
// 讲师列表
const TeacherList = () => import("@/view/teacher/teacherList.vue");
// 添加讲师
const AddTeacher = () => import("@/view/teacher/addTeacher.vue");
// 修改讲师
const PutTeacher = () => import("@/view/teacher/putTeacher.vue");
// 讲师头衔
const TitleList = () => import("@/view/teacher/titleList.vue");

/*
 *课程管理
 */
// 项目名称
const ProjectName = () => import("@/view/course/projectName.vue");
// 专业划分
const Profession = () => import("@/view/course/profession.vue");
// 分类标签
const Ctags = () => import("@/view/course/tags.vue");

// 知识点分类
const ClassIfy = () => import("@/view/course/classify.vue");
// 知识点管理
const ClassManage = () => import("@/view/course/ClassManage.vue");
// 知识点章管理
const Knowlist = () => import("@/view/course/konwlist.vue");
// 知识点节管理
const Konblist = () => import("@/view/course/konblist.vue");
// 机构列表
const Orgs = () => import("@/view/course/orgs.vue");
// 知识点库
const KnowLibs = () => import("@/view/course/knowLibs.vue");
// 视频库
const VideoList = () => import("@/view/course/videoList.vue");
// 课程包
const Course = () => import("@/view/course/course.vue");

// 课程列表
const CourseList = () => import("@/view/course/courseList.vue");
// 添加课程
const AddCourse = () => import("@/view/course/addCourse.vue");
// 修改课程
const PutCourse = () => import("@/view/course/putCourse.vue");
// 添加课程包
const AddAther = () => import("@/view/course/AddAther.vue");
// 查看课程包
const Examine = () => import("@/view/course/Examine.vue");
// 修改课程包
const PutAter = () => import("@/view/course/putAter.vue");
// 章节列表
const SectionList = () => import("@/view/course/sectionList.vue");
// 查看章节
const Schapter = () => import("@/view/course/Schapter.vue");

// 题库列表
const QuestionList = () => import("@/view/Question/questionlist.vue");
// 添加列表
const AddQuestion = () => import("@/view/Question/addquestion.vue");
// 修改列表
const PutQuestion = () => import("@/view/Question/putquestion.vue");
//板块内容列表
const Platelist = () => import("@/view/Question/Platelist.vue");

// 试卷列表
const PaperList = () => import("@/view/Question/PaperList.vue");
// 添加试卷
const AddPaper = () => import("@/view/Question/Addpaper.vue");
// 添加试卷
const Putpaper = () => import("@/view/Question/Putpaper.vue");
// 组卷模考列表
const CompositionList = () => import("@/view/Question/compositionlist.vue");
// 添加组卷模考
const AddComposition = () => import("@/view/Question/AddComposition.vue");
// 添加组卷模考
const PutComposition = () => import("@/view/Question/PutComposition.vue");
// o元体验试题
const Zerolist = () => import("@/view/Question/Zerolist.vue");
// 试题纠错列表
const Correction = () => import("@/view/Question/Correctionlist.vue");
// 冲刺训练营列表
const SprintList = () => import("@/view/Question/SprintList.vue");
// 添加训练营列表
const addSprintPaper = () => import("@/view/Question/addSprintPaper.vue");
// 修改训练营列表
const putSprintPaper = () => import("@/view/Question/putSprintPaper.vue");

// 课程答疑总池
const CurseQuestion = () => import("@/view/Answer/cursequestion.vue");
// 课程答疑池
const QuestionPlate = () => import("@/view/Answer/QuestionPlate.vue");
// 课程答疑板
const QuestionPood = () => import("@/view/Answer/QuestionPood.vue");

// 题库答疑总池
const QuesQuertion = () => import("@/view/Answer/QuesQuertion.vue");
// 题库答疑池
const QunsQuestion = () => import("@/view/Answer/queAnswerListB.vue");
// 题库答疑板
const QenQuestion = () => import("@/view/Answer/queAnswerListA.vue");

// 课程答疑回复
const putCAnwer = () => import("@/view/Answer/putCAnwer.vue");
// 课程答疑回复修改
const Answerall = () => import("@/view/Answer/Answerall.vue");
// 题库答疑回复
const QuestionReply = () => import("@/view/Answer/Questionreply.vue");
// 题库答疑回复修改
const putQuanter = () => import("@/view/Answer/putQanter.vue");

// 课程答疑统计列表
const CurseStatis = () => import("@/view/Answer/CurseStatis.vue");
// 题库答疑统计列表
const QuestionStatis = () => import("@/view/Answer/QuestionStatis.vue");
// 课程答疑统计图
const CurseEcharts = () => import("@/view/Answer/CurseEcharts.vue");
// 题库答疑统计图
const QuestionEcharts = () => import("@/view/Answer/QuestionEcharts.vue");
// 题库追问时间列表
const closeTimeList = () => import("@/view/Answer/closeTimeList.vue");
// 题库转移时间列表
const shiftTimeList = () => import("@/view/Answer/shiftTimeList.vue");
// 题库答疑投诉
const Complain = () => import("@/view/Answer/Complain.vue");
// 题库答疑投诉
const ThComplain = () => import("@/view/Answer/ThComplain.vue");

//课程答疑精华列表
const answerVideoList = () => import("@/view/Answer/answerVideoList.vue");
//题库答疑精华列表
const GoodQuestionList = () => import("@/view/Answer/GoodQuestionList.vue");

//订单列表
const Orderlist = () => import("@/view/Order/Orderlist.vue");
//流水列表
const Waterlist = () => import("@/view/Order/waterlist.vue");
//充值列表
const Recharge = () => import("@/view/Order/recharge.vue");

//优惠卷列表
const Discountlist = () => import("@/view/Discount/Discountlist.vue");
//发放优惠卷
const GrantConpon = () => import("@/view/Discount/GrantConpon.vue");
//课程卡列表
const Coursecard = () => import("@/view/Discount/Coursecard.vue");
//课程卡列表
const Courseload = () => import("@/view/Discount/Courseload.vue");
//课程卡列表
const cardBooksList = () => import("@/view/Discount/cardBooksList.vue");
//京东支付课程包列表
const jdPackageList = () => import("@/view/Discount/jdPackageList.vue");

//反馈列表
const FeedCard = () => import("@/view/feedback/feedCard.vue");
//用户信息采集
const Userlist = () => import("@/view/feedback/Userlist.vue");
//说明列表
const Explain = () => import("@/view/feedback/Explain.vue");
//添加学员风采
const addelegan = () => import("@/view/feedback/addelegan.vue");
//学员风采
const elegantList = () => import("@/view/feedback/elegantList.vue");
//增改详情
const AddEidor = () => import("@/view/feedback/AddEitor.vue");

//咨询列表
const ConsultList = () => import("@/view/Consult/Consultlist.vue");
//咨询列表
const NewList = () => import("@/view/Consult/NewList.vue");
//添加咨询
const AddConsult = () => import("@/view/Consult/Addconsult.vue");
//修改咨询
const PutConsult = () => import("@/view/Consult/Putconsult.vue");

//官网学员中心分类列表
const stuCenTypeList = () => import("@/view/Gwstucenter/stuCenTypeList.vue");
//官网学员中心列表
const stuCenList = () => import("@/view/Gwstucenter/stuCenList.vue");
//添加官网学员中心数据
const addStuCen = () => import("@/view/Gwstucenter/addStuCen.vue");
//修改官网学员中心数据
const putStuCen = () => import("@/view/Gwstucenter/putStuCen.vue");
//官网学员报名列表
const bmList = () => import("@/view/Gwstucenter/bmList.vue");

//学习中心列表
const Learninglist = () => import("@/view/learning/Learninglist.vue");
//考期列表
const Examinelist = () => import("@/view/learning/Examinelist.vue");
//0元体验列表
const ZerostudyList = () => import("@/view/learning/Zerostudylist.vue");

//积分规则列表
const integralTypeList = () => import("@/view/Integral/integralTypeList.vue");
//积分商品列表
const IntegralTowTypeList = () =>
  import("@/view/Integral/IntegralTowTypeList.vue");
//添加积分商品
const addGoods = () => import("@/view/Integral/addGoods.vue");
//修改积分商品
const putGoods = () => import("@/view/Integral/putGoods.vue");
//积分订单列表
const Goods = () => import("@/view/Integral/Goods.vue");

//图书管理列表
const Booklist = () => import("@/view/Books/Booklist.vue");
//添加图书信息
const AddBooks = () => import("@/view/Books/AddBooks.vue");
//修改图书信息
const PutBooks = () => import("@/view/Books/PutBooks.vue");
//修改图书信息
const CBooks = () => import("@/view/Books/CBooks.vue");

//后期教育模块
//后续教育预售课列表
const previewList = () => import("@/view/Educode/previewList.vue");
//后续教育预售课编辑
const EduPreview = () => import("@/view/Educode/EduPreview.vue");
//后续教育分类列表
const eduTypeList = () => import("@/view/Educode/eduTypeList.vue");

//后续教育课程包列表
const eduPackageList = () => import("@/view/Educode/eduPackageList.vue");
//添加后续教育课程包
const addEduPackage = () => import("@/view/Educode/addEduPackage.vue");
//修改后续教育课程包
const putEduPackage = () => import("@/view/Educode/putEduPackage.vue");
//后续教育课程列表
const eduCourseList = () => import("@/view/Educode/eduCourseList.vue");
//添加后续教育课程
const addEduCourse = () => import("@/view/Educode/addEduCourse.vue");
//后续教育修改课程
const putEduCourse = () => import("@/view/Educode/putEduCourse.vue");
//章节管理
const EduSectionlist = () => import("@/view/Educode/EduSectionlist.vue");
//后期教育视频列表
const eduVideoList = () => import("@/view/Educode/eduVideoList.vue");
export const routerMap = {
  Main,
  ParentView,
  Login,
  Home,
  Direction,
  Error401,
  Error500,
  Error404,
  JoinPage,
  CountTo,
  DragList,
  Table,
  SplitPane,
  Markdown,
  Editor,
  Icons,
  UpdateTable,
  UpdatePaste,
  UploadExcel,
  ExportExcel,
  ToolsMethods,
  Directive,
  Level21,
  Level31,
  Level23,
  Params,
  Query,
  Control,
  Number,
  Role,
  Log,
  Student,
  Notes,
  Search,
  RecommendCourse,
  TimeOut,
  Count,
  Ad,
  Apklist,
  SMS,
  Advisory,
  Deploy,
  CourseTags,
  TeacherList,
  AddTeacher,
  PutTeacher,
  TitleList,
  Receive,
  Audit,
  StuListTeacher,
  StuListAdmin,
  Details,
  ProjectName,
  Profession,
  Ctags,
  Orgs,
  KnowLibs,
  VideoList,
  Course,
  PutAter,
  CourseList,
  AddCourse,
  ClassIfy,
  AddAther,
  PutCourse,
  Examine,
  SectionList,
  QuestionList,
  AddQuestion,
  PutQuestion,
  PaperList,
  AddPaper,
  Signlist,
  Putpaper,
  ClassManage,
  Schapter,
  Zerolist,
  CompositionList,
  AddComposition,
  PutComposition,
  CurseQuestion,
  QuestionPood,
  QuestionPlate,
  QunsQuestion,
  Answerall,
  QenQuestion,
  QuesQuertion,
  QuestionReply,
  closeTimeList,
  CurseStatis,
  QuestionStatis,
  CurseEcharts,
  QuestionEcharts,
  Orderlist,
  Waterlist,
  Recharge,
  Discountlist,
  GrantConpon,
  putCAnwer,
  FeedCard,
  Explain,
  ConsultList,
  NewList,
  AddConsult,
  PutConsult,
  Knowlist,
  Konblist,
  Learninglist,
  Examinelist,
  ZerostudyList,
  MessageList,
  Coursecard,
  Correction,
  elegantList,
  AddEidor,
  putQuanter,
  addelegan,
  Userlist,
  integralTypeList,
  IntegralTowTypeList,
  addGoods,
  putGoods,
  Goods,
  Booklist,
  AddBooks,
  PutBooks,
  CBooks,
  shiftTimeList,
  Complain,
  ThComplain,
  Courseload,
  cardBooksList,
  previewList,
  eduTypeList,
  eduPackageList,
  addEduPackage,
  putEduPackage,
  eduCourseList,
  EduPreview,
  putEduCourse,
  addEduCourse,
  EduSectionlist,
  eduVideoList,
  SprintList,
  addSprintPaper,
  putSprintPaper,
  Platelist,
  stuCenList,
  stuCenTypeList,
  addStuCen,
  putStuCen,
  GoodQuestionList,
  answerVideoList,
  bmList,
  jdPackageList
};

export const staticRouters = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login - 登录",
      hideInMenu: true
    },
    component: routerMap["Login"]
  },
  {
    path: "/Direction",
    name: "Direction",
    meta: {
      title: "direction - 使用说明",
      hideInMenu: true
    },
    component: routerMap["Direction"]
  },
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    meta: {
      notCache: true,
      hideInMenu: true
    },
    component: routerMap["Main"],
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          notCache: true,
          hideInMenu: true,
          title: "概览"
        },
        component: routerMap["Home"]
      }
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: routerMap["Error401"]
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: routerMap["Error500"]
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: routerMap["Error404"]
  }
];
