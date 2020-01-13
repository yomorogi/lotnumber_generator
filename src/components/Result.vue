<template>
  <div>
    <h1>ミニロト</h1>
    <table id="lotnumber-table">
      <tr v-for="(numbers, index) in minilot_numbers" v-bind:key="index">
      <!-- 指定された数値だけ色を変更 -->
        <td v-for="item in numbers" v-bind:key="item.number" v-bind:class="[item.isSelect ? 'is-selected': 'not-selected']">
          {{ item.number }}
          </td>
      </tr>
    </table>
    サンプル配列データ
    {{ minilot_numbers }}
  </div>
</template>

<script>
export default {
  name: 'result-numbers',
  props: {
    minilot_numbers: Array,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/** テーブル要素中央寄せ */
table {
  margin: 0 auto;
  box-sizing: border-box
}

.is-selected {
  background-color:coral;
}

.not-selected {
  background-color:cornsilk;
}

#lotnumber-table {
  width: 50%;
  height: 300px;
  border-collapse: collapse;
  border:1px solid gray;
}

#lotnumber-table td, tr {
  border:1px solid gray;
}


</style>
