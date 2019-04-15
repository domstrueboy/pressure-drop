# pressure-drop

> Программа для расчёта перепада давления датчиков Фломак

exe-версия программы лежит в "/build", файл "pressure-drop Setup 0.1.0.exe"
web-версия программы лежит в "/dist/web", при передаче нужно копировать всю папку, для запуска - открыть в браузере файл "index.html"


Программа написана на языке JavaScript с использованием ElectronJS (https://electronjs.org/)
Для сборки должны быть установлены следующие программы:
nodejs (https://nodejs.org/en/), yarn (https://yarnpkg.com/en/), windows-build-tools (https://github.com/felixrieseberg/windows-build-tools)

#### Build Setup

``` bash
# Установка зависимостей
yarn

# запуск для разработки (с livereload) на localhost:9080
yarn run dev

# собрать exe версию приложения (для сборки необходимо переложить исходники в папку, путь к которой состоит из латинских символов)
yarn run build

# собрать web версию приложения (для работы в брузере) (для сборки необходимо переложить исходники в папку, путь к которой состоит из латинских символов)
yarn run build:web
```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
