; (function () {
  //----------定義變數區----------
  let navBtn = document.querySelector(".navBtn");
  let drinkList = document.querySelector(".drinkList");

  //----------函數區----------

  function loadData() { //ajax串接資料
    $.ajax({
      method: "GET",
      url: "json/introduce.json",
      dataType: "JSON",
      success: showdata,
      error: function () {
        alert("Error - json/introduce.json")
      }
    })
  }

  function showdata(data) { //資料的回傳
    console.log(data);
    // --- 創造 drinkList 的圖示 ---
    for (let i = 0; i < data.length; i++) {
      let strHTML = `
      <div data-id="${data[i].No}" class="drink" style="background-image : url('${data[i].imgUrl}');"></div>
      `;
      drinkList.innerHTML += strHTML;
    }

    // --- 綁定 drinkList 的每個物件的 DOM 觸發 ---
    let drinks = document.querySelectorAll(".drink");
    let circleFlag = false; //共用變數，要在觸發事件外面
    let circleDeg = (-45); //共用變數，要在觸發事件外面

    drinks.forEach(function (drink) {
      drink.addEventListener("click", function (e) {
        let D_id = e.target.getAttribute("data-id");
        let num;
        for (let i = 0; i < data.length; i++) {
          if (data[i].No == D_id) {
            num = i;
            break
          }
        }
        // -- 點擊影響 1.背景顏色 2.介紹內容 --
        let wrap = document.querySelector(".wrap");
        let location = document.querySelector(".introduce h1");
        let flavor = document.querySelector(".introduce h2");
        let intro = document.querySelector(".introduce p");

        wrap.style.background = data[num].backgroundColor;
        location.innerText = data[num].location;
        flavor.innerText = data[num].flavor;
        intro.innerText = data[num].introduce;

        // -- 點擊影響 3.背後大圖 --
        let cups = document.querySelectorAll(".cup");
        let circle = document.querySelector('.circle');

        if (!circleFlag) {
          cups[1].style.background = `url(${data[num].imgUrl}) center center / cover`;
          circleDeg = circleDeg + 180;
          circle.style.rotate = `${circleDeg}deg`;
          circleFlag = true;
        } else {
          cups[0].style.background = `url(${data[num].imgUrl}) center center / cover`;
          circleDeg = circleDeg - 180;
          circle.style.rotate = `${circleDeg}deg`;
          circleFlag = false;

        }

      })
    })

    // --- 綁定 drinkList 的前後按鈕的 DOM 觸發 ---
    let prev = document.querySelector("#prev");
    let next = document.querySelector("#next");

    next.addEventListener("click", function () {
      //每觸發一次就要重新抓一次，才能確定第 0 個
      let drinks = document.querySelectorAll('.drink');
      let windowWidth = window.innerWidth;
      windowWidth <= 786 ? transNum = 105 : transNum = 150 ;
      console.log(windowWidth);
      for(let i = 0;i<drinks.length;i++){
        drinks[i].style.transition = 'all .5s';
        drinks[i].style.transform = `translateX(-${transNum}px)`;
      }
      setTimeout(function(){
        drinkList.append(drinks[0]);
        for(let i = 0;i<drinks.length;i++){
          drinks[i].style.transition = '';
          drinks[i].style.transform = '';
        }
      },500)

    })

    prev.addEventListener("click", function () {
      //每觸發一次就要重新抓一次，才能確定第 0 個
      let drinks = document.querySelectorAll('.drink');
      let windowWidth = window.innerWidth;
      windowWidth <= 786 ? transNum = 105 : transNum = 150 ;
      for(let i = 0;i<drinks.length;i++){
        drinks[i].style.transition = 'all .5s';
        drinks[i].style.transform = `translateX(${transNum}px)`;
      }
      setTimeout(function(){
        drinkList.insertBefore(drinks[drinks.length-1], drinkList.children[2]);
        for(let i = 0;i<drinks.length;i++){
          drinks[i].style.transition = '';
          drinks[i].style.transform = '';
        }
      },400)
})


  }

  //-----------DOM區域----------

  navBtn.addEventListener("click", function (e) {
    let ulBox = e.target.parentElement.children[1];
    if (!ulBox.classList.contains("visiable")) {
      ulBox.classList.add("visiable");
    } else {
      ulBox.classList.remove("visiable");
    }
  })

  //------- 第一次跑要執行的 ------------
  loadData();

})()