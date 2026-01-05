---
layout: default
title: Prefix Sum
difficulty: Very Easy
importance: 3
---

# Prefix Sum

## 1D Prefix Sum

Given an array of $n$ integers $a_1,a_2,\ldots,a_n$, the prefix sum array $\text{pre}$ is defined as:

$$
\text{pre}_i = \sum_{j = 1}^ia_j, \quad \forall \; 1 \le i \le n
$$

That is, $\text{pre}_i$ stores the sum of the first $i$ elements of the array.

This array can be computed iteratively in $O(n)$ time using the following relations:

$$
\begin{aligned}
& \text{pre}_0 = 0 \\[6pt]
& \text{pre}_i = \text{pre}_{i-1} + a_i, \quad \forall \; 1 \le i \le n
\end{aligned}
$$

The most common application of this array is computing the sum of elements in a subarray $[l,r]$ of the array $a$ in $O(1)$ time using the fact:

$$
\sum_{i=l}^ra_i \\[6pt]
= \sum_{i=1}^ra_i - \sum_{i=1}^{l-1}a_i \\[6pt]
= \text{pre}_r - \text{pre}_{l-1}
$$

### Learn Through Problems

<details>
<summary><a href="https://cses.fi/problemset/task/1661" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ integers $a_1,a_2,\ldots,a_n$ and an integer $x$<br><br>

Count the number of subarrays of $a$ having sum $x$.<br><br>

<b>Input</b><br>
The first line contains integers $n \left(1 \le n \le 2\cdot10^5\right)$ and $x \left(-10^9 \le x \le 10^9\right)$.<br>
The next line contains $n$ integers $a_1,a_2,\ldots,a_n \left(-10^9 \le a_i \le 10^9\right)$.<br><br>

<b>Output</b><br>
Print the required number of subarrays.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
5 7
2 -1 3 5 -2</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
2</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Formally, we have to count the number of pairs $(l,r)$ such that:
<ul>
    <li>$1 \le l \le r \le n$</li>
    <li>$\displaystyle \sum_{i = l}^ra_i = x$</li>
</ul><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Now the second condition can be written as:

$$
\begin{aligned}
& \text{pre}_r-\text{pre}_{l-1}=x \\[6pt]
\Rightarrow &\; \text{pre}_{l-1} = \text{pre}_r-x
\end{aligned}
$$

Replacing $l \rightarrow l+1$, we can rewrite both the conditions as:<br>

<ul>
    <li>$0 \le l < r \le n$</li>
    <li>$\text{pre}_l = \text{pre}_r-x$</li>
</ul><br>

To count the number of pairs $(l,r)$ satisfying this, we can iterate on $r$ from $1$ to $n$ and keep track of the frequencies of $\text{pre}_l$ for $0 \le l < r$.<br><br>

<b>Time Complexity:</b> $O(n\log n)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>
<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
fastio()

    int n, x;
    cin >> n >> x;

    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre[i];
        pre[i] += pre[i - 1];
    }

    map<int, int> freq;
    freq[pre[0]] = 1;

    int ans = 0;
    for (int r = 1; r <= n; r++) {
        if (freq.find(pre[r] - x) != freq.end())
            ans += freq[pre[r] - x];
        freq[pre[r]]++;
    }

    cout << ans << endl;

    return 0;

}
</script></code></pre>

</details>
</div>
</details>

<details>
<summary><a href="https://cses.fi/problemset/task/1643" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ integers $a_1,a_2,\ldots,a_n$. <br><br>

Find the maximum sum of values in a contiguous non-empty subarray of $a$.<br><br>

<b>Input</b><br>
The first line contains integer $n \left(1 \le n \le 2\cdot10^5\right)$.<br>
The next line contains $n$ integers $a_1,a_2,\ldots,a_n \left(-10^9 \le a_i \le 10^9\right)$.<br><br>

<b>Output</b><br>
Print the maximum subarray sum.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
8
-1 3 -2 5 3 -5 2 2</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
9</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build the prefix sum array $\text{pre}$ of the array $a$.

Formally, we have to compute the value of the expression:

$$
\begin{aligned}
& \max_{1 \le l \le r \le n} \; \sum_{i=l}^{r} a_i \\[6pt]
= &\; \max_{1 \le l \le r \le n}
  \left( \text{pre}_r - \text{pre}_{l-1} \right) \\[6pt]
= &\; \max_{1 \le r \le n}
  \left( \text{pre}_r - \min_{1 \le l \le r} \text{pre}_{l-1} \right) \\[6pt]
= &\; \max_{1 \le r \le n}
  \left( \text{pre}_r - \min_{0 \le l < r} \text{pre}_{l} \right)
\end{aligned}
$$

To compute this, we can iterate on $r$ from $1$ to $n$ and keep track of $\displaystyle \min_{0 \le l < r} \text{pre}_{l}$.<br><br>

<b>Time Complexity:</b> $O(n)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio()

    int n;
    cin >> n;

    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre[i];
        pre[i] += pre[i - 1];
    }

    int mn = pre[0], ans = LLONG_MIN;
    for (int r = 1; r <= n; r++) {
        ans = max(ans, pre[r] - mn);
        mn = min(mn, pre[r]);
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://codeforces.com/problemset/problem/1175/D" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ integers $a_1,a_2,\ldots,a_n$ and an integer $k$.<br><br>

Divide the array $a$ into $k$ non-empty consecutive subarrays. The subarrays are indexed from left to right as $1,2,\ldots,k$. The cost of the division is given as:
$$\sum_{i = 1}^n\left(a_i \cdot f(i)\right)$$

where $f(i)$ is the index of the subarray containing $a_i$.<br><br>

Find the maximum cost that can be obtained by dividing the array $a$ into $k$ non-empty consecutive subarrays.<br><br>

<b>Input</b><br>
The first line contains integers $n$ and $k \left(1 \le k \le n \le 3\cdot10^5\right)$.<br>
The next line contains integers $a_1,a_2,\ldots,a_n \left(-10^6 \le a_i \le 10^6\right)$.<br><br>

<b>Output</b><br>
Print the maximum cost that can be obtained by dividing the array $a$ into $k$ non-empty consecutive subarrays.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
5 2
-1 -2 5 -4 8</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
15</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let the array $a$ be divided into $k$ subarrays as $[i_0+1,i_1],[i_1+1,i_2],\ldots,[i_{k-1}+1,i_k]$, where $i_0 = 0 < i_1 < i_2 < \ldots < i_{k-1} < i_k = n$.<br><br>

Build the prefix sum array $\text{pre}$ of the array $a$. We can rewrite the cost of the division as:

$$
\begin{aligned}
& \sum_{l = 1}^k\sum_{r = i_{l - 1} + 1}^{i_l}\left(a_r \cdot l\right) \\
=&\; \sum_{l = 1}^kl\cdot\sum_{r = i_{l - 1} + 1}^{i_l}a_r \\
=&\; \sum_{l = 1}^kl\cdot\left(\text{pre}_{i_l} - \text{pre}_{i_{l - 1}}\right) \\
=&\; \sum_{l = 1}^kl\cdot\text{pre}_{i_l}-\sum_{l = 1}^kl\cdot\text{pre}_{i_{l-1}} \\
=&\; \sum_{l = 1}^kl\cdot\text{pre}_{i_l}-\sum_{l = 0}^{k-1}\left(l+1\right)\cdot\text{pre}_{i_{l}} \\
=&\; \sum_{l = 1}^kl\cdot\text{pre}_{i_l}-\sum_{l = 0}^{k-1}l\cdot\text{pre}_{i_{l}}-\sum_{l = 0}^{k-1}\text{pre}_{i_{l}} \\
=&\; k\cdot\text{pre}_{i_k}-\sum_{l = 0}^{k-1}\text{pre}_{i_{l}} \\
=&\; k\cdot\text{pre}_{n}-\sum_{l = 1}^{k-1}\text{pre}_{i_{l}} \left(\because i_k = n,\text{pre}_{i_0} = \text{pre}_0 = 0\right)
\end{aligned}
$$

Formally, we have to compute the value of the expression:

$$
\begin{aligned}
& \max \left(k\cdot\text{pre}_{n}-\sum_{l = 1}^{k-1}\text{pre}_{i_{l}}\right) \\
=&\; k\cdot\text{pre}_{n}-\min\sum_{l = 1}^{k-1}\text{pre}_{i_{l}}
\end{aligned}
$$

To compute $\displaystyle \min\sum_{l = 1}^{k-1}\text{pre}_{i_{l}}$, we can take the $k-1$ smallest elements from $\left(\text{pre}_1, \text{pre}_2, \ldots, \text{pre}_{n-1}\right)$ since $0 < i_1 < i_2 < \ldots < i_{k-1} < n$.<br><br>

<b>Time Complexity:</b> $O(n\log n)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio()

    int n, k;
    cin >> n >> k;

    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre[i];
        pre[i] += pre[i - 1];
    }

    priority_queue<int, vector<int>, greater<int>> pq;
    for (int i = 1; i < n; i++)
        pq.push(pre[i]);

    int ans = k * pre[n];
    for (int i = 1; i <= k - 1; i++)
        ans -= pq.top(), pq.pop();
    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://codeforces.com/problemset/problem/816/B" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ intervals $[l_i,r_i]$, where each interval denotes a range of integer temperatures.<br><br>

A temperature is called admissible if it belongs to at least $k$ of the given intervals.<br><br>

You are also given $q$ queries. In each query, two integers $a$ and $b$ are given, and you have to determine the number of admissible integer temperatures in the range $[a,b]$.<br><br>

<b>Input</b><br>
The first line contains integers $n$, $k \left(1 \le k \le n \le 2\cdot10^5\right)$ and $q \left(1 \le q \le 2\cdot10^5\right)$.<br>
The next $n$ lines contain integers $l_i$ and $r_i \left(1 \le l_i \le r_i \le 2\cdot10^5\right)$.<br>
The next $q$ lines contain integers $a$ and $b \left(1 \le a \le b \le 2\cdot10^5\right)$.<br><br>

<b>Output</b><br>
For each query, print the number of admissible integer temperatures in the range $[a,b]$.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
3 2 4
91 94
92 97
97 99
92 94
93 97
95 96
90 100</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
3
3
0
4</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build a frequency array where $\text{freq}_i$ denotes the number of intervals to which the temperature $i$ belongs.<br><br>

To efficiently build the $\text{freq}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every interval $[l_i,r_i]$, update $\text{freq}_{l_i} \gets \text{freq}_{l_i}+1$ and $\text{freq}_{r_i+1} \gets \text{freq}_{r_i+1}-1$.</li>
    <li>After processing all the intervals, replace $\text{freq}$ array with its prefix sum array.</li>
</ul><br>

The logic behind this technique (known as <b>Difference Array</b>):

<ul>
    <li>When we perform $\text{freq}_{l_i} \gets \text{freq}_{l_i}+1$ and later replace the array $\text{freq}$ by its prefix sum array, the frequency of all temperatures $\ge l_i$ gets increased by $1$.</li>
    <li>However, for an interval $[l_i,r_i]$, we want to increase the frequency only for tempreatures lying in the range $[l_i,r_i]$.</li>
    <li>To stop this increment after $r_i$, we perform $\text{freq}_{r_i+1} \gets \text{freq}_{r_i+1}-1$ and later replacing the array $\text{freq}$ by its prefix sum cancels the earlier increment for all temperatures $\ge r_i+1$.</li>
    <li>As a result, the net effect is that only temperatures in the range $[l_i,r_i]$ have their frequency increased by $1$, while other temperatures remain unaffected.</li>
</ul><br>

Define an array $c$ as:

$$
c_i =
\begin{cases}
1, & \text{if } \text{freq}_i \ge k \\
0, & \text{otherwise}
\end{cases}
,\quad \forall \;1 \le i \le N\\
$$

where $N=2\cdot10^5$.<br><br>

Build the prefix sum array $\text{pre}$ of the array $c$. The number of admissible integer temperatures in the range $[a,b]$ is given by $\text{pre}_b - \text{pre}_{a-1}$.<br><br>

<b>Time Complexity:</b> $O(N)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

const int N = (int)2e5;

signed main() {
    fastio()

    int n, k, q;
    cin >> n >> k >> q;

    vector<int> freq(N + 2);
    for (int i = 0; i < n; i++) {
        int l, r;
        cin >> l >> r;
        freq[l]++, freq[r + 1]--;
    }

    for (int i = 1; i <= N; i++)
        freq[i] += freq[i - 1];

    vector<int> pre(N + 1);
    for (int i = 1; i <= N; i++)
        pre[i] = pre[i - 1] + (freq[i] >= k);

    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << pre[b] - pre[a - 1] << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://www.codechef.com/problems/AGCY" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
There are $n$ cities numbered from $1$ to $n$, in a row from left to right.<br><br>
The process lasts for $q$ days. On the $j^{th}$ day, two integers $l_j$ and $r_j$ are chosen $\left(1 \le l_j \le r_j \le n\right)$, and the following events occur:
<ul>
    <li>In city $l_j$, $1$ statue is destroyed.</li>
    <li>In city $l_j+1$, $2$ statues are destroyed.</li>
    <li>$\ldots$</li>
    <li>In city $r_j$, $r_j-l_j+1$ statues are destroyed.</li>
</ul><br>
Formally, for each $i$ such that $l_j \le i \le r_j$, the number of statues destroyed in city $i$ is $i-l_j+1$. <br><br>

After $q$ days, determine the total number of statues destroyed in each city.<br><br>

<b>Input</b><br>
The first line contains an integer $t \left(1 \le t \le 10^3\right)$.<br>
The first line of each test case contains integers $n \left(1 \le n \le 10^5\right)$ and $q \left(1 \le q \le 10^5\right)$.<br>
The next $q$ lines of each test case contain integers $l_j$ and $r_j \left(1 \le l_j \le r_j \le n\right)$.<br><br>

Additionally, the following holds true:

<ul>
    <li>The sum of $n$ over all test cases doesn't exceed $10^6$.</li>
    <li>The sum of $q$ over all test cases doesn't exceed $10^6$.</li>
</ul><br>

<b>Output</b><br>
For each test case, print $n$ integers, where the $i^{th}$ integer represents the total number of statues destroyed in city $i$ after $q$ days.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
2
5 3
1 3
1 2
4 5
2 1
1 1</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
2 4 3 1 2
1 0</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let $\text{val}_i$ denote the number of statues destroyed in city $i$ after $q$ days. Formally, we can define $\text{val}_i$ as:
$$
\begin{aligned}
& \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} (i - l_j + 1) \\[6pt]
=\; & \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} (i+1) - \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} l_j \\[6pt]
=\; & (i+1)\cdot\sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} 1 - \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} l_j
\end{aligned}
$$

Let us define:

<ul>
    <li>$\displaystyle \text{cnt}_i = \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} 1$ : the number of intervals $[l_j,r_j]$ such that $l_j \le i \le r_j$.</li>
    <li>$\displaystyle \text{sum}_i = \sum_{\substack{j = 1 \\ l_j \le i \le r_j}}^{q} l_j$ : the sum of $l_j$ over all intervals $[l_j,r_j]$ such that $l_j \le i \le r_j$.</li>
</ul><br>

We can rewrite the expression for $\text{val}_i$ as:
$$(i+1)\cdot\text{cnt}_i - \text{sum}_i$$

To efficiently build the $\text{cnt}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every interval $[l_j,r_j]$, update $\text{cnt}_{l_j} \gets \text{cnt}_{l_j}+1$ and $\text{cnt}_{r_j+1} \gets \text{cnt}_{r_j+1}-1$.</li>
    <li>After processing all the intervals, replace $\text{cnt}$ by its prefix sum array.</li>
</ul><br>

To efficiently build the $\text{sum}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every interval $[l_j,r_j]$, update $\text{sum}_{l_j} \gets \text{sum}_{l_j}+l_j$ and $\text{sum}_{r_j+1} \gets \text{sum}_{r_j+1}-l_j$.</li>
    <li>After processing all the intervals, replace $\text{sum}$ by its prefix sum array.</li>
</ul><br>

<b>Time Complexity:</b> $O\left(\sum n\right)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio();

    int t;
    cin >> t;

    while(t--) {
        int n, q;
        cin >> n >> q;

        vector<int> cnt(n + 2), sum(n + 2);
        while(q--) {
            int l, r;
            cin >> l >> r;
            cnt[l]++, cnt[r + 1]--;
            sum[l] += l, sum[r + 1] -= l;
        }

        for(int i = 1; i <= n; i++) {
            cnt[i] += cnt[i - 1];
            sum[i] += sum[i - 1];
            cout << (i + 1) * cnt[i] - sum[i] << " ";
        }
        cout << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://atcoder.jp/contests/abc188/tasks/abc188_d" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given integers $n$ and $C$.<br><br>

There are $n$ services. For the $i^{th}$ service:

<ul>
    <li>It is used from day $a_i$ to day $b_i$, inclusive.</li>
    <li>If not subscribed, using this service costs $c_i$ yen per day.</li>
</ul><br>

There is a subscription plan that costs $C$ yen per day and allows unlimited use of all services during the subscribed days. You may start the subscription to this plan at the beginning of any day and cancel it at the end of any day.<br><br>

Determine the minimum total cost required to use all services.<br><br>

<b>Input</b><br>
The first line contains integers $n \left(1 \le n \le 2\cdot10^5 \right)$ and $C \left(1 \le C \le 10^9 \right)$.<br>
The next $n$ lines contain integers $a_i$, $b_i \left(1 \le a_i \le b_i \le 10^9\right)$ and $c_i \left(1 \le c_i \le 10^9\right)$.<br><br>

<b>Output</b><br>
Print the minimum total cost required to use all services.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
2 6
1 2 4
2 2 4</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
10</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
We will use the technique of <b>Coordinate Compression</b> to simplify this problem:

<ul>
    <li>Initialize an empty vector $\text{all}$.</li>
    <li>Insert all values of $a_i$ and $b_i$ in $\text{all}$.</li>
    <li>Sort $\text{all}$ and erase duplicates from it.</li>
</ul><br>

For each compressed index $i$, there are two distinct parts of days to consider:

<ul>
    <li>The exact day $\text{all}_i$.</li>
    <li>The continuous block of days $[\text{all}_i+1, \text{all}_{i+1}-1]$.</li>
</ul><br>

We will handle these two parts separately using arrays $\text{end}$ and $\text{mid}$ respectively:

<ul>
    <li>$\displaystyle \text{end}_i = \sum_{\substack{j = 1 \\ l_j \le \text{all}_i \le r_j}}^{n} c_j$ : the total cost of all services active on day $\text{all}_i$.</li>
    <li>$\displaystyle \text{mid}_i = \sum_{\substack{j = 1 \\ l_j \le \text{all}_i+1 \\  \text{all}_{i+1}-1 \le r_j}}^{n} c_j$ : the total cost of all services active on every day in $[\text{all}_i+1, \text{all}_{i+1}-1]$.</li>
</ul><br>

Basically, the array $\text{end}$ handles individual important days (i.e., days that are either start or end of a service interval) and the array $\text{mid}$ handles continuous stretches (i.e., days that are neither start not end of any service interval and hence have identical cost). <br><br>

To efficiently build the $\text{end}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every service $a_i,b_i,c_i$, find the indices of $a_i$ and $b_i$ in the array $\text{all}$ using binary search to find their compressed values. Let these values be $l_i$ and $r_i$ respectively. Update $\text{end}_{l_i} \gets \text{end}_{l_i}+c_i$ and $\text{end}_{r_i+1} \gets \text{end}_{r_i+1}-c_i$.</li>
    <li>After processing all the services, replace $\text{end}$ array by its prefix sum array.</li>
</ul><br>

To efficiently build the $\text{mid}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every service $a_i,b_i,c_i$, find the indices of $a_i$ and $b_i$ in the array $\text{all}$ using binary search to find their compressed values. Let these values be $l_i$ and $r_i$ respectively. Update $\text{mid}_{l_i} \gets \text{mid}_{l_i}+c_i$ and $\text{mid}_{r_i} \gets \text{mid}_{r_i}-c_i$.</li>
    <li>After processing all the services, replace $\text{mid}$ array by its prefix sum array.</li>
</ul><br>

Without considering the subscription plan that costs $C$ yen per day, the total cost required to use all services can be written as:
$$\sum_{i}\text{end}_i + \sum_{i}\text{mid}_i\cdot\left(\text{all}_{i+1}-\text{all}_i-1\right)$$

Considering the subscription plan that costs $C$ yen per day, the minimum total cost required to use all services can be written as:
$$\sum_{i}\min\left(\text{end}_i, C\right) + \sum_{i}\min\left(\text{mid}_i, C\right)\cdot\left(\text{all}_{i+1}-\text{all}_i-1\right)$$

<b>Time Complexity:</b> $O(n\log n)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio();

    int n, C;
    cin >> n >> C;

    vector<int> all;
    vector<array<int, 3>> v(n);
    for (auto &[a, b, c] : v) {
        cin >> a >> b >> c;
        all.push_back(a), all.push_back(b);
    }

    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());

    int m = size(all);
    vector<int> end(m + 1), mid(m + 1);
    for (auto &[a, b, c] : v) {
        int l = lower_bound(all.begin(), all.end(), a) - all.begin();
        int r = lower_bound(all.begin(), all.end(), b) - all.begin();
        end[l] += c, end[r + 1] -= c;
        mid[l] += c, mid[r] -= c;
    }

    for (int i = 1; i < m; i++) {
        end[i] += end[i - 1];
        mid[i] += mid[i - 1];
    }

    int ans = 0;
    for (int i = 0; i < m; i++) {
        ans += min(end[i], C);
        if (i + 1 < m)
            ans += min(mid[i], C) * (all[i + 1] - all[i] - 1);
    }
    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://csacademy.com/contest/archive/task/subarray-medians/statement/" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given a permutation $a$ of size $n$. Compute the value of the expression:
$$\sum_{\substack{1 \le l \le r \le n \\ (r - l)\ \text{even}}}l \cdot r \cdot \text{median}(l,r)$$

where $\text{median}(l,r)$ denotes the median of the subarray $[l,r]$.<br><br>

<b>Input</b><br>
The first line contains integer $n \left(1 \le n \le 10^4 \right)$.<br>
The next line contains $n$ integers $a_1,a_2,\ldots,a_n \left(1 \le a_i \le n \right)$.<br><br>

<b>Output</b><br>
Print the value of the given expression.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
5
1 5 2 4 3</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
276</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
We can rewrite the given expression as:
$$
\begin{aligned}
& \sum_{i=1}^n\sum_{\substack{1 \le l \le i \le r \le n \\ (r - l)\ \text{even} \\ \text{median}(l,r)=a_i}}l \cdot r \cdot a_i \\[6pt]
=\; & \sum_{i=1}^na_i\cdot\sum_{\substack{1 \le l \le i \le r \le n \\ (r - l)\ \text{even} \\ \text{median}(l,r)=a_i}}l \cdot r
\end{aligned}
$$

To compute the inner summation for a fixed $i$, define an array $b$ as:

$$
b_j = \begin{cases} 1, & \text{if } a_j > a_i \\ 0, & \text{if } a_j = a_i \\ -1, & \text{if } a_j < a_i \end{cases}, \quad \forall \; 1 \le j \le n
$$

The median of an odd length subarray $[l,r]$ will be $a_i$ iff $l \le i \le r$ and $\displaystyle \sum_{j=l}^rb_j = 0$ since this implies that the number of elements $> a_i$ (which have been assigned a value $1$) is equal to the number of elements $< a_i$ (which have been assigned a value $-1$) in the subarray. <br><br>

Build the prefix sum array $\text{pre}$ of the array $b$. We can rewrite the expression for the inner summation as:

$$
\begin{aligned}
& \sum_{\substack{1 \le l \le i \le r \le n \\ \text{pre}_{l-1} = \text{pre}_r}}l \cdot r \\[6pt]
=\; & \sum_{r=i}^nr\cdot\sum_{\substack{l=1 \\ \text{pre}_{l-1} = \text{pre}_r}}^il \\[6pt]
=\; & \sum_{r=i}^nr\cdot\text{sum}_{pre_r}
\end{aligned}
$$

where $\displaystyle \text{sum}_j = \sum_{\substack{l=1 \\ \text{pre}_{l-1} = j}}^il$, which can be computed by iterating on $l$ from $1$ to $i$.<br><br>

Also, $-n \le \text{pre}_k \le n \left(\because \left|b_k\right| \leq 1\right)$ implies that we need to compute $\text{sum}_j$ for $-n \le j \le n$. To avoid using a map, we can do the following modification to the expression of the inner summation:
$$=\sum_{r=i}^nr\cdot\text{sum}_{pre_r+n}$$

where $\displaystyle \text{sum}_j = \sum_{\substack{l=1 \\ \text{pre}_{l-1}+n = j}}^il$. Thus, we need to compute $\text{sum}_j$ for $0 \le j \le 2\cdot n$ which can be stored in an array.<br><br>

The final expression for the answer can be written as:
$$\sum_{i=1}^na_i\cdot \sum_{r=i}^nr\cdot\text{sum}_{pre_r+n}$$

<b>Time Complexity:</b> $O(n^2)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio()

    int n;
    cin >> n;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    int ans = 0;
    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++)
            pre[j] = pre[j - 1] + (a[j] > a[i] ? 1 : (a[j] < a[i] ? -1 : 0));

        vector<int> sum(2 * n + 1);
        for (int l = 1; l <= i; l++)
            sum[pre[l - 1] + n] += l;

        for (int r = i; r <= n; r++)
            ans += a[i] * r * sum[pre[r] + n];
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://www.codechef.com/problems/SUMOFCUBE" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ integers $a_1,a_2,\ldots,a_n$. Compute the value of the expression:
$$\sum_{i = 1}^n\sum_{j = i}^n\left(\sum_{k = i}^ja_k\right)^3$$

Since the value can be huge, print it modulo $998244353$.<br><br>

<b>Input</b><br>
The first line contains integer $t \left(1 \le t \le 10^5\right)$.<br>
The first line of each test case contains integer $n \left(1 \le n \le 5\cdot10^5 \right)$.<br>
The next line of each test case contains $n$ integers $a_1,a_2,\ldots,a_n \left(1 \le a_i \le 10^6\right)$.<br><br>

Additionally, the following holds true:

<ul>
    <li>The sum of $n$ over all test cases doesn't exceed $5\cdot10^5$.</li>
</ul><br>

<b>Output</b><br>
For each test case, print the value of the given expression modulo $998244353$.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
3
2
1 1
3
1 2 1
5
8 5 6 2 3</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
10
128
42621</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
<span style="color:red;"><b>NOTE:</b></span>
<i>This solution involves the concept of <b>Changing the Order of Summation</b>. There exists another solution to this problem which is explained in the <a href="{{ site.baseurl }}/phase1/maths/combinatorics" target="_blank">Combinatorics</a> section.</i><br><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Also build the prefix sum array $\text{pre2}$ of the array $\text{pre}$.<br><br>

We can rewrite the given expression as:

$$
\begin{aligned}
& \sum_{i = 1}^n\sum_{j = i}^n\left(\text{pre}_j - \text{pre}_{i-1}\right)^3 \\[6pt]
=\; & \sum_{i = 1}^n\sum_{j = i}^n\left(\text{pre}_j^3 - \text{pre}_{i-1}^3 - 3\cdot \text{pre}_j^2 \cdot \text{pre}_{i-1} + 3\cdot \text{pre}_j \cdot \text{pre}_{i-1}^2\right) \\[6pt]
=\; & S_1 - S_2 - 3\cdot S_3 + 3\cdot S_4
\end{aligned}
$$

Simplifying the expression of $S_1$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_j^3 = \sum_{j = 1}^n\sum_{i = 1}^j\text{pre}_j^3 = \sum_{j=1}^n\text{pre}_j^3\cdot\sum_{i=1}^j1
= \sum_{j=1}^n\text{pre}_j^3\cdot j
$$

Simplifying the expression of $S_1$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_{i-1}^3 = \sum_{i=1}^n\text{pre}_{i-1}^3\cdot\sum_{j=i}^n1 = \sum_{i=1}^n\text{pre}_{i-1}^3\cdot(n-i+1)
$$

Simplifying the expression of $S_3$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_j^2\cdot\text{pre}_{i-1} = \sum_{j = 1}^n\sum_{i = 1}^j\text{pre}_j^2\cdot\text{pre}_{i-1}
= \sum_{j = 1}^n\text{pre}_j^2\cdot\sum_{i = 1}^j\text{pre}_{i-1} = \sum_{j = 1}^n\text{pre}_j^2\cdot\text{pre2}_{j-1}
$$

Simplifying the expression of $S_4$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_j\cdot\text{pre}_{i-1}^2 = \sum_{i = 1}^n\text{pre}_{i-1}^2\cdot\sum_{j = i}^n\text{pre}_j
= \sum_{i = 1}^n\text{pre}_{i-1}^2\cdot(\text{pre2}_n - \text{pre2}_{i-1})
$$

<b>Time Complexity:</b> $O(\sum n)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

const int mod = 998244353;

signed main() {
    fastio()

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> pre(n + 1), pre2(n + 1);
        for (int i = 1; i <= n; i++) {
            cin >> pre[i];
            pre[i] = (pre[i - 1] + pre[i]) % mod;
            pre2[i] = (pre2[i - 1] + pre[i]) % mod;
        }

        int ans = 0;
        for (int i = 1; i <= n; i++) {
            int k1 = pre[i] * pre[i] % mod * pre[i] % mod * i % mod;
            ans = (ans + k1) % mod;

            int k2 = pre[i - 1] * pre[i - 1] % mod * pre[i - 1] % mod * (n - i + 1) % mod;
            ans = (ans - k2 + mod) % mod;

            int k3 = pre[i] * pre[i] % mod * pre2[i - 1] % mod;
            ans = (ans - 3 * k3 % mod + mod) % mod;

            int k4 = pre[i - 1] * pre[i - 1] % mod * ((pre2[n] - pre2[i - 1] + mod) % mod) % mod;
            ans = (ans + 3 * k4) % mod;
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://atcoder.jp/contests/abc366/tasks/abc366_e" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given $n$ integer points $(x_i,y_i)$ on a two-dimensional plane, and a non-negative integer $D$.<br><br>

Find the number of integer pairs $(x,y)$ such that:
$$\sum_{i = 1}^n\left(\left|x - x_i\right| + \left|y - y_i\right|\right) \leq D$$
<br>

<b>Input</b><br>
The first line contains integers $n \left(1 \le n \le 2\cdot10^5\right)$ and $D \left(0 \le D \le 10^6 \right)$.<br>
The next $n$ lines contain integers $x_i$ and $y_i \left(-10^6 \le x_i,y_i \le 10^6\right)$.<br><br>

Additionally, the following holds true:

<ul>
    <li>$(x_i,y_i) \neq (x_j,y_j)$ for $i \neq j$.</li>
</ul><br>

<b>Output</b><br>
Print the number of integer pairs $(x,y)$ satisfying the given condition.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
2 3
0 0
1 0</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
8</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define $\displaystyle f(x) = \sum_{i=1}^n\left|x-x_i\right|$ and $\displaystyle g(y) = \sum_{i=1}^n\left|y-y_i\right|$.<br><br>

Also, $\left|x-x_i\right| \le D \Rightarrow x_i - D \le x \le x_i + D$. Since $\min x_i = -10^6$, $\max x_i = 10^6$ and $\max D = 10^6$, we have $-2\cdot 10^6 \le x \le 2\cdot 10^6$. To make our computations simpler, we add a value $2\cdot 10^6$ to each $x_i$ so that $0 \le x \le 4\cdot 10^6$. Similarly we add a value $2\cdot 10^6$ to each $y_i$ so that $0 \le y \le 4\cdot 10^6$.<br><br>

We need to count the number of integer pairs $(x,y)$ such that:

<ul>
    <li>$0 \le x, y \le N$, where $N= 4\cdot10^6$</li>
    <li>$f(x)+g(y) \le D$</li>
</ul><br>

Let us understand how to compute $f(x)$ efficiently. Build the arrays $\text{cnt}$ and $\text{sum}$ as:

<ul>
    <li>$\displaystyle \text{cnt}_j = \sum_{\substack{i = 1 \\ x_i \le j}}^n1$ : the number of $x_i \le j$, $\quad \forall\; 0 \le j \le N$.</li>
    <li>$\displaystyle \text{sum}_j = \sum_{\substack{i = 1 \\ x_i \le j}}^nx_i$ : the sum of all $x_i \le j$, $\quad \forall\; 0 \le j \le N$.</li>
</ul><br>

We can rewrite the expression for $f(x)$ as:

$$
\begin{aligned}
& \sum_{\substack{i=1 \\ x_i \le x}}^n(x-x_i) + \sum_{\substack{i=1 \\ x_i > x}}^n(x_i-x) \\[6pt]
=\; & \sum_{\substack{i=1 \\ x_i \le x}}^nx - \sum_{\substack{i=1 \\ x_i \le x}}^nx_i + \sum_{\substack{i=1 \\ x_i > x}}^nx_i - \sum_{\substack{i=1 \\ x_i > x}}^nx \\[6pt]
=\; & x\cdot\sum_{\substack{i=1 \\ x_i \le x}}^n1 - \sum_{\substack{i=1 \\ x_i \le x}}^nx_i + \sum_{\substack{i=1 \\ x_i > x}}^nx_i - x\cdot\sum_{\substack{i=1 \\ x_i > x}}^n1 \\[6pt]
=\; & x\cdot\text{cnt}_x - \text{sum}_x + (\text{sum}_N - \text{sum}_x) - x\cdot(\text{cnt}_N - \text{cnt}_x) \\[6pt]
=\; & \text{sum}_N - 2\cdot\text{sum}_x + 2\cdot x\cdot\text{cnt}_x - x\cdot\text{cnt}_N \\[6pt]
=\; & \text{sum}_N - 2\cdot\text{sum}_x + 2\cdot x\cdot\text{cnt}_x - x\cdot n
\end{aligned}
$$

Thus, we can compute $f(x)$ for some fixed $x$ in $O(1)$ using the arrays $\text{cnt}$ and $\text{sum}$. Similarly, we can build the arrays $\text{cnt}$ and $\text{sum}$ over $y_i$ for computing $g(y)$.<br><br>

To count the number of integer pairs $(x,y)$ satisfying the given conditions, follow the steps:

<ul>
    <li>Store the values of $g(y)$ for $0 \le y \le N$ in a vector $\text{all}$ and sort it.</li>
    <li>Iterate on $x$ from $0$ to $N$, and compute the value of $f(x)$. The inequality $f(x)+g(y) \le D$ implies that $g(y) \le D-f(x)$. Use binary search in the vector $\text{all}$ to count the number of elements $\le D-f(x)$. This count gives us the number of integers $y$ for a fixed $x$ such that $f(x)+g(y) \le D$. Final answer is the sum of this count over all $x$.</li>
</ul><br>

<b>Time Complexity:</b> $O(N\log N)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

const int N = (int)4e6;
const int OFF = (int)2e6;

signed main() {
    fastio()

    int n, d;
    cin >> n >> d;

    vector<int> sumx(N + 1), cntx(N + 1), sumy(N + 1), cnty(N + 1);
    for (int i = 1; i <= n; i++) {
        int x, y;
        cin >> x >> y;
        x += OFF, y += OFF;
        sumx[x] += x, cntx[x]++;
        sumy[y] += y, cnty[y]++;
    }

    for (int i = 1; i <= N; i++) {
        sumx[i] += sumx[i - 1], cntx[i] += cntx[i - 1];
        sumy[i] += sumy[i - 1], cnty[i] += cnty[i - 1];
    }

    vector<int> all;
    for (int y = 0; y <= N; y++)
        all.push_back(sumy[N] - 2 * sumy[y] + 2 * y * cnty[y] - y * n);
    sort(all.begin(), all.end());

    int ans = 0;
    for (int x = 0; x <= N; x++) {
        int mx = d - (sumx[N] - 2 * sumx[x] + 2 * x * cntx[x] - x * n);
        int idx = upper_bound(all.begin(), all.end(), mx) - all.begin();
        ans += idx;
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

## 2D Prefix Sum

Given a 2D array $a$ of size $n \times m$, the prefix sum array $\text{pre}$ is defined as:

$$\text{pre}_{i,j} = \sum_{x=1}^i\sum_{y=1}^ja_{x,y}, \quad \forall \; 1 \le i \le n, 1 \le j \le m$$

That is, $\text{pre}_{i,j}$ stores the sum of all elements in the submatrix with top-left corner $(1,1)$ and bottom-right corner $(i,j)$.

This array can be computed iteratively in $O(n\cdot m)$ time using the following relations:

$$
\begin{aligned}
& \text{pre}_{0,j} = 0, \quad \forall \; 0 \le j \le m \\[6pt]
& \text{pre}_{i,0} = 0, \quad \forall \; 0 \le i \le n \\[6pt]
& \text{pre}_{i,j} = \text{pre}_{i-1,j} + \text{pre}_{i,j-1} - \text{pre}_{i-1,j-1} + a_{i,j}, \quad \forall \; 1 \le i \le n, 1 \le j \le m
\end{aligned}
$$

The most common application of this array is computing the sum of elements in a submatrix with top-left corner $(x_1,y_1)$ and bottom-right corner $(x_2,y_2)$ in $O(1)$ time using the fact:

$$\sum_{x=x_1}^{x_2}\sum_{y=y_1}^{y_2}a_{x,y} = \text{pre}_{x_2,y_2} - \text{pre}_{x_1-1,y_2} - \text{pre}_{x_2, y_1-1} + \text{pre}_{x_1-1,y_1-1}$$

To gain a much better understanding of this visually, do check out the <a href="https://usaco.guide/silver/more-prefix-sums?lang=cpp" target="\_blank">interactive widget</a> on the USACO Guide.

For completeness, the mathematical derivation is provided below:

$$
\begin{aligned}
& \sum_{x=x_1}^{x_2}\sum_{y=y_1}^{y_2}a_{x,y} \\[6pt]
=\; & \sum_{x=x_1}^{x_2}\left(\sum_{y=1}^{y_2}a_{x,y} - \sum_{y=1}^{y_1-1}a_{x,y}\right) \\[6pt]
=\; & \sum_{x=x_1}^{x_2}\sum_{y=1}^{y_2}a_{x,y} - \sum_{x=x_1}^{x_2}\sum_{y=1}^{y_1-1}a_{x,y} \\[6pt]
=\; & \left(\sum_{x=1}^{x_2}\sum_{y=1}^{y_2}a_{x,y} - \sum_{x=1}^{x_1-1}\sum_{y=1}^{y_2}a_{x,y}\right) - \left(\sum_{x=1}^{x_2}\sum_{y=1}^{y_1-1}a_{x,y} - \sum_{x=1}^{x_1-1}\sum_{y=1}^{y_1-1}a_{x,y}\right) \\[6pt]
=\; & \text{pre}_{x_2,y_2} - \text{pre}_{x_1-1,y_2} - \text{pre}_{x_2,y_1-1} + \text{pre}_{x_1-1,y_1-1}
\end{aligned}
$$

### Learn Through Problems

<details>
<summary><a href="https://cses.fi/problemset/task/1652" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given an $n \times n$ grid. Each cell $a_{i,j}$ is either empty or contains a tree.<br><br>

You have to answer $q$ queries. In each query, you are given a rectangle defined by its corners $(y_1, x_1)$ and $(y_2, x_2)$, and you have to determine the number of cells containing a tree inside the rectangle.<br><br>

<b>Input</b><br>
The first line contains integers $n \left(1 \le n \le 10^3 \right)$ and $q \left(1 \le q \le 2\cdot10^5 \right)$.<br>
The next $n$ lines contain a string of length $n$ where an empty cell is defined by $.$ and a tree is defined by $*$.<br>
The next $q$ lines contain integers $y_1$, $x_1$, $y_2$, $x_2 \left(1 \le y_1 \le y_2 \le n, 1 \le x_1 \le x_2 \le n \right)$.<br><br>

<b>Output</b><br>
For each query, print the number of cells containing a tree inside the rectangle.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
4 3
.*..
*.**
**..
****
2 2 3 4
3 1 3 1
1 1 2 2</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
3
1
2</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build the prefix sum array $\text{pre}$ of the grid $a$ considering $a_{i,j} = 1$ if it contains a tree and $a_{i,j} = 0$ if its empty.<br><br>

The number of trees inside the rectangle defined by $(y_1,x_1)$ and $(y_2,x_2)$ is given by:
$$\text{pre}_{y_2,x_2} - \text{pre}_{y_1-1,x_2} - \text{pre}_{y_2,x_1-1} + \text{pre}_{y_1-1,x_1-1}$$

<b>Time Complexity:</b> $O(n^2)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio()

    int n, q;
    cin >> n >> q;

    vector pre(n + 1, vector<int>(n + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            char c;
            cin >> c;
            pre[i][j] = pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1] + (c == '*');
        }
    }

    while (q--) {
        int y1, x1, y2, x2;
        cin >> y1 >> x1 >> y2 >> x2;
        cout << pre[y2][x2] - pre[y1 - 1][x2] - pre[y2][x1 - 1] + pre[y1 - 1][x1 - 1] << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://codeforces.com/group/8O0H35Bmf0/contest/549980/problem/A" target="_blank"><b>Problem</b></a></summary>
<div class="spoiler-content">
You are given an $n \times m$ grid. Let $a_{i,j}$ denote the value of the cell at the $i^{th}$ row from the top and the $j^{th}$ column from the left. Initially, each cell has a value $0$.<br><br>

Perform $q$ operations on this grid:

<ul>
    <li>The $i^{th}$ operation is described by integers $a_i,b_i,c_i,d_i,w_i$.</li>
    <li>In the $i^{th}$ operation, for every $j,k$ such that $a_i \le j \le b_i$ and $c_i \le k \le d_i$, update $a_{j,k} \gets a_{j,k}+w_i$.</li>
</ul><br>

Find the final state of the grid after performing all $q$ operations.<br><br>

<b>Input</b><br>
The first line contains integers $n$, $m \left(1 \le n,m \le 10^3 \right)$ and $q \left(1 \le q \le 10^5 \right)$.<br>
The next $q$ lines contain integers $a_i$, $b_i \left(1 \le a_i,b_i \le n \right)$, $c_i$, $d_i \left(1 \le c_i,d_i \le m \right)$ and $w_i \left(0 \le w_i \le 10^9 \right)$.<br><br>

<b>Output</b><br>
Print the final state of the grid after performing all $q$ operations.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
3 3 3
1 2 1 3 5
2 3 2 3 4
2 3 1 2 3</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
5 5 5
8 12 9
3 7 4 </pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build an array $\text{val}$, where $\text{val}_{i,j}$ denotes the value of $a_{i,j}$ after all $q$ operations.<br><br>

To efficiently build the $\text{val}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every query $a_i,b_i,c_i,d_i,w_i$, update:
        <ul>
            <li>$\text{val}_{a_i,c_i} \gets \text{val}_{a_i,c_i} + w_i$</li>
            <li>$\text{val}_{a_i,d_i+1} \gets \text{val}_{a_i,d_i+1} - w_i$</li>
            <li>$\text{val}_{b_i+1,c_i} \gets \text{val}_{b_i+1,c_i} - w_i$</li>
            <li>$\text{val}_{b_i+1,d_i+1} \gets \text{val}_{b_i+1,d_i+1} + w_i$</li>
        </ul>
    </li>
    <li>After processing all the queries, replace $\text{val}$ array with its prefix sum array.</li>
</ul><br>

This is the <b>Difference Array</b> technique extended to 2D Prefix Sum. The logic of this extension is left as an exercise to the reader.<br><br>

<b>Time Complexity:</b> $O(n\cdot m)$

</div>

</details>

<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

signed main() {
    fastio()

    int n, m, q;
    cin >> n >> m >> q;

    vector pre(n + 2, vector<int>(m + 2));
    while (q--) {
        int a, b, c, d, w;
        cin >> a >> b >> c >> d >> w;

        pre[a][c] += w;
        pre[a][d + 1] -= w;
        pre[b + 1][c] -= w;
        pre[b + 1][d + 1] += w;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            pre[i][j] += pre[i - 1][j] + pre[i][j - 1] - pre[i - 1][j - 1];
            cout << pre[i][j] << " ";
        }
        cout << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

### Practice Problems

<ul>
    <li><a href="https://cses.fi/problemset/task/1662" target="_blank">CSES - Subarray Divisibility</a></li>
    <li><a href="https://codeforces.com/contest/1398/problem/C" target="_blank">Codeforces - Good Subarrays</a></li>
    <li><a href="https://atcoder.jp/contests/abc408/tasks/abc408_c" target="_blank">Atcoder - Not All Covered</a></li>
    <li><a href="https://atcoder.jp/contests/tokiomarine2020/tasks/tokiomarine2020_c" target="_blank">Atcoder - Lamps</a></li>
    <li><a href="https://codeforces.com/problemset/problem/1343/D" target="_blank">Codeforces - Constant Palindrome Sum</a></li>
    <li><a href="https://codeforces.com/contest/295/problem/A" target="_blank">Codeforces - Greg and Array</a></li>
    <li><a href="https://codeforces.com/contest/276/problem/C" target="_blank">Codeforces - Little Girl and Maximum Sum</a></li>
    <li><a href="https://codeforces.com/problemset/problem/466/C" target="_blank">Codeforces - Number of Ways</a></li>
    <li><a href="https://codeforces.com/problemset/problem/1864/D" target="_blank">Codeforces - Matrix Cascade</a></li>
    <li><a href="https://codeforces.com/problemset/problem/2056/D" target="_blank">Codeforces - Unique Median</a></li>
    <li><a href="https://codeforces.com/contest/2121/problem/F" target="_blank">Codeforces - Yamakasi</a></li>
    <li><a href="https://codeforces.com/contest/1826/problem/D" target="_blank">Codeforces - Running Miles</a></li>
    <li><a href="https://codeforces.com/contest/612/problem/D" target="_blank">Codeforces - The Union of k-Segments</a></li>
    <li><a href="https://codeforces.com/problemset/problem/689/E" target="_blank">Codeforces - Mike and Geometry Problem</a></li>
    <li><a href="https://codeforces.com/contest/2179/problem/H" target="_blank">Codeforces - Blackslex and Plants</a></li>
    <li><a href="https://atcoder.jp/contests/abc438/tasks/abc438_d" target="_blank">Atcoder - Tail of Snake</a></li>
    <li><a href="https://atcoder.jp/contests/abc356/tasks/abc356_e" target="_blank">Atcoder - Max/Min</a></li>
    <li><a href="https://atcoder.jp/contests/abc158/tasks/abc158_e" target="_blank">Atcoder - Divisible Substring</a></li>
    <li><a href="https://codeforces.com/problemset/problem/835/C" target="_blank">Codeforces - Star Sky</a></li>
    <li><a href="https://atcoder.jp/contests/abc410/tasks/abc410_f" target="_blank">Atcoder - Balanced Rectangles</a></li>
    <li><a href="https://www.codechef.com/problems/CENS20A" target="_blank">CodeChef - Cherry and Bits</a></li>
</ul>
