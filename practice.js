console.time("test");

let nums = [1, 2, 3, 4, 5];

nums.forEach((_, i, arr) => {
  if (i != arr.length - 1) arr[i] += arr[i + 1];
});

console.log(nums);

for (i = 0; i < 10000000000; i++) {}

console.timeEnd("test");