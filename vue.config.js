const path = require('path');

module.exports = {
	lintOnSave: false,	// ESLint 설정 끄는 방법
	css: {
    loaderOptions: {
      sass: {
        additionalData:
					`@import "assets/scss/_styles.scss";`,
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': path.join(__dirname, 'src/components'),
        'assets': path.join(__dirname, 'src/assets'),
        'views': path.join(__dirname, 'src/views')
      }
    }
  },
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('components', path.resolve(__dirname, 'src/components'))
  //     .set('assets', path.resolve(__dirname, 'src/assets'))
  //     .set('views', path.resolve(__dirname, 'src/views'))
  // },
  // 멀티 페이지 설정 시 아래 설정 사용
  // pages: {
  //   admin: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     title: 'Admin Page'
  //   },
  //   login: {
  //     entry: 'src/login.js',
  //     template: 'public/login.html',
  //     filename: 'login.html',
  //     title: 'Login Page'
  //   }
  // }
}