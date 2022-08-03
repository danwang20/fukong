module.exports = {
  lintOnSave: false,
  devServer: {
    port: "2444",
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "辅控系统",
        appId: "org.simulatedgreg.nengchuan-app3",
        copyright: "杭州申弘智能科技有限公司 Copyright © 2020", // 版权信息
        directories: {
          output: "./dist/electron", // 输出文件路径
        },
        extraResources: ["extra-src/**/*"],
        electronDownload: {
          platform: "win32",
        },
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications",
            },
            {
              x: 130,
              y: 150,
              type: "file",
            },
          ],
        },
        mac: {
          icon: "build/icons/icon.icns",
        },
        win: {
          icon: "build/icons/icon.ico",
          target: ["nsis"],
          publish: [
            {
              provider: "generic",
              url: "", // 更新服务器地址,可为空
            },
          ],
        },
        linux: {
          icon: "build/icons",
          target: [
            {
              target: "dir",
              arch: ["x64"],
            },
          ],
        },
        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: true,
          allowElevation: false,
          deleteAppDataOnUninstall: false,
          // 'include': 'build/update.nsh'
        },
      },
    },
  },
  configureWebpack: {
    target: "electron-renderer",
  },
};
