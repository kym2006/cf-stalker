let problem, handle, problemhtml, handlehtml;
let first = "https://codeforces.com/api/user.status?handle=";
let last = "&from=1&count=1000000";
let link = "https://codeforces.com/contest/";
let found = 0

function setup() {
  noCanvas();
  problemhtml = select("#problemid");
  handlehtml = select("#handle");
}

function getcontest() {
  let size = problem.length;
  if (size == 0) return "";
  let res = "";
  for (let i = 0; i < size; ++i) {
    if (problem[i] < "0" || problem[i] > "9") return res;
    res += problem[i];
  }
  return res;
}

function getname() {
  let res = "";
  let start = 0;
  for (let i = 0; i < problem.length; ++i) {
    if (problem[i] < "0" || problem[i] > "9") start = 1;
    if (start) res += problem[i];
  }
  return res;
}

function getApi() {
  problem = problemhtml.value();
  handle = handlehtml.value();
  handle.trim();
  console.log(handle)
  handle.toLowerCase();
  let url = first + handle + last;
  contest = getcontest();
  name = getname();
  loadJSON(url, gotData);
  
}
function gotData(data) {
  found = 1
  let lst = data.result;
  let res = [];
  for (let i = 0; i < lst.length; ++i) {
    if (i % 100 == 0) console.log((i/res.length).toFixed(2) * 100 + '%');
    let th = lst[i].problem;
    if (th.index == name && th.contestId == contest) res.push(lst[i]);
    if (problem == "") res.push(lst[i]);
  }
  if (res.length == 0) {
    console.log("No submissions found!");
    createDiv("No submissions found!");
  } else {
    console.log("Number of submissions: " + res.length);
    createDiv("Number of submissions: " + res.length);
    for (let i = 0; i < res.length; ++i) {
      if (i % 100 == 0) console.log((i/res.length).toFixed(2) * 100 + '%');
      createDiv(
        "Name: " +
          res[i].problem.name +
          " ID: " +
          res[i].id +
          " verdict: " +
          res[i].verdict +
          " link: "
      );
      createA(link + res[i].contestId + "/submission/" + res[i].id, "submission link",target="_blank");
    }
  }
  createDiv("\n----------\n");
  console.log("----------");
}
