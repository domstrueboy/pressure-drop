<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex d-flex sm12 md6 lg4>
        <v-card flat>
          <v-layout row wrap>
<!-- Выбор Ду ------------------------------------------------------------------------------------------------------------------>
            <v-flex d-flex xs4>
              <v-card-text>
                <v-select
                  v-bind:items="Dns"
                  v-model = "Dn"
                  label="Выберите Ду"
                  hint="Выберите Ду"
                  persistent-hint
                  single-line
                ></v-select>
              </v-card-text>
            </v-flex>
<!-- Погрешность ---------------------------------------------------------------------------------------------------------------->
            <v-flex d-flex xs4>
              <v-card-text>
                <v-text-field
                    label="Погрешность"
                    v-model.lazy="errorInput"
                    @input="inputInput()"
                    @change="changeInput('errorInput', errorInput, 'errorInput')"
                    @keyup.enter="enterInput('errorInput', errorInput, 'errorInput')"
                    suffix="%"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
<!-- Жидкость или газ ---------------------------------------------------------------------------------------------------------->
            <v-flex d-flex xs1 style="cursor: pointer">
              <v-card-text class="text-xs-right inactive" @click="isLiquid=false" :class="{ active: !isLiquid }">
                <v-icon large color="blue" :disabled="isLiquid" style="cursor: pointer">toys</v-icon>
                Газ
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs1>
              <v-card-text class="text-xs-center">
                <v-switch v-model="isLiquid" color="grey darken-1"></v-switch>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs1 style="cursor: pointer">
              <v-card-text class="text-xs-left inactive" @click="isLiquid=true" :class="{ active: isLiquid }">
                <v-icon large color="blue" :disabled="!isLiquid" style="cursor: pointer">local_gas_station</v-icon>
                Жидк
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Плотность ------------------------------------------------------------------------------------------------------------------>
          <hr>
          <v-layout row wrap>
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Плотность"
                    v-model.lazy="densityInput.input"
                    @input="inputInput()"
                    @change="changeInput('densityInput.input', densityInput.input, 'densityInput')"
                    @keyup.enter="enterInput('densityInput.input', densityInput.input, 'densityInput')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y>
                  <p slot="activator">
                    {{ densityInput.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in densityInput.units" :key="item" @click="densityInput.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer" v-if="!isLiquid">
              <v-card-text class="text-xs-right inactive switch-label" @click="isWork=false" :class="{ active: !isWork }">
                В норм. условиях
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs1 v-if="!isLiquid && !isNormal">
              <v-card-text class="text-xs-center switch-switch">
                <v-switch v-model="isWork" color="grey darken-1" :disabled="isLiquid"></v-switch>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer" v-if="!isLiquid && !isNormal">
              <v-card-text class="text-xs-left inactive switch-label" @click="isWork=true" :class="{ active: isWork }">
                В рабоч. условиях
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Вязкость ------------------------------------------------------------------------------------------------------------------>          
          <hr>
          <v-layout row wrap>
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Вязкость"
                    v-model.lazy="viscosityInput.input"
                    @input="inputInput()"
                    @change="changeInput('viscosityInput.input', viscosityInput.input, 'viscosityInput')"
                    @keyup.enter="enterInput('viscosityInput.input', viscosityInput.input, 'viscosityInput')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y v-if="isKinematic">
                  <p slot="activator">
                    {{ viscosityInput.kinematic.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in viscosityInput.kinematic.units"
                    :key="item"
                    @click="viscosityInput.kinematic.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else>
                  <p slot="activator">
                    {{ viscosityInput.dynamic.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in viscosityInput.dynamic.units"
                    :key="item"
                    @click="viscosityInput.dynamic.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer">
              <v-card-text class="text-xs-right inactive switch-label" @click="isKinematic=false" :class="{ active: !isKinematic }">
                Динамич.
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs1>
              <v-card-text class="text-xs-center switch-switch">
                <v-switch v-model="isKinematic" color="grey darken-1"></v-switch>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer">
              <v-card-text class="text-xs-left inactive switch-label" @click="isKinematic=true" :class="{ active: isKinematic }">
                Кинемат.
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Минимальный расход -------------------------------------------------------------------------------------------------------------------->
          <hr>
          <v-layout row wrap>
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Мин. расход"
                    v-model.lazy="flowInput.inputMin"
                    @input="inputInput()"
                    @change="changeInput('flowInput.inputMin', flowInput.inputMin, 'flowInputMin')"
                    @keyup.enter="enterInput('flowInput.inputMin', flowInput.inputMin, 'flowInputMin')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y v-if="isMass">
                  <p slot="activator">
                    {{ flowInput.mass.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.mass.units" :key="item" @click="flowInput.mass.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else-if="isLiquid">
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else>
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units_with_norm" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Номинальный расход -------------------------------------------------------------------------------------------------------------------->
          <v-layout row wrap>
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Раб. расход"
                    v-model.lazy="flowInput.input"
                    @input="inputInput()"
                    @change="changeInput('flowInput.input', flowInput.input, 'flowInput')"
                    @keyup.enter="enterInput('flowInput.input', flowInput.input, 'flowInput')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y v-if="isMass">
                  <p slot="activator">
                    {{ flowInput.mass.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.mass.units" :key="item" @click="flowInput.mass.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else-if="isLiquid">
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else>
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units_with_norm" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer">
              <v-card-text class="text-xs-right inactive switch-label" @click="isMass=false" :class="{ active: !isMass }">
                Объёмный
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs1>
              <v-card-text class="text-xs-center switch-switch">
                <v-switch v-model="isMass" color="grey darken-1"></v-switch>
              </v-card-text>
            </v-flex>

            <v-flex d-flex xs2 style="cursor: pointer">
              <v-card-text class="text-xs-left inactive switch-label" @click="isMass=true" :class="{ active: isMass }">
                Массовый
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Максимальный расход -------------------------------------------------------------------------------------------------------------------->
          <v-layout row wrap>
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Макс. расход"
                    v-model.lazy="flowInput.inputMax"
                    @input="inputInput()"
                    @change="changeInput('flowInput.inputMax', flowInput.inputMax, 'flowInputMax')"
                    @keyup.enter="enterInput('flowInput.inputMax', flowInput.inputMax, 'flowInputMax')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y v-if="isMass">
                  <p slot="activator">
                    {{ flowInput.mass.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.mass.units" :key="item" @click="flowInput.mass.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else-if="isLiquid">
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-menu offset-y v-else>
                  <p slot="activator">
                    {{ flowInput.volume.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in flowInput.volume.units_with_norm" :key="item" @click="flowInput.volume.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>
          </v-layout>
<!-- Рабочее давление ---------------------------------------------------------------------------------------------------------->
          <hr v-if="!isLiquid && !isWork">
          <v-layout row wrap v-if="!isLiquid && !isWork">
            <v-flex d-flex xs3>
              <v-card-text>
                <v-text-field
                    label="Избыт. давл."
                    v-model.lazy="pressureInput.input"
                    @input="inputInput()"
                    @change="changeInput('pressureInput.input', pressureInput.input, 'pressureInput')"
                    @keyup.enter="enterInput('pressureInput.input', pressureInput.input, 'pressureInput')"
                    type="float"
                ></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs4 class="unitContainer">
              <v-card-text>
                <v-menu offset-y>
                  <p slot="activator">
                    {{ pressureInput.unit }}
                    <v-icon style="cursor: pointer">arrow_drop_down</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in pressureInput.units" :key="item" @click="pressureInput.unit=item">
                      {{ item }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>
            
          </v-layout>
<!-- Типовые среды------- ---------------------------------------------------------------------------------------------------------->
          <hr>
          <v-layout row wrap>
            <v-flex d-flex xs5>
              <v-card-text>
                <v-menu offset-y top>
                  <p slot="activator">
                    Типовые среды
                    <v-icon style="cursor: pointer">arrow_right</v-icon>
                  </p>

                  <v-list>
                    <v-list-tile v-for="item in typeEnvironments" :key="item.name" @click="applyTypeEnv(item)">
                      {{ item.name }}
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      
<!-- График ------------------------------------------------------------------------------------------------------------------------>
      <v-flex d-flex sm12 md6 lg8>
        <v-card flat>
          <v-card-text>
            <line-chart class="line-chart" :chart-data="datacollection" :options="options"></line-chart>
          </v-card-text>
          <v-layout row wrap>
            <v-flex d-flex xs2>
              <v-card-text>
                <v-btn fab
                      large
                      @click="reloadButton()"
                      :color="buttonColor"><v-icon>cached</v-icon>
                </v-btn>
              </v-card-text>
            </v-flex>
            <v-flex d-flex xs9>
              <v-card-text>
                <strong>Мин.расход:</strong>       {{parseFloat(flowInput.inputMin).toFixed(2)}} {{((isMass) ?  flowInput.mass.unit : flowInput.volume.unit)}},<br>
                <strong>Перепад давления:</strong> {{ numberBeautify(getPressurePoint(Dn, mFlowMin, Diameter, density, viscosity, Qmax, Δp)/1e6) }} МПа,<br> 
                <strong>Погрешность:</strong>      {{(getErrorPoint(mFlowMin, errorInput, ZeroStability)).toFixed(2)}} %;
              </v-card-text>
              <v-card-text>
                <strong>Раб.расход:</strong>       {{parseFloat(flowInput.input).toFixed(2)}} {{((isMass) ?  flowInput.mass.unit : flowInput.volume.unit)}},<br>
                <strong>Перепад давления:</strong> {{ numberBeautify(getPressurePoint(Dn, mFlow, Diameter, density, viscosity, Qmax, Δp)/1e6) }} МПа,<br> 
                <strong>Погрешность:</strong>      {{(getErrorPoint(mFlow, errorInput, ZeroStability)).toFixed(2)}} %;
              </v-card-text>
              <v-card-text>
                <strong>Макс.расход:</strong>      {{parseFloat(flowInput.inputMax).toFixed(2)}} {{((isMass) ?  flowInput.mass.unit : flowInput.volume.unit)}},<br>
                <strong>Перепад давления:</strong> {{ numberBeautify((getPressurePoint(Dn, mFlowMax, Diameter, density, viscosity, Qmax, Δp)/1e6) )}} МПа,<br> 
                <strong>Погрешность:</strong>      {{(getErrorPoint(mFlowMax, errorInput, ZeroStability)).toFixed(2)}} %;
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import LineChart from './LineChart.js'
  import { SSL_OP_NO_TLSv1_2 } from 'constants';

  const PI = Math.PI
  const lg = Math.log10

  export default {
    components: {
      LineChart
    },
    data () {
      return {

        // То, что требуется на выходе
        scalePoints: [],
        points: [],
        pressure: [],
        error: [],

        /* Область отображения по горизонтальной оси */
        mFlowMin: 0.028,
        mFlow:    0.750, 
        mFlowMax: 0.833,

        annotationMFlowInputMin: 100,
        annotationMFlowInput:    2700,
        annotationMFlowInputMax: 3000,

        density: 1000,
        viscosity: 1.006e-6,

        Diameter: 0.2,
        Qmax: 3000,
        ZeroStability: 0.2,
        Δp: 0.2,

        Dns: ['Ду2', 'Ду3', 'Ду4,5', 'Ду10', 'Ду15', 'Ду25', 'Ду32', 'Ду50', 'Ду80', 'Ду100'],
        Dn: localStorage.getItem('Dn') || 'Ду15',

        errorInput: localStorage.getItem('errorInput') || 0.2,

        isLiquid: this.is('isLiquid'),

        densityInput: {
          input: localStorage.getItem('densityInput') || 998.2,
          unit: localStorage.getItem('densityUnit')  || 'кг/м³',
          units: ['кг/м³', 'г/см³'],
        },

        isWork: this.is('isWork'),

        viscosityInput: {
          input: localStorage.getItem('viscosityInput')  || 1.006e-6,
          kinematic: {
            unit: localStorage.getItem('kinematicViscosityUnit')  || 'м²/с',
            units: ['м²/с', 'сСт']
          },
          dynamic: {
            unit: localStorage.getItem('dynamicViscosityUnit')  || 'Па·с',
            units: ['Па·с', 'П']
          }
        },

        isKinematic: this.is('isKinematic'),

        flowInput: {
          inputMin: localStorage.getItem('flowInputMin')  || 1,
          input:    localStorage.getItem('flowInput')     || 2700,
          inputMax: localStorage.getItem('flowInputMax')  || 3000,
          volume: {
            unit: localStorage.getItem('volumeFlowUnit')  || 'м³/ч',
            units: ['м³/ч', 'м³/с'],
            units_with_norm: ['м³/ч', 'м³/с', 'н.м³/ч', 'н.м³/с']
          },
          mass: {
            unit: localStorage.getItem('massFlowUnit')  || 'кг/ч',
            units: ['кг/ч', 'т/ч']
          }
        },

        isMass: this.is('isMass'),

        isNormal: this.is('isNormal'),

        pressureInput: {
          input: localStorage.getItem('pressureInput')  || 0.101325,
          unit: localStorage.getItem('pressureUnit')  || 'МПа',
          units: ['МПа', 'бар'],
        },

        typeEnvironments: (function(){try{return require('../../../static/typeEnvironments.json')} catch(e){return {}}})(),

        buttonDisabled: true,

        // Предварительная конфигурация линий
        datacollection: {
          datasets: [
            {
              label: 'Перепад давления',
              yAxisID: 'Перепад давления',
              borderColor: 'red',
              backgroundColor: 'red',
              data: [],
              fill: false,
              radius: 0,
              hitRadius: 7
            },
            {
              label: 'Погрешность',
              yAxisID: 'Погрешность',
              borderColor: 'green',
              backgroundColor: 'green',
              data: [],
              fill: false,
              borderDash: [15, 10],
              radius: 0,
              hitRadius: 7
            }
          ]
        }
      }
    },
    computed:
    {
      buttonColor: function(){
        if (this.buttonDisabled){
          return "gray"
        }
        else {
          return "red"
        }
      },

      options: function(){
        return {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            xAxes:
            [
              {
                id: 'Расход',
                type: 'logarithmic',
                gridLines: {
                  display: true,
                  lineWidth: 2
                },
                scaleLabel: {
                  labelString: 'Расход, ' + String( (this.isMass) ?  this.flowInput.mass.unit : this.flowInput.volume.unit ),
                  display: true
                },
                ticks: {
                  min: this.scalePoints[0],
                  max: this.scalePoints[this.scalePoints.length-1],
                  minRotation: 45,
                  maxRotation: 90,
                  callback: function(value, index, values){

                    value = value.toFixed(2).toString().split('')

                    if( value[value.length-1] === '0'){
                      value.pop()
                    }
                    return value.join('')
                  }
                }
              }
            ],
            yAxes:
            [
              {
                id: 'Перепад давления',
                type: 'logarithmic',
                position: 'left',
                gridLines: {
                  display: true,
                  lineWidth: 2
                },
                scaleLabel: {
                  labelString: 'Перепад давления, МПа',
                  display: true
                },
                ticks: {
                  min: this.pressure[0]/1e6,
                  max: Math.max.apply(null, this.pressure)/1e6*2.5,
                  callback: function(value, index, values){
                    value = value.toExponential(0)
                    if ( value.split('e')[0] !== '1' ){
                      value = null
                    }
                    return value
                  }
                }
              },
              {
                id: 'Погрешность',
                type: 'linear',
                position: 'right',
                gridLines: {
                  display: true,
                  color: 'darkgray',
                  borderDash: [2,5]
                },
                scaleLabel: {
                  labelString: 'Погрешность, %',
                  display: true
                },
                ticks: {
                  //stepSize: 0.1,
                  min: 0,
                  max: Math.max.apply(null, this.error)*1.25
                }
              }
            ]
          },
          annotation: {
            annotations: [
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'Расход',
              value: this.annotationMFlowInputMin,
              borderColor: 'blue',
              borderWidth: 4,
              label: {
                content: 'Расход: ' + parseFloat(this.flowInput.inputMin).toFixed(2) + ' ' + ((this.isMass) ?  this.flowInput.mass.unit : this.flowInput.volume.unit) + '; ' + 
                         'Перепад: ' + (this.getPressurePoint(this.Dn, this.mFlowMin, this.Diameter, this.density, this.viscosity, this.Qmax, this.Δp)/1e6).toFixed(3) + ' МПа; ' + 
                         'Погрешность: ' + (this.getErrorPoint(this.mFlowMin, this.errorInput, this.ZeroStability)).toFixed(2) + ' %',
                position: 'top',
                enabled: true,
                backgroundColor: 'blue',
                cornerRadius: 12,
                xAdjust: -155,
                yAdjust: 2,
                fontSize: 10
              }
            },
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'Расход',
              value: this.annotationMFlowInput,
              borderColor: 'black',
              borderWidth: 2,
              label: {
                content: 'Расход: ' + parseFloat(this.flowInput.input).toFixed(2) + ' ' + ((this.isMass) ?  this.flowInput.mass.unit : this.flowInput.volume.unit) + '; ' + 
                         'Перепад: ' + (this.getPressurePoint(this.Dn, this.mFlow, this.Diameter, this.density, this.viscosity, this.Qmax, this.Δp)/1e6).toFixed(3) + ' МПа; ' + 
                         'Погрешность: ' + (this.getErrorPoint(this.mFlow, this.errorInput, this.ZeroStability)).toFixed(2) + ' %',
                position: 'top',
                enabled: true,
                backgroundColor: 'black',
                cornerRadius: 12,
                xAdjust: 160,
                yAdjust: 25,
                fontSize: 10
              }
            },
            {
              type: 'line',
              mode: 'vertical',
              scaleID: 'Расход',
              value: this.annotationMFlowInputMax,
              borderColor: 'orange',
              borderWidth: 4,
              label: {
                content: 'Расход: ' + parseFloat(this.flowInput.inputMax).toFixed(2) + ' ' + ((this.isMass) ?  this.flowInput.mass.unit : this.flowInput.volume.unit) + '; ' +  
                         'Перепад: ' + (this.getPressurePoint(this.Dn, this.mFlowMax, this.Diameter, this.density, this.viscosity, this.Qmax, this.Δp)/1e6).toFixed(3) + ' МПа; ' + 
                         'Погрешность: ' + (this.getErrorPoint(this.mFlowMax, this.errorInput, this.ZeroStability)).toFixed(2) + ' %',
                position: 'top',
                enabled: true,
                backgroundColor: 'orange',
                cornerRadius: 12,
                xAdjust: 160,
                yAdjust: 48,
                fontSize: 10
              }
            },
            ]
          },
          tooltips: {
            mode: 'index',
            position: 'nearest',
            callbacks: {
              title: function(item){
                var unit = this._chart.scales.Расход.options.scaleLabel.labelString.split(' ')[1]
                return 'Расход: ' + item[0].xLabel.toFixed(2) + ' ' + unit
              },
              label: function(item) {
                if(item.datasetIndex === 0){
                  return 'Перепад: ' + item.yLabel.toFixed(3) + ' МПа'
                } 
                else if(item.datasetIndex === 1){
                  return 'Погрешность: ' + item.yLabel.toFixed(2) + ' %'
                } 
                else {
                  alert('Ошибка tooltip')
                }
              } 
            }
          },
          hover: {
            mode: 'x-axis'
          },
          legend: {
            labels: {
              usePointStyle: true
            }
          },
          animation: {
            duration: 0
          }
        }
      }
    },
    watch: { //Здесь будет логика переключателей
      Dn: function() {
        this.saveItem(this.Dn, 'Dn')
        this.buttonDisabled = false
      },
      isLiquid: function (newVal, oldVal) {
        this.saveItem(this.isLiquid, 'isLiquid')
        if(newVal) {
          this.flowInput.volume.unit = this.flowInput.volume.units[0]
          this.saveItem(this.flowInput.volume.units[0], 'volumeFlowUnit')
        }
        this.buttonDisabled = false
      },
      'densityInput.unit': function(newVal, oldVal) {
        this.saveItem(newVal, 'densityUnit')
        this.buttonDisabled = false
      },
      isWork: function(newVal, oldVal) {
        this.saveItem(this.isWork, 'isWork')
        /*if(newVal) {
          this.isLiquid = false
        }*/
        this.buttonDisabled = false
      },
      'viscosityInput.kinematic.unit': function(newVal, oldVal) {
        this.saveItem(newVal, 'kinematicViscosityUnit')
        this.buttonDisabled = false
      },
      'viscosityInput.dynamic.unit': function(newVal, oldVal) {
        this.saveItem(newVal, 'dynamicViscosityUnit')
        this.buttonDisabled = false
      },
      isKinematic: function() {
        this.saveItem(this.isKinematic, 'isKinematic')
        this.buttonDisabled = false
      },
      'flowInput.mass.unit': function(newVal, oldVal) {
        this.saveItem(newVal, 'massFlowUnit')
        this.buttonDisabled = false
      },
      'flowInput.volume.unit': function(newVal, oldVal){
        this.saveItem(newVal, 'volumeFlowUnit')
        if (newVal === 'н.м³/ч' || newVal === 'н.м³/c') {
          this.isNormal = true
          this.isWork = false
        }
        else {
          this.isNormal = false
        }
        this.buttonDisabled = false
      },
      isMass: function(newVal, oldVal) {
        this.saveItem(this.isMass, 'isMass')
        if (newVal) {
          this.isNormal = false
        } else {
          this.isNormal = true
        }
        this.buttonDisabled = false
      },
      isNormal: function() {
        this.isWork = false
        this.buttonDisabled = false
      },
      'pressureInput.unit': function(newVal, oldVal) {
        this.saveItem(newVal, 'pressureUnit')
        this.buttonDisabled = false
      }
    },
    mounted () {
      this.isNormal = false
      this.fillData()
    },
    methods: {
      fillData () {
        console.log('fillData')
        // Рабочее давление
        var operatingPressure = 0
        if (this.pressureInput.unit === 'МПа'){
          operatingPressure = this.pressureInput.input * 1e6 + 101325
        }
        else if (this.pressureInput.unit === 'бар'){
          operatingPressure = this.pressureInput.input * 1e5 + 101325
        }
        else{
          alert('Ошибка единиц измерения рабочего давления')
        }

        // Плотность
        var density = 0
        if(this.isLiquid === true) // Жидкость
        {
          if (this.densityInput.unit === 'кг/м³'){
            density = this.densityInput.input
          }
          else if (this.densityInput.unit === 'г/см³'){
            density = this.densityInput.input * 1000
          }
          else{
            alert('Ошибка единиц измерения плотности жидкости')
          }
        }
        else if(this.isLiquid === false){ // Газ
          if(this.isNormal === false){ // Расход в обычных единицах
            if (this.isWork === true){ // В рабочих условиях
              if (this.densityInput.unit === 'кг/м³'){
                density = this.densityInput.input
              }
              else if (this.densityInput.unit === 'г/см³'){
                density = this.densityInput.input * 1000
              }
              else{
                alert('Ошибка единиц измерения плотности в рабочих условиях')
              }
            }
            else if (this.isWork === false){ // В нормальных условиях
              if (this.densityInput.unit === 'кг/м³'){
                density = this.densityInput.input * operatingPressure / 101325
              }
              else if (this.densityInput.unit === 'г/см³'){
                density = this.densityInput.input * 1000 * operatingPressure / 101325
              }
              else{
                alert('Ошибка единиц измерения плотности в нормальных условиях')
              }
            }
          }
          else if(this.isNormal === true){ // Расход в нормализованных единицах
            if (this.densityInput.unit === 'кг/м³'){
              density = this.densityInput.input * operatingPressure / 101325
            }
            else if (this.densityInput.unit === 'г/см³'){
              density = this.densityInput.input * 1000 * operatingPressure / 101325
            }
            else{
              alert('Ошибка единиц измерения плотности в нормальных условиях')
            }
          }
        }
        else {
          alert('Ошибка плотности')
        }

        // Кинематическая вязкость, м²/с
        var viscosity = 0
        if (this.isKinematic === true){ // Кинематическая
          if (this.viscosityInput.kinematic.unit === 'м²/с'){
            viscosity = this.viscosityInput.input
          }
          else if (this.viscosityInput.kinematic.unit === 'сСт'){
            viscosity = this.viscosityInput.input * 1e-6
          }
          else {
            alert('Ошибка единиц измерения кинематической вязкости')
          }
        }
        else if (this.isKinematic === false){ // Динамическая
          if (this.viscosityInput.dynamic.unit === 'Па·с'){
            viscosity = this.viscosityInput.input/density
          }
          else if (this.viscosityInput.dynamic.unit === 'П'){
            viscosity = this.viscosityInput.input/density / 10
          }
          else {
            alert('Ошибка единиц измерения динамической вязкости')
          }
        }
        else{
          alert('Ошибка определения вида вязкости (Кинематическая/Динамическая)')
        }

        this.density = density
        this.viscosity = viscosity

        let computedParameters = this.getComputedParameters(this.Dn, density)
        let Diameter      = computedParameters.Diameter
        let Qmax          = computedParameters.Qmax
        let ZeroStability = computedParameters.ZeroStability
        let Δp            = computedParameters.Δp

        this.Diameter = Diameter
        this.Qmax = Qmax
        this.ZeroStability = ZeroStability
        this.Δp = Δp

        this.mFlowMin = this.getMFlow(this.flowInput.inputMin)
        this.mFlow    = this.getMFlow(this.flowInput.input)
        this.mFlowMax = this.getMFlow(this.flowInput.inputMax)

        this.annotationMFlowInputMin = this.flowInput.inputMin,
        this.annotationMFlowInput    = this.flowInput.input,
        this.annotationMFlowInputMax = this.flowInput.inputMax,

        // Получение искомых значений для графика
        this.scalePoints = this.getPoints(this.flowInput.inputMin, this.flowInput.inputMax)
        this.points   = this.getPoints(this.mFlowMin, this.mFlowMax)
        this.pressure = this.getPressure(this.Dn, this.points, Diameter, density, viscosity, Qmax, Δp)
        this.error    = this.getError(this.points, this.errorInput, ZeroStability)

        // Загрузка полученных значений на график
        for(let i = 0, len = this.scalePoints.length; i < len; i++){
          this.datacollection.datasets[0].data.push( {x: this.scalePoints[i], y: this.pressure[i]/1e6/*МПа*/ })
        }
        for(let i = 0, len = this.points.length; i < len; i++){
          this.datacollection.datasets[1].data.push( {x: this.scalePoints[i], y: this.error[i]/*%*/ })
        }
      },

      getComputedParameters(Dn, ρ) {

        if (Dn === 'Ду2')
        {
          var
          Diameter = 1.4142e-3 * 2**0.5, // м
          Qmax = 40/3600, // кг/с
          ZeroStability = 0.005/3600, // кг/с
          Δp = 1e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду3')
        {
          var
          Diameter = 2e-3 * 2**0.5, // м
          Qmax = 100/3600, // кг/с
          ZeroStability = 0.01/3600, // кг/с
          Δp = 1e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду4,5')
        {
          var
          Diameter = 3e-3 * 2**0.5, // м
          Qmax = 250/3600, // кг/с
          ZeroStability = 0.025/3600, // кг/с
          Δp = 1e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду10')
        {
          var
          Diameter = 6.4e-3 * 2**0.5, // м
          Qmax = 1200/3600, // кг/с
          ZeroStability = 0.15/3600, // кг/с
          Δp = 1e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду15')
        {
          var
          Diameter = 0.008 * 2**0.5, // м
          Qmax = 2700/3600, // кг/с
          ZeroStability = 0.3/3600, // кг/с
          Δp = 1e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду25')
        {
          var
          Diameter = 0.01768 * 2**0.5, // м
          Qmax = 12000/3600, // кг/с
          ZeroStability = 1.2/3600, // кг/с
          Δp = 7.8e4 * 998.2 / ρ;
        }
        else if (Dn === 'Ду32')
        {
          var
          Diameter = 0.02263 * 2**0.5, // м
          Qmax = 21000/3600, // кг/с
          ZeroStability = 2.1/3600, // кг/с
          Δp = 9e4 * 998.2 / ρ;
        }
        else if (Dn === 'Ду50')
        {
          var
          Diameter = 0.035 * 2**0.5, // м
          Qmax = 60000/3600, // кг/с
          ZeroStability = 6/3600, // кг/с
          Δp = 1.08e5 * 998.2 / ρ;
        }
        else if (Dn === 'Ду80')
        {
          var
          Diameter = 0.05657 * 2**0.5, // м
          Qmax = 100000/3600, // кг/с
          ZeroStability = 15/3600, // кг/с
          Δp = 4.9e4 * 998.2 / ρ;
        }
        else if (Dn === 'Ду100')
        {
          var
          Diameter = 0.07 * 2**0.5, // м
          Qmax = 240000/3600, // кг/с
          ZeroStability = 24/3600, // кг/с
          Δp = 6.3473e4 * 998.2 / ρ;
        }
        else
        {
          alert('Нет данных для вычисления ' + Dn);
        }
        return {Diameter: Diameter, Qmax: Qmax, ZeroStability: ZeroStability, Δp: Δp}
      },

      getPoints (Qmin, Qmax) {

        let resolution = 200,
            k = lg(Qmax/Qmin)/(resolution-1),
            a = Qmin/10**k,
            points = []

        for (let n = 1; n <= resolution; n++){
          points.push( a*10**(k*n) )
        }
        return points
      },

      getPressure (Dn, points, Diameter, density, viscosity, Qmax, Δp) {
        let pressure = []
        for ( let mFlow in points ){
          pressure.push( this.getPressurePoint(Dn, points[mFlow], Diameter, density, viscosity, Qmax, Δp) )
        }
        return pressure
      },

      getError (points, errorInput, ZeroStability) {
        let error = []
        for ( let mFlow in points ){
          error.push( this.getErrorPoint(points[mFlow], errorInput, ZeroStability) )
        }
        return error
      },

      getPressurePoint (Dn, mFlow, Diameter, density, viscosity, Qmax, Δp) {
        let /*** Исходные данные: ***/
        g = 9.807, // Ускорение свободного падения, м/с²
        Δэ = 0.06e-3 // Шероховатость, м

        ///////////// Основная функция ////////////////
        return ΔP( Dn,
                   Velocity(mFlow, Diameter, density),
                   Diameter,
                   viscosity,
                   Velocity1(Diameter, density, Qmax),
                   density,
                   Δp
        )
        ///////////////////////////////////////////////


        function ΔP(Dn, Velocity, d, μ, Velocity1, ρ, Δp) { // Перепад давления
          return λ(Velocity, d, μ) * Lэмп(Dn, Velocity1, d, μ, ρ, Δp) / d * ρ * (Velocity**2)/2
        }

        function Sq(d) { // Площадь сечения 
          return (PI*d**2)/4
        }

        function Velocity(mFlow, d, ρ) { // Скорость потока
          return mFlow / (ρ * Sq(d))
        }

        function Rey(Velocity, d, μ) { // Число Рейнольдса
          return Velocity * d / μ
        }

        function λ(Velocity, d, μ) { // Гидравлическое сопротивление трению
 
          if( Rey(Velocity, d, μ) <= 2300 ) {
            return 64 / Rey(Velocity, d, μ)
          }
          else if( (2300 < Rey(Velocity, d, μ)) && (Rey(Velocity, d, μ) <= 4000) ) {
            return 1 / ((1.8 * lg(Rey(Velocity, d, μ)) - 1.5)**2)
          }
          else if( (4000 < Rey(Velocity, d, μ)) && (Rey(Velocity, d, μ) <= 10 * d / Δэ) ) {
            return 0.3164 / (Rey(Velocity, d, μ)**0.25)
          }
          else if( (10 * d / Δэ < Rey(Velocity, d, μ)) && (Rey(Velocity, d, μ) <= 560 * d / Δэ) ) {
            return 1 / ((2 * lg( 2.51/Rey(Velocity, d, μ) + Δэ/3.7 ))**2)
          }
          else if( Rey(Velocity, d, μ) > 560 * d / Δэ ) {
            return 1 / ((2 * lg( 2.51/Rey(Velocity, d, μ) + Δэ/3.7 ))**2)
          }
        }

        function Velocity1(d, ρ, Qmax) { // Скорость на максимальном расходе
          return Qmax / (ρ * Sq(d))
        }
        /*function Lэмп(Dn, Velocity1, d, μ, ρ, Δp) { // Эмпирический коэффициент длины
          return 2 * Δp * d / ( (1 / (2 * lg( 2.51/Rey(Velocity1, d, μ) + Δэ/3.7 ))**2) * ρ * Velocity1**2 )
        }*/
        function Lэмп(Dn, Velocity1, d, μ, ρ, Δp) { // Эмпирический коэффициент длины
          if      ( Dn === 'Ду2'  ){ return  1.50298696 }
          else if ( Dn === 'Ду3'  ){ return  1.55148890 }
          else if ( Dn === 'Ду4,5'){ return  2.09719079 }
          else if ( Dn === 'Ду10' ){ return  4.65276491 }
          else if ( Dn === 'Ду15' ){ return  3.05442754 }
          else if ( Dn === 'Ду25' ){ return  6.86887268 }
          else if ( Dn === 'Ду32' ){ return  9.12744687 }
          else if ( Dn === 'Ду50' ){ return 12.33515293 }
          else if ( Dn === 'Ду80' ){ return 22.25671396 }
          else if ( Dn === 'Ду100'){ return 14.88583966 }
          else { alert('Нет данных для вычисления Lэмп ' + Dn) }
        }
      },

      getErrorPoint (mFlow, errorInput, ZeroStability) {
        let δ0 = parseFloat(errorInput) // Основная погрешность, %

        if( mFlow >= ZeroStability/(0.01*δ0) ){
          return δ0
        }
        else{
          return ZeroStability/mFlow * 100
        }
      },

      saveItem (event, item) {
        localStorage.setItem(item, event)
      },

      is(item) {
        let buf = localStorage.getItem(item)
        if (buf === 'true'){
          return true
        }
        else if (buf === 'false'){
          return false
        }
        else {
          return true
        }     
      },

      getMFlow(input){ // Расход, кг/c
        if (this.isMass === false){ // Объёмный
          if (this.flowInput.volume.unit === 'м³/ч'){
            return input * this.density / 3600
          }
          else if (this.flowInput.volume.unit === 'м³/с'){
            return input * this.density
          }
          else if (this.flowInput.volume.unit === 'н.м³/ч'){
            return input * this.density / 3600
          }
          else if (this.flowInput.volume.unit === 'н.м³/с'){
            return input * this.density
          }
          else {
            alert('Ошибка единиц измерения объёмного расхода')
          }
        }
        else if (this.isMass === true){ // Массовый
          if (this.flowInput.mass.unit === 'кг/ч'){
            return input / 3600
          }
          else if (this.flowInput.mass.unit === 'т/ч'){
            return input * 1000 / 3600
          }
          else {
            alert('Ошибка единиц измерения массового расхода')
          }
        }
        else{
          alert('Ошибка задания вида расхода (Объёмный/Массовый)')
        }
      },

      inputFix(input, name){
        input = input.split('.')
        if(input.length === 1){
          let buf = this[input].trim().replace(' ', '').replace(',', '.')
          if (buf[0] === '-') {
            buf = buf.slice(1)
          }
          buf = parseFloat( buf )
          if(buf === 0 && input[0] !== 'pressureInput')
          {
            buf = 1
          }
          if (buf < 0.001 || buf > 9999){
            buf = buf.toExponential()
          }
          this[input] = buf
          this.saveItem(buf, name)
        }
        else if(input.length === 2){
          let buf = this[ input[0]][input[1] ].trim().replace(' ', '').replace(',', '.')
          if (buf[0] === '-') {
            buf = buf.slice(1)
          }
          buf = parseFloat( buf )
          if(buf === 0 && input[0] !== 'pressureInput'){
            buf = 1
          }
          if (buf < 0.001 || buf > 9999){
            buf = buf.toExponential()
          }
          this[ input[0]][input[1] ] = buf
          this.saveItem(buf, name)
        }
        else {
          alert('Ошибка валидации ввода полей')
        }
      },

      numberBeautify(input){
        input = String(input)
        let buf = input.trim().replace(' ', '').replace(',', '.')
        if (buf[0] === '-') {
          buf = buf.slice(1)
        }
        buf = parseFloat( buf )
        if (buf < 0.01 || buf > 999){
          buf = buf.toExponential(3)
        }
        else {
          buf = buf.toFixed(3)
        }
        return String(buf)
      },

      inputInput(){
        //this.buttonDisabled = false
      },

      changeInput(fix, input, name){
        this.inputFix(fix, name)
        this.buttonDisabled = false
        //this.fillData()
      },

      enterInput(fix, input, name){
        this.inputFix(fix, name)
        this.buttonDisabled = false
        //this.fillData()
      },

      reloadButton(){ // Кнопка перезагрузки графика
        //window.location.reload()
        this.fillData()
        this.buttonDisabled = true
      },

      applyTypeEnv(item){
        this.isLiquid = item.isLiquid

        if (item.density < 0.001 || item.density > 9999){
          this.densityInput.input = item.density.toExponential()
        }
        else {
          this.densityInput.input = item.density
        }
        this.saveItem(this.densityInput.input, 'densityInput')
        
        this.densityInput.unit = item.densityUnit

        this.isWork = item.isWork

        if (item.viscosity < 0.001 || item.viscosity > 9999){
          this.viscosityInput.input = item.viscosity.toExponential()
        }
        else {
          this.viscosityInput.input = item.viscosity
        }
        this.saveItem(this.viscosityInput.input, 'viscosityInput')

        if (item.isKinematic === true) {
          this.viscosityInput.kinematic.unit = item.viscosityUnit
        }
        else if (item.isKinematic === false) {
          this.viscosityInput.dynamic.unit = item.viscosityUnit
        }
        else {
          console.log('Ошибка в единицах вязкости типовой среды')
        }
        
        this.isKinematic = item.isKinematic
        this.buttonDisabled = false
      }
    }
  }
</script>

<style>
  hr {
    background-color: #fff;
	  border-top: 1px dashed lightgray;
  }

  .small {
    max-width: 600px;
    margin:  0px auto;
    padding-top: 75px;
  }

  .unitContainer {
    margin-top: 25px;
  }

  .inactive {
    color: lightgray;
  }

  .active {
    color: black;
    font-weight: bold;
  }

  .switch-label {
    margin-top: 25px;
  }
  .switch-switch {
    margin-top: 20px;
  }
  .line-chart {
    height: 80vh !important;
  }
</style>
