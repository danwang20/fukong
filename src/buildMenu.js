function buildMenu(mainWindow) {
  let menuTemplate = [
    {
      label: "编辑",
      submenu: [
        { role: "undo", label: "撤销" },
        { role: "redo", label: "重做" },
        { type: "separator" },
        { role: "cut", label: "剪切" },
        { role: "copy", label: "复制" },
        { role: "paste", label: "粘贴" },
        { role: "delete", label: "删除" },
        { role: "selectall", label: "全选" },
        { type: "separator" },
        {
          label: "设置",
          click() {
            mainWindow.webContents.send("changeSettings");
          },
        },
      ],
    },
    {
      label: "显示",
      submenu: [
        { role: "reload", label: "刷新" },
        { role: "forcereload", label: "强制刷新" },
      ],
    },
    {
      label: "窗口",
      role: "window",
      submenu: [
        { role: "minimize", label: "最小化" },
        { role: "close", label: "关闭" },
      ],
    },
  ];

  menuTemplate.push({
    label: "开发",
    submenu: [{ role: "toggledevtools", label: "开发工具" }],
  });

  if (process.platform === "darwin") {
    menuTemplate.unshift({
      label: "消防集中监控系统",
      submenu: [
        { role: "about", label: "关于" },
        { type: "separator" },
        { role: "services", label: "服务", submenu: [] },
        { type: "separator" },
        { role: "hide", label: "隐藏" },
        { role: "hideothers", label: "隐藏其他" },
        { role: "unhide", label: "显示" },
        { type: "separator" },
        { role: "quit", label: "退出" },
      ],
    });
  }

  return menuTemplate;
}

export default buildMenu;
