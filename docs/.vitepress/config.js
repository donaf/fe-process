module.exports = {
  lang: 'zh-CN',
  title: 'fe-process',
  base: '/base/',
  description: '关于前端代码编写、测试、部署一系列流程',
  lastUpdated: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/donaf/fe-process' }],
    editLink: {
      pattern: 'https://github.com/donaf/fe-process/tree/doc/docs/:path',
      text: '在GitHub编辑此页',
    },
    footer: {
      message: '',
      copyright: '',
    },
  },
}

function nav() {
  return [
    { text: '介绍', link: '/guide/' },
  ]
}

function sidebarGuide() {
  return [
    {
      text: '介绍',
      collapsible: true,
      items: [
        { text: '介绍', link: '/guide/' },
        { text: '快速上手', link: '/guide/start' },
      ],
    }
  ]
}
