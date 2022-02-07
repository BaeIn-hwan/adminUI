module.exports = {
	lintOnSave: false,	// ESLint 설정 끄는 방법
	css: {
    loaderOptions: {
      sass: {
        additionalData:
					`@import "@/assets/scss/_styles.scss";`,
      },
    }
  },
  pages: {
    admin: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Admin Page'
    },
    login: {
      entry: 'src/login.js',
      template: 'public/login.html',
      filename: 'login.html',
      title: 'Login Page'
    }
  }
}