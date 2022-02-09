module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "ID CARD MAKER",
                appId: 'id.card.com',
                win: {
                    "target": [
                        "nsis"
                    ],
                  icon: 'public/logo2.png',
                  "requestedExecutionLevel": "requireAdministrator"
                },
                "nsis": {
                    "installerIcon": "public/favicon.ico",
                    "uninstallerIcon": "public/favicon.ico",
                    "license": "license.txt",
                    "uninstallDisplayName": "Unistall App",
                    "oneClick": false,
                    "allowToChangeInstallationDirectory": true
                }
            },
        }
    }
}