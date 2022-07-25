// dp 实现斐波那契数列
function fib(n){
    if(n < 2) {
        return n;
    }
    let q = 0,p = 1, r = 1
    for(let i = 2; i <= n; i++){
        q = p;
        p = r;
        r = p + q; 
    }
    return r
}

console.log(fib(4));


// 爬楼梯  70
// 共有n阶台阶，一次爬一阶或两阶
// 输入n 输出最小要爬多少次
function climbStairs(n) {
    const dp = new Array(n+1);
    dp[0] = 1;
    dp[1] = 1;
    for(let i = 2;i <= n;i++){
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}

console.log(climbStairs(5));

// 爬楼梯花费最小费用 746
// 楼梯长度是输入数组的长度，每次爬楼所花费是就数组i的值
function minCostClimbingStairs(cost) {
    let n = cost.length;
    const dp = new Array(n+1);
    // 第一次爬楼梯不需要花费，可以从0或者1开始
    dp[0] = 0;
    dp[1] = 0;
    for(let i = 2;i <= n;i++){
        dp[i] = Math.min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
    }
    return dp[n]
}

const cost = [10,15,20];
console.log(minCostClimbingStairs(cost));

// 打家劫舍问题 198
function rob (nums) {
    const len = nums.length;
    // dp数组长度len+1的原因是 在原数组前添加了0
    const dp = new Array(len+1);
    dp[0] = 0;
    dp[1] = nums[0];
    // 循环nums, 得到dp，不能忘记数组长度+1
    for(let i = 2; i < len + 1;i++){
        dp[i] = Math.max(dp[i-2] + nums[i-1],dp[i-1])
    }
    return dp[len];
}
console.log(rob([1,2,3,4,5,21,4]));

// 打家劫舍问题 213
function rob2(nums) {
    const len = nums.length;
    if(len === 1) {
        return nums;
    }else if(len === 2){
        return Math.max(nums[0],nums[1])
    }
    return Math.max(robRange(nums,0,len - 2),robRange(nums,1,len-1))
}

function robRange(nums,start,end){
    // first 记录前一次最大值 second记录当前最大值
    let first = nums[start],second = Math.max(nums[start + 1],nums[start]);
    for(let i = start+2; i <= end;i++){
        let temp = second;
        second = Math.max(first + nums[i],second)
        first = temp;
    }
    return second
}
console.log(rob2([1,2,3,4,5,4,21]));

// 删除点数并且记录删除点数的和最大值 740

function deleteAndCount(nums){
    let maxVal = 0
    for(let val of nums) {
        maxVal = maxVal > val ? maxVal : val
    }
    const sum = new Array(maxVal+1).fill(0)
    for(let item of nums) {
        sum[item] += item;
    }
    return rob1(sum)
}

function rob1(nums){
    const len = nums.length;
    let first = nums[0],second = Math.max(nums[0],nums[1])
    for(let i = 2; i < len;i++){
        let temp = second;
        second = Math.max(first + nums[i],second)
        first = temp;
    }
    return second;
}

console.log(deleteAndCount([1,2,3,3,3,2,2,2,4,4,4]));

// 跳跃游戏



// 最大子数组和
function maxSubArray(nums){
    let pre = 0,res = nums[0];
    nums.forEach(x =>{
        pre = Math.max(pre + x,x);
        res = Math.max(pre,res);
    })
    return res;
}