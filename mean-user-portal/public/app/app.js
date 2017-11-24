angular.module("userApp", [
    'appRoutes',
    'userControllers',
    'userServices',
    'ngAnimate',
    'mainController',
    'authServices',
    'emailController',
    "managementController"
]).config( ($httpProvider) => {
    $httpProvider.interceptors.push('AuthInterceptors');
});