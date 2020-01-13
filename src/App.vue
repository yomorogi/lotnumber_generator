
<template>
  <div id="app">
    <!-- router-linkタグを使っている要素をクリックすると、router-viewの中身が切り替わる。
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    -->
    <!-- router-linkで選ばれたtemplateを表示 -->
    <router-view :minilot_numbers='rundomLotnumbers' />
    <div v-if="notclickButton">
      <!-- 吉日かどうかのメッセージを表示 -->
      <h1>{{isLuckydayMessage}}</h1>
      <h2>{{nearLuckydayMessage}}</h2>
      
      <button class="generate-number" v-show="!ableButtonFlg" v-on:click="clickNumberButton">ミニロトナンバーを生成</button>
    </div>
  </div>
</template>

<script>
import luckydaysjson from './assets/luckydays.json'

export default {
  name: 'app-vue',
  data : function(){
    return {
      today : "",
      luckydaysIndex: 0,
      ableButtonFlg: false,
      isLuckydayMessage: "",
      nearLuckydayMessage: "",
      isLuckyflg: false,
      notclickButton: true,
      rundomLotnumbers: [],
    }
  },
  methods: {
    clickNumberButton: function(){
      //パラメータ改竄チェック
      if (!this.isLuckyflg){
        this.notclickButton = false;

        //ミニロト用のランダムな数字を作成
        let minilotnumbers = [];
        const createNumber = 5;
        
        for (let i= 0; i < createNumber; i++) {

          let rundomNumber = Math.floor(Math.random() * (32 - 1) + 1)

          if (!minilotnumbers.includes(rundomNumber)){
            minilotnumbers.push(rundomNumber);
          } else {
            //乱数が重複した場合、やり直し
            i--;
          }
        }

        let innnerNumbers = [];
        //画面表示用に整形
        for (let i=1; i <= 32; i++) {
          if (minilotnumbers.includes(i)) {
            innnerNumbers.push({number: i, isSelect: true});
          } else {
            innnerNumbers.push({number: i, isSelect: false});
          }
          //7個区切りで生成用の配列に格納する
          if(i % 7 === 0){
            this.rundomLotnumbers.push(innnerNumbers);
            //初期化
            innnerNumbers = [];
          }
        }
        //生成用の配列にあまった数字を最後に入れる
        if(innnerNumbers.length > 0){
          this.rundomLotnumbers.push(innnerNumbers);
        }
        this.$router.replace('/result');
      }
      
    }
  },
  //ライフサイクルフックを使ってVueオブジェクトを生成後、dataを更新
  created: function(){
      this.$router.replace('/top')
      const dispday = new Date();
      this.today = (dispday.getMonth()+ 1) + "月" + dispday.getDate() + "日";
      const checkdate = dispday.getFullYear() + "/" + (dispday.getMonth()+ 1) + "/" + dispday.getDate();

      //初期値には到達しないであろう日付で作成
      let nearLuckyDate = null;
      const milliToday = dispday.getTime();
      //吉日保存済みjsonファイルからデータをループ
      luckydaysjson.forEach(element => {
        //日付が一致している場合
        if(checkdate.toString() === element["day"]){
          this.isLuckyflg = true;
        } else {
          let day = element["day"];
          //jsonから取得した比較対象のDate型を作成
          const compareDate = new Date(parseInt(day.substr(0,4)), parseInt(day.substr(5,2)) -1, parseInt(day.substr(8, 2)), 0, 0);

          //初期値を入れる
          if(nearLuckyDate === null && milliToday < compareDate.getTime()){
            nearLuckyDate = compareDate;
          }
          if(milliToday < compareDate.getTime() && compareDate.getTime() < nearLuckyDate.getTime()){
            nearLuckyDate = compareDate;
          }
        }        
      });
    
      if(this.isLuckyflg){
        this.isLuckydayMessage = this.today + "は吉日です";
        this.nearLuckydayMessage = "";
        this.ableButtonFlg = true;
      } else {
        this.isLuckydayMessage = this.today + "は吉日ではありません";
        //次の吉日がない場合
        if(nearLuckyDate == null){
          this.nearLuckydayMessage = "次の吉日が登録されていません。";
        } else {
          const strLuckyYear = nearLuckyDate.getFullYear().toString();
          const strLuckyMonth = (nearLuckyDate.getMonth()+ 1).toString();
          const strLuckyDay = nearLuckyDate.getDate().toString()
          this.nearLuckydayMessage = "次の吉日は" + strLuckyYear + "年" + strLuckyMonth + "月" + strLuckyDay + "日です。";
        }
      }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.generate-number {
  font-size: 15px;
  font-weight: bold;
  padding: 10px 30px;
}
</style>
