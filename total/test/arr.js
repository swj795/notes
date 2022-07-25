function unqiue(arr) {
    for(let i = 0;i < arr.length;i++){
      for(let j = i + 1; j < arr.length;j++){
        if(arr[i] === arr[j]){
          arr.splice(j,1);
          j--;
        }
      }
    }
    return arr
  }


console.log(unqiue([1,1,2,3,3,4,4,5,6]));

function unqiue2(arr) {
    let newArr = arr.reduce((pre,cur) => {
        if(!pre.includes(cur)){
            pre.push(cur);
        }
        return pre;
    },[])
    return newArr;
}

console.log(unqiue2([1,1,2,3,3,4,4,5,6]));


function unique3(arr) {
    let map = new Map();
    let uniqueArr = new Array();  // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
      if(map.has(arr[i])) {  // 如果有该key值
        map.set(arr[i], true); 
      } else { 
        map.set(arr[i], false);   // 如果没有该key值
        uniqueArr.push(arr[i]);
      }
    } 
    return uniqueArr ;
}

console.log(unique3([1,2,3,3,2,1]));

function unique4(arr) {
    let map = new Map();
    let newArr = new Array();
    for(let i = 0;i < arr.length;i++){
      if(map.has(arr[i])){
        map.set(arr[i],true)
      }else{
        map.set(arr[i],false)
        newArr.push(arr[i])
      }
    }
    return newArr
  }
  console.log(unique4([1,2,3,3,2,1]));


  function unique5 (arr) {
    return arr.filter((item,index,arr) => {
      return arr.indexOf(item) === index
    })
  }
  console.log(unique5([6,5,4,3,2,1,1,2,3,4,5,6]));