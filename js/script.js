; (function () {

  fetch('../json/introduce.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (introJson) {
      console.log(introJson);
      console.log(introJson.length);
      //-----------json檔開頭-------------------------------------------//

      //新增 drinks 的數量
      let drinkList = document.querySelector('.drinkList')
      for (let i = 0; i < introJson.length; i++) {
        let drink = document.createElement('div');
        drink.classList.add('drink');
        drink.style.backgroundImage = `url(${introJson[i].imgUrl})`;
        drinkList.appendChild(drink);
      }

      let wrap = document.querySelector('.wrap');
      let cups = document.querySelectorAll('.cup');
      let drinks = document.querySelectorAll('.drink');
      let prev = document.querySelector('#prev');
      let next = document.querySelector('#next');
      let circle = document.querySelector('.circle');
      let circleFlag = false;
      let circleDeg = (-45);
      let introduce = document.querySelector('.introduce')

      function circleHandler(e) {
        circleDeg = circleDeg + 180;
        circle.style.rotate = `${circleDeg}deg`;

        let imgUrl = window.getComputedStyle(e).getPropertyValue('background-image');
        if (!circleFlag) {
          cups[1].style.backgroundImage = imgUrl;
          circleFlag = true;
        } else if (circleFlag) {
          cups[0].style.backgroundImage = imgUrl;
          circleFlag = false;
        }
      }

      function introduceHandler(num, json) {
        introduce.innerHTML = `
        <h1>${json[num].location}</h1>
        <h2>${json[num].flavor}</h2>
        <p>${json[num].introduce}</p>
        `
        wrap.style.background = json[num].backgroundColor;

      }


      //要把觸發事件包在 fetch 裡面，才能連到 json 資料
      drinks.forEach((drink, i) => {
        drink.addEventListener('click', (e) => {
          circleHandler(e.target);
          introduceHandler(i, introJson)
        })
      });

      next.addEventListener('click',function(){
        let drinks = document.querySelectorAll('.drink');
        for(let i = 0;i<drinks.length;i++){
          drinks[i].style.transition = 'all .5s';
          drinks[i].style.transform = 'translateX(-150px)';
        }
        setTimeout(function(){
          drinkList.append(drinks[0]);
          for(let i = 0;i<drinks.length;i++){
            drinks[i].style.transition = '';
            drinks[i].style.transform = '';
          }
        },500)
        
      })

      prev.addEventListener('click',function(){
        let drinks = document.querySelectorAll('.drink');
        for(let i = 0;i<drinks.length;i++){
          drinks[i].style.transition = 'all .5s';
          drinks[i].style.transform = 'translateX(150px)';
        }
        setTimeout(function(){
          drinkList.insertBefore(drinks[drinks.length-1], drinkList.children[2]);
          for(let i = 0;i<drinks.length;i++){
            drinks[i].style.transition = '';
            drinks[i].style.transform = '';
          }
        },400)
        
      })

      //-----------json檔結束-------------------------------------------//

    })
    .catch(function (err) {
      console.log('錯誤', err);
    })


})()













