// 双指针问题

// 剑指offer 006 有序数组的俩数和
function twoSum (numbers,target) {
    let left = 0,right = numbers.length - 1;
    while(left < right ) {
        let count = numbers[left] + numbers[right]
        if(count  === target){
            return [left,right]
        }
        else if(count < target){
            left++
            
        }else{
            right--
        }
    }
    return []
}

console.log(twoSum([1,2,3,4,6,10],8));


// 007 数组中和0的三个数字
function threeSum (nums) {
    nums.sort((a,b) => a-b);
    // 数组从小到大排序
    let result = [];
    for(let i = 0; i <= nums.length - 3; i++){
        if( i > 0 && nums[i] === nums[i-1] ) continue; // 去除相同的情况
        let l = i + 1, r = nums.length - 1; // 定义左右两指针
        let target = -nums[i];
        let sum = nums[l] + nums[r];
        while(l < r){
            if(sum < target) l++;
            else if(sum > target) r--;
            else{
                result.push([nums[i],nums[l],nums[r]]);
                l += 1;
                r -= 1;
            }
        }

    }
    return result
}

console.log(threeSum([-1,0,1,2,-1,-4]));


// 和大于等于k的最短子数组的长度
function minSubArrayLen(k,nums) {
    let left = 0,minlength = Number.MAX_VALUE,sum = 0;
    for(let right = 0;right < nums.length;right++){
        sum += nums[right];
        while(left <= right && sum >= k){
            minlength = Math.min(minlength,right - left + 1);
            sum -= nums[left];
            left++;
            // sum -= nums[left++]
        }
    }
    return minlength === Number.MAX_VALUE ? 0 : minlength;
}

console.log(minSubArrayLen(7,[5,1,3,4]));


// 乘积小于k的子数组的个数
function numSubarrayProductLessThanK(nums,k){
    // 乘积初始化
    let product = 1
    //定义左指针
    let left = 0;
    let count = 0 // 定义子数组的个数
    for(let right = 0;right < nums.length;right++) {
        product *= nums[right];
        while(left <= right && product >= k){
            product /= nums[left++]
        }
        count += right >= left ? right - left + 1 : 0;
    }
    return count;
}

console.log(numSubarrayProductLessThanK([5,6,2,10],100));