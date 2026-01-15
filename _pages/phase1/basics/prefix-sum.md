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
\sum_{j=l}^ra_j \\[6pt]
= \sum_{j=1}^ra_j - \sum_{j=1}^{l-1}a_j \\[6pt]
= \text{pre}_r - \text{pre}_{l-1}
$$

### Learn Through Problems

<details>
<summary><a href="https://cses.fi/problemset/task/1646" target="_blank"><b>CSES - Static Range Sum Queries</b></a></summary>
<div class="spoiler-content">
You are given $n$ integers $a_1,a_2,\ldots,a_n$ and $q$ queries of the form: compute the sum of values in range $[l_i,r_i]$.<br><br>

<b>Input</b><br>
The first line contains integers $n \left(1 \le n \le 2\cdot10^5\right)$ and $q \left(1 \le q \le 2\cdot10^5\right)$.<br>
The next line contains $n$ integers $a_1,a_2,\ldots,a_n \left(1 \le a_i \le 10^9\right)$.<br>
The next $q$ lines contain integers $l_i$ and $r_i$ $(1 \le l_i \le r_i \le n)$.<br><br>

<b>Output</b><br>
For each query, print the sum of values in range $[l_i,r_i]$.<br><br>

<div class="sample-block">
    <b>Sample Input</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
8 4
3 2 4 5 1 1 5 3
2 4
5 6
1 8
3 3</pre>
</div>

<div class="sample-block">
    <b>Sample Output</b>
    <button class="copy-btn" onclick="copySample(this)">Copy</button>
  <pre class="sample-io">
11
2
24
4</pre>
</div><br>

<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build the prefix sum array $\text{pre}$ of the array $a$. The sum of values in range $[l_i,r_i]$ is given by $\text{pre}_{r_i} - \text{pre}_{l_i-1}.$<br><br>

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

    int n, q;
    cin >> n >> q;

    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre[i];
        pre[i] += pre[i - 1];
    }

    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pre[r] - pre[l - 1] << endl;
    }

    return 0;
}
</script></code></pre>

</details>
</div>
</details>

<details>
<summary><a href="https://cses.fi/problemset/task/1661" target="_blank"><b>CSES - Subarray Sums II</b></a></summary>
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
<summary><a href="https://cses.fi/problemset/task/1643" target="_blank"><b>CSES - Maximum Subarray Sum</b></a></summary>
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
<summary><a href="https://codeforces.com/problemset/problem/1175/D" target="_blank"><b>Codeforces - Array Splitting</b></a></summary>
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

    nth_element(pre.begin() + 1, pre.begin() + k, pre.end());
    cout << k * pre[n] - accumulate(pre.begin() + 1, pre.begin() + k, 0LL) << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</details>

<details>
<summary><a href="https://codeforces.com/problemset/problem/816/B" target="_blank"><b>Codeforces - Karen and Coffee</b></a></summary>
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
Let us define:
<ul>
    <li>$\displaystyle \text{freq}_i = \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j}}^n1$: the number of intervals to which the temperature $i$ belongs, $\quad \forall \; 1 \le i \le N$ where $N = 2\cdot 10^5$.</li>
</ul><br>

To efficiently build the $\text{freq}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every interval $[l_i,r_i]$, update:
        <ul>
            <li>$\text{freq}_{l_i} \gets \text{freq}_{l_i}+1$</li>
            <li>$\text{freq}_{r_i+1} \gets \text{freq}_{r_i+1}-1$</li>
        </ul>
    </li>
    <li>After processing all the intervals, replace the $\text{freq}$ array with its prefix sum array.</li>
</ul><br>

The logic behind this technique (known as <b>Difference Array</b>) is explained below:

<ul>
    <li>When we perform $\text{freq}_{l_i} \gets \text{freq}_{l_i}+1$ and later replace the $\text{freq}$ array by its prefix sum array, the frequency of all temperatures $\ge l_i$ gets increased by $1$.</li>
    <li>However, for an interval $[l_i,r_i]$, we want to increase the frequency only for temperatures lying in the range $[l_i,r_i]$.</li>
    <li>To stop this increment after $r_i$, we perform $\text{freq}_{r_i+1} \gets \text{freq}_{r_i+1}-1$ and later replacing the $\text{freq}$ array by its prefix sum cancels the earlier increment for all temperatures $\ge r_i+1$.</li>
    <li>As a result, the net effect is that only temperatures in the range $[l_i,r_i]$ have their frequency increased by $1$, while other temperatures remain unaffected.</li>
</ul><br>

Let us define:

$$
c_i =
\begin{cases}
1, & \text{if } \text{freq}_i \ge k \\
0, & \text{otherwise}
\end{cases}
,\quad \forall \;1 \le i \le N.
$$

Build the prefix sum array $\text{pre}$ of the array $c$. The number of admissible integer temperatures in the range $[a,b]$ is given by $\text{pre}_b - \text{pre}_{a-1}$.<br><br>

<b>Time Complexity:</b> $O(N + n + q)$

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
<summary><a href="https://www.codechef.com/problems/AGCY" target="_blank"><b>CodeChef - Angry Cyborg</b></a></summary>
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
Let us define:
<ul>
    <li>$\displaystyle \text{val}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} (i - l_j + 1)$: the total number of statues destroyed in city $i$ after $q$ days, $\quad \forall \; 1 \le i \le n$.</li>
</ul><br>

We can rewrite the expression for $\text{val}_i$ as:

$$
\begin{aligned}
& \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} (i+1) - \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} l_j \\[6pt]
=\; & (i+1)\cdot\sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} 1 - \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} l_j
\end{aligned}
$$

Let us define:

<ul>
    <li>$\displaystyle \text{cnt}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} 1$ : the number of intervals $[l_j,r_j]$ such that $l_j \le i \le r_j, \quad \forall \; 1 \le i \le n$.</li>
    <li>$\displaystyle \text{sum}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^{q} l_j$ : the sum of $l_j$ over all intervals $[l_j,r_j]$ such that $l_j \le i \le r_j, \quad \forall \; 1 \le i \le n$.</li>
</ul><br>

We can rewrite the expression for $\text{val}_i$ as:
$$(i+1)\cdot\text{cnt}_i - \text{sum}_i$$

To efficiently build the $\text{cnt}$ and $\text{sum}$ arrays, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every interval $[l_j,r_j]$, update:
        <ul>
            <li>$\text{cnt}_{l_j} \gets \text{cnt}_{l_j}+1$</li>
            <li>$\text{cnt}_{r_j+1} \gets \text{cnt}_{r_j+1}-1$</li>
            <li>$\text{sum}_{l_j} \gets \text{sum}_{l_j}+l_j$</li>
            <li>$\text{sum}_{r_j+1} \gets \text{sum}_{r_j+1}-l_j$</li>
        </ul>
    </li>
    <li>After processing all the intervals, replace the $\text{cnt}$ and $\text{sum}$ arrays by their prefix sum arrays.</li>
</ul><br>

<b>Time Complexity:</b> $O\left(\sum (n+q)\right)$

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
<summary><a href="https://atcoder.jp/contests/abc188/tasks/abc188_d" target="_blank"><b>AtCoder - Snuke Prime</b></a></summary>
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
    <li>Let $m$ be the final size of the vector $\text{all}$</li>
</ul><br>

For each compressed index $i$, there are two distinct parts of days to consider:

<ul>
    <li>The exact day $\text{all}_i$.</li>
    <li>The continuous block of days $[\text{all}_i+1, \text{all}_{i+1}-1]$.</li>
</ul><br>

We will handle these two parts separately using arrays $\text{end}$ and $\text{mid}$ respectively:

<ul>
    <li>$\displaystyle \text{end}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i \le r_j}}^{n} c_j$ : the total cost of all services active on day $\text{all}_i, \quad \forall \; 0 \le i < m$.</li>
    <li>$\displaystyle \text{mid}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i+1 \\[3pt]  \text{all}_{i+1}-1 \le r_j}}^{n} c_j$ : the total cost of all services active on every day in $[\text{all}_i+1, \text{all}_{i+1}-1], \quad \forall \; 0 \le i < m-1$.</li>
</ul><br>

Basically, the array $\text{end}$ handles individual important days (i.e., days that are either start or end of a service interval) and the array $\text{mid}$ handles continuous stretches (i.e., days that are neither start nor end of any service interval and hence have identical cost). <br><br>

To efficiently build the $\text{end}$ and $\text{mid}$ arrays, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every service $a_i,b_i,c_i$, find the indices of $a_i$ and $b_i$ in the array $\text{all}$ using binary search to find their compressed values. Let these values be $l_i$ and $r_i$ respectively, update:
        <ul>
            <li>$\text{end}_{l_i} \gets \text{end}_{l_i}+c_i$</li>
            <li>$\text{end}_{r_i+1} \gets \text{end}_{r_i+1}-c_i$</li>
            <li>$\text{mid}_{l_i} \gets \text{mid}_{l_i}+c_i$</li>
            <li>$\text{mid}_{r_i} \gets \text{mid}_{r_i}-c_i$</li>
        </ul>
    </li>
    <li>After processing all the services, replace the $\text{end}$ and $\text{mid}$ arrays by their prefix sum arrays.</li>
</ul><br>

Without considering the subscription plan that costs $C$ yen per day, the total cost required to use all services is given by:
$$\sum_{i=0}^{m-1}\text{end}_i + \sum_{i=0}^{m-2}\text{mid}_i\cdot\left(\text{all}_{i+1}-\text{all}_i-1\right)$$

Considering the subscription plan that costs $C$ yen per day, the minimum total cost required to use all services is given by:
$$\sum_{i=0}^{m-1}\min\left(\text{end}_i, C\right) + \sum_{i=0}^{m-2}\min\left(\text{mid}_i, C\right)\cdot\left(\text{all}_{i+1}-\text{all}_i-1\right)$$

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
<summary><a href="https://csacademy.com/contest/archive/task/subarray-medians/statement/" target="_blank"><b>CSAcademy - Subarray Medians</b></a></summary>
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
& \sum_{i=1}^n\sum_{\substack{1 \le l \le i \le r \le n \\[3pt] (r - l)\ \text{even} \\[3pt] \text{median}(l,r)=a_i}}l \cdot r \cdot a_i \\[6pt]
=\; & \sum_{i=1}^na_i\cdot\sum_{\substack{1 \le l \le i \le r \le n \\[3pt] (r - l)\ \text{even} \\[3pt] \text{median}(l,r)=a_i}}l \cdot r
\end{aligned}
$$

To compute the inner summation for a fixed $i$, let us define:

$$
b_j = \begin{cases} 1, & \text{if } a_j > a_i \\ 0, & \text{if } a_j = a_i \\ -1, & \text{if } a_j < a_i \end{cases}, \quad \forall \; 1 \le j \le n.
$$

The median of an odd length subarray $[l,r]$ will be $a_i$ iff $l \le i \le r$ and $\displaystyle \sum_{j=l}^rb_j = 0$ since this implies that the number of elements $> a_i$ (which have been assigned a value $1$) is equal to the number of elements $< a_i$ (which have been assigned a value $-1$) in the subarray. <br><br>

Build the prefix sum array $\text{pre}$ of the array $b$. We can rewrite the expression for the inner summation as:

$$
\begin{aligned}
& \sum_{\substack{1 \le l \le i \le r \le n \\[3pt] \text{pre}_{l-1} = \text{pre}_r}}l \cdot r \\[6pt]
=\; & \sum_{r=i}^nr\cdot\sum_{\substack{l=1 \\[3pt] \text{pre}_{l-1} = \text{pre}_r}}^il \\[6pt]
=\; & \sum_{r=i}^nr\cdot\text{sum}_{\text{pre}_r}
\end{aligned}
$$

where $\displaystyle \text{sum}_j = \sum_{\substack{l=1 \\[3pt] \text{pre}_{l-1} = j}}^il$, which can be computed by iterating on $l$ from $1$ to $i$.<br><br>

Also, $-n \le \text{pre}_k \le n \left(\because \left|b_k\right| \leq 1\right)$ implies that we have to compute $\text{sum}_j$ for $-n \le j \le n$. To avoid using a map, we can do the following modification to the expression for the inner summation:
$$\sum_{r=i}^nr\cdot\text{sum}_{\text{pre}_r+n}$$

where $\displaystyle \text{sum}_j = \sum_{\substack{l=1 \\[3pt] \text{pre}_{l-1}+n = j}}^il$. Thus, we have to compute $\text{sum}_j$ for $0 \le j \le 2\cdot n$ which can be stored in an array.<br><br>

The final expression for the answer is given by:
$$\sum_{i=1}^na_i\cdot \sum_{r=i}^nr\cdot\text{sum}_{\text{pre}_r+n}$$

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
<summary><a href="https://www.codechef.com/problems/SUMOFCUBE" target="_blank"><b>CodeChef - Sum of Cube</b></a></summary>
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
<span style="color:red;"><i><b>NOTE:</b></i></span>
<i>This solution uses the concept of <b>Changing the Order of Summation</b>. There exists another solution to this problem which is explained in the <a href="{{ site.baseurl }}/phase1/maths/combinatorics" target="_blank">Combinatorics</a> section.</i><br><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Also build the prefix sum array $\text{pre2}$ of the array $\text{pre}$.<br><br>

We can rewrite the given expression as:

$$
\begin{aligned}
& \sum_{i = 1}^n\sum_{j = i}^n\left(\text{pre}_j - \text{pre}_{i-1}\right)^3 \\[6pt]
=\; & \sum_{i = 1}^n\sum_{j = i}^n\left(\text{pre}_j^3 - \text{pre}_{i-1}^3 - 3\cdot \text{pre}_j^2 \cdot \text{pre}_{i-1} + 3\cdot \text{pre}_j \cdot \text{pre}_{i-1}^2\right) \\[6pt]
=\; & S_1 - S_2 - 3\cdot S_3 + 3\cdot S_4
\end{aligned}
$$

Simplifying the expression for $S_1$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_j^3 = \sum_{j = 1}^n\sum_{i = 1}^j\text{pre}_j^3 = \sum_{j=1}^n\text{pre}_j^3\cdot\sum_{i=1}^j1
= \sum_{j=1}^n\text{pre}_j^3\cdot j
$$

Simplifying the expression for $S_2$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_{i-1}^3 = \sum_{i=1}^n\text{pre}_{i-1}^3\cdot\sum_{j=i}^n1 = \sum_{i=1}^n\text{pre}_{i-1}^3\cdot(n-i+1)
$$

Simplifying the expression for $S_3$:

$$
\sum_{i = 1}^n\sum_{j = i}^n\text{pre}_j^2\cdot\text{pre}_{i-1} = \sum_{j = 1}^n\sum_{i = 1}^j\text{pre}_j^2\cdot\text{pre}_{i-1}
= \sum_{j = 1}^n\text{pre}_j^2\cdot\sum_{i = 1}^j\text{pre}_{i-1} = \sum_{j = 1}^n\text{pre}_j^2\cdot\text{pre2}_{j-1}
$$

Simplifying the expression for $S_4$:

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
<summary><a href="https://atcoder.jp/contests/abc366/tasks/abc366_e" target="_blank"><b>AtCoder - Manhattan Multifocal Ellipse</b></a></summary>
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
Let us define:
<ul>
    <li>$\displaystyle f(x) = \sum_{i=1}^n\left|x-x_i\right|$, $\quad \forall \; 1 \le i \le n$.</li>
    <li>$\displaystyle g(y) = \sum_{i=1}^n\left|y-y_i\right|$, $\quad \forall \; 1 \le i \le n$.</li>
</ul><br>

Also, $\left|x-x_i\right| \le D \Rightarrow x_i - D \le x \le x_i + D$. Since $\min x_i = -10^6$, $\max x_i = 10^6$ and $\max D = 10^6$, we have $-2\cdot 10^6 \le x \le 2\cdot 10^6$. To make our computations simpler, we add a value $2\cdot 10^6$ to each $x_i$ so that $0 \le x \le 4\cdot 10^6$. Similarly we add a value $2\cdot 10^6$ to each $y_i$ so that $0 \le y \le 4\cdot 10^6$.<br><br>

We have to count the number of integer pairs $(x,y)$ such that:

<ul>
    <li>$0 \le x, y \le N$, where $N= 4\cdot10^6$</li>
    <li>$f(x)+g(y) \le D$</li>
</ul><br>

Let us understand how to compute $f(x)$ efficiently. Build the arrays $\text{cnt}$ and $\text{sum}$ as:

<ul>
    <li>$\displaystyle \text{cnt}_j = \sum_{\substack{i = 1 \\[3pt] x_i \le j}}^n1$ : the number of $x_i \le j$, $\quad \forall\; 0 \le j \le N$.</li>
    <li>$\displaystyle \text{sum}_j = \sum_{\substack{i = 1 \\[3pt] x_i \le j}}^nx_i$ : the sum of $x_i \le j$, $\quad \forall\; 0 \le j \le N$.</li>
</ul><br>

We can rewrite the expression for $f(x)$ as:

$$
\begin{aligned}
& \sum_{\substack{i=1 \\[3pt] x_i \le x}}^n(x-x_i) + \sum_{\substack{i=1 \\[3pt] x_i > x}}^n(x_i-x) \\[6pt]
=\; & \sum_{\substack{i=1 \\[3pt] x_i \le x}}^nx - \sum_{\substack{i=1 \\[3pt] x_i \le x}}^nx_i + \sum_{\substack{i=1 \\[3pt] x_i > x}}^nx_i - \sum_{\substack{i=1 \\[3pt] x_i > x}}^nx \\[6pt]
=\; & x\cdot\sum_{\substack{i=1 \\[3pt] x_i \le x}}^n1 - \sum_{\substack{i=1 \\[3pt] x_i \le x}}^nx_i + \sum_{\substack{i=1 \\[3pt] x_i > x}}^nx_i - x\cdot\sum_{\substack{i=1 \\[3pt] x_i > x}}^n1 \\[6pt]
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
<summary><a href="https://cses.fi/problemset/task/1652" target="_blank"><b>CSES - Forest Queries</b></a></summary>
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

<b>Time Complexity:</b> $O(n^2 + q)$

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
<summary><a href="https://codeforces.com/group/YaoVTlPgAO/contest/662696/problem/A" target="_blank"><b>Codeforces - 2D Difference Array</b></a></summary>
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
Let us define:
<ul>
    <li>$\displaystyle \text{val}_{i,j} = \sum_{\substack{k=1 \\ a_k \le i \le b_k \\ c_k \le j \le d_k}}^q{w_k}$: the value of $a_{i,j}$ after all $q$ operations, $\quad \forall \; 1 \le i \le n, 1 \le j \le m$.</li>
</ul><br>

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
    <li>After processing all the queries, replace the $\text{val}$ array with its prefix sum array.</li>
</ul><br>

This is the <b>Difference Array</b> technique extended to 2D Prefix Sum. The logic of this extension is left as an exercise for you.<br><br>

<b>Time Complexity:</b> $O(n\cdot m + q)$

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

    vector val(n + 2, vector<int>(m + 2));
    while (q--) {
        int a, b, c, d, w;
        cin >> a >> b >> c >> d >> w;

        val[a][c] += w;
        val[a][d + 1] -= w;
        val[b + 1][c] -= w;
        val[b + 1][d + 1] += w;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            val[i][j] += val[i - 1][j] + val[i][j - 1] - val[i - 1][j - 1];
            cout << val[i][j] << " ";
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
<li>
<a href="https://cses.fi/problemset/task/1650" target="_blank">CSES - Range XOR Queries</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Build the prefix xor array $\text{pre}$ of the array $a$ using the following relations:
$$
\begin{aligned}
& \text{pre}_0 = 0 \\[6pt]
& \text{pre}_i = \text{pre}_{i-1} \oplus a_i, \quad \forall \; 1 \le i \le n
\end{aligned}
$$

The xor of values in range $[a,b]$ is given by $\text{pre}_b \oplus \text{pre}_{a-1}.$<br><br>

<b>Time Complexity:</b> $O(n+q)$

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

    vector<int> pre(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre[i];
        pre[i] ^= pre[i - 1];
    }

    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << (pre[b] ^ pre[a - 1]) << endl;
    }

    return 0;
}
</script></code></pre>

</details>
</div>
</li>
<li>
<a href="https://cses.fi/problemset/task/1662" target="_blank">CSES - Subarray Divisibility</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Formally, we have to count the number of pairs $(l,r)$ such that:
<ul>
    <li>$1 \le l \le r \le n$</li>
    <li>$\displaystyle \sum_{i=l}^ra_i \bmod n = 0$</li>
</ul><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Now the second condition can be written as:

$$
\begin{aligned}
& \left(\text{pre}_r - \text{pre}_{l-1}\right) \bmod n = 0 \\[6pt]
\Rightarrow\; & \text{pre}_{l-1} \bmod n = \text{pre}_r \bmod n
\end{aligned}
$$

Replacing $l \rightarrow l+1$, we can rewrite both the conditions as:

<ul>
    <li>$0 \le l < r \le n$</li>
    <li>$\text{pre}_l \bmod n = \text{pre}_r \bmod n$</li>
</ul><br>

To count the number of pairs $(l,r)$ satisfying this, we can iterate on $r$ from $1$ to $n$ and keep track of the frequencies of $\text{pre}_l \bmod n$ for $0 \le l < r$.<br><br>

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

    int ans = 0, pre = 0;
    vector<int> freq(n + 1);
    freq[pre] = 1;

    for (int r = 1; r <= n; r++) {
        int x;
        cin >> x;
        pre = (pre + x % n + n) % n;
        ans += freq[pre], freq[pre]++;
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>

</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/1398/problem/C" target="_blank">Codeforces - Good Subarrays</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Formally, we have to count the number of pairs $(l,r)$ such that:
<ul>
    <li>$1 \le l \le r \le n$</li>
    <li>$\displaystyle \sum_{i=l}^ra_i = r-l+1$</li>
</ul><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Now the second condition can be written as:

$$
\begin{aligned}
& \text{pre}_r - \text{pre}_{l-1} = r-l+1 \\[6pt]
\Rightarrow\; & \text{pre}_{l-1} - (l-1) = \text{pre}_r - r
\end{aligned}
$$

Replacing $l \rightarrow l+1$, we can rewrite both the conditions as:

<ul>
    <li>$0 \le l < r \le n$</li>
    <li>$\text{pre}_{l}-l = \text{pre}_r-r$</li>
</ul><br>

To count the number of pairs $(l,r)$ satisfying this, we can iterate on $r$ from $1$ to $n$ and keep track of the frequencies of $\text{pre}_l-l$ for $0 \le l < r$.<br><br>

Also, $0 \le \text{pre}_i \le 9\cdot n$ and $0 \le i \le n$ $\Rightarrow -n \le \text{pre}_i-i \le 9\cdot n$. To store the frequencies of $\text{pre}_i-i$ in an array and avoid using a map, we can add a value $n$ to it so that $0 \le \text{pre}_i-i+n \le 10\cdot n$.<br><br>

<b>Time Complexity:</b> $O(\sum{n})$

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

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int ans = 0, pre = n;
        vector<int> freq(10 * n + 1);
        freq[pre] = 1;

        for (int r = 1; r <= n; r++) {
            char c;
            cin >> c;
            int d = c - '0';
            pre += d, ans += freq[pre - r];
            freq[pre - r]++;
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/abc408/tasks/abc408_c" target="_blank">AtCoder - Not All Covered</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{freq}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le i \le r_j}}^M1$: the number of turrets which guard the castle wall $i$, $\quad \forall \; 1 \le i \le N$.</li>
</ul><br>

To efficiently build the $\text{freq}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every turret $[l_i,r_i]$, update:
        <ul>
            <li>$\text{freq}_{l_i} \gets \text{freq}_{l_i}+1$</li>
            <li>$\text{freq}_{r_i+1} \gets \text{freq}_{r_i+1}-1$</li>
        </ul>
    </li>
    <li>After processing all the turrets, replace the $\text{freq}$ array with its prefix sum array.</li>
</ul><br>

For a castle wall $i$, the minimum number of turrets that need to be destroyed so that it is not guarded by any turret is $\text{freq}_i$.<br><br>

Thus, the minimum number of turrets that need to be destroyed so that at least one castle wall is not guarded by any turret is given by:
$$\min_{1 \le i \le N}\text{freq}_i$$

<b>Time Complexity:</b> $O(N+M)$

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

    int n, m;
    cin >> n >> m;

    vector<int> freq(n + 2);
    for (int i = 0; i < m; i++) {
        int l, r;
        cin >> l >> r;
        freq[l]++, freq[r + 1]--;
    }

    int ans = m;
    for (int i = 1; i <= n; i++) {
        freq[i] += freq[i - 1];
        ans = min(ans, freq[i]);
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/tokiomarine2020/tasks/tokiomarine2020_c" target="_blank">AtCoder - Lamps</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    vector<int> a(n + 2);
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    for (int i = 1; i <= k; i++) {
        vector<int> sum(n + 2);
        for (int i = 1; i <= n; i++) {
            int l = max(1LL, i - a[i]);
            int r = min(n, i + a[i]);
            sum[l]++, sum[r + 1]--;
        }

        for (int i = 1; i <= n; i++)
            sum[i] += sum[i - 1];

        if (sum == a)
            break;

        swap(a, sum);
    }

    for (int i = 1; i <= n; i++)
        cout << a[i] << " ";

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/1343/D" target="_blank">Codeforces - Constant Palindrome Sum</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int t;
    cin >> t;

    while (t--) {
        int n, k;
        cin >> n >> k;

        vector<int> a(n);
        for (auto &x : a)
            cin >> x;

        vector<int> val(2 * k + 2);
        auto add = [&](int l, int r, int x) {
            val[l] += x, val[r + 1] -= x;
        };

        for (int i = 0; i < n / 2; i++) {
            int x = a[i], y = a[n - 1 - i];
            if (x > y) swap(x, y);

            int m1 = x + 1, m2 = x + y, m3 = y + k;
            add(m1, m2 - 1, 1), add(m2 + 1, m3, 1);
            add(2, m1 - 1, 2), add(m3 + 1, 2 * k, 2);
        }

        int ans = 2 * n;
        for (int i = 2; i <= 2 * k; i++) {
            val[i] += val[i - 1];
            ans = min(ans, val[i]);
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/295/problem/A" target="_blank">Codeforces - Greg and Array</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{freq}_i = \sum_{\substack{j=1 \\[3pt] x_j \le i \le y_j}}^k1$: the number of times operation $i$ needs to be applied, $\quad \forall \; 1 \le i \le m$.</li>
    <li>$\displaystyle \text{sum}_i = \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j}}^md_j$: the total value added to $a_i$ after applying all operations, $\quad \forall \; 1 \le i \le n$.</li>
</ul><br>

To efficiently build the $\text{freq}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every query $[x_i,y_i]$, update:
        <ul>
            <li>$\text{freq}_{x_i} \gets \text{freq}_{x_i} + 1$</li>
            <li>$\text{freq}_{y_i+1} \gets \text{freq}_{y_i+1} - 1$</li>
        </ul>
    </li>
    <li>After processing all the queries, replace the $\text{freq}$ array with its prefix sum array.</li>
</ul><br>

To efficiently build the $\text{sum}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every operation $[l_i,r_i,d_i]$, update:
        <ul>
            <li>$\text{sum}_{l_i} \gets \text{sum}_{l_i} + d_i\cdot \text{freq}_i$</li>
            <li>$\text{sum}_{r_i+1} \gets \text{sum}_{r_i+1} - d_i\cdot \text{freq}_i$</li>
        </ul>
    </li>
    <li>After processing all the operations, replace the $\text{sum}$ array with its prefix sum array.</li>
</ul><br>

After applying all operations, the value of element at index $i$ is given by $a_i + \text{sum}_i$.<br><br>

<b>Time Complexity:</b> $O(n+m+k)$

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

    int n, m, k;
    cin >> n >> m >> k;

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    vector<array<int, 3>> op(m + 1);
    for (int i = 1; i <= m; i++)
        cin >> op[i][0] >> op[i][1] >> op[i][2];

    vector<int> freq(m + 2);
    for (int i = 1; i <= k; i++) {
        int x, y;
        cin >> x >> y;
        freq[x]++, freq[y + 1]--;
    }

    vector<int> sum(n + 2);
    for (int i = 1; i <= m; i++) {
        freq[i] += freq[i - 1];
        auto &[l, r, d] = op[i];
        sum[l] += d * freq[i], sum[r + 1] -= d * freq[i];
    }

    for (int i = 1; i <= n; i++) {
        sum[i] += sum[i - 1];
        cout << a[i] + sum[i] << " ";
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/276/problem/C" target="_blank">Codeforces - Little Girl and Maximum Sum</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    vector<int> freq(n + 2);
    for (int i = 1; i <= q; i++) {
        int l, r;
        cin >> l >> r;
        freq[l]++, freq[r + 1]--;
    }

    vector<int> all = {0};
    for (int i = 1; i <= n; i++) {
        freq[i] += freq[i - 1];
        all.push_back(freq[i]);
    }

    sort(a.begin(), a.end());
    sort(all.begin(), all.end());

    int ans = 0;
    for (int i = 1; i <= n; i++)
        ans += a[i] * all[i];
    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/466/C" target="_blank">Codeforces - Number of Ways</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Formally, we have to count the number of pairs $(l,r)$ such that:
<ul>
    <li>$2 \le l \le r < n$</li>
    <li>$\displaystyle \sum_{i=1}^{l-1}a_i = \sum_{i=l}^ra_i = \sum_{i=r+1}^na_i$</li>
</ul><br>

Build the prefix sum array $\text{pre}$ of the array $a$. Now the second condition can be written as:

$$
\begin{aligned}
& \text{pre}_{l-1} = \text{pre}_r - \text{pre}_{l-1} = \text{pre}_n - \text{pre}_r \\[6pt]
\Rightarrow\; & \text{pre}_{l-1} = \frac{\text{pre}_n}{3}, \quad \text{pre}_r = \frac{2\cdot \text{pre}_n}{3} \\[6pt]
\Rightarrow\; & 3\cdot \text{pre}_{l-1} = \text{pre}_n, \quad 3\cdot \text{pre}_r = 2\cdot \text{pre}_n
\end{aligned}
$$

Replacing $l \rightarrow l+1$, we can rewrite both the conditions as:

<ul>
    <li>$1 \le l < r < n$</li>
    <li>$3\cdot \text{pre}_l = \text{pre}_n, \quad 3\cdot \text{pre}_r = 2\cdot \text{pre}_n$</li>
</ul><br>

To count the number of pairs $(l,r)$ satisfying this, we can iterate on $r$ from $2$ to $n-1$ and keep track of the count of $l$ such that $1 \le l < r$ and $3\cdot \text{pre}_l = \text{pre}_n$.<br><br>

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

    int ans = 0, cnt = (3 * pre[1] == pre[n]);
    for (int r = 2; r < n; r++) {
        if (3 * pre[r] == 2 * pre[n])
            ans += cnt;
        cnt += (3 * pre[r] == pre[n]);
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/1864/D" target="_blank">Codeforces - Matrix Cascade</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        int ans = 0;
        vector left(n + 1, vector<int>(n));
        vector right(n + 1, vector<int>(n));
        for (int i = 0; i < n; i++) {
            int pre = 0;
            for (int j = 0; j < n; j++) {
                char c;
                cin >> c;

                left[i + 1][max(j - 1, 0LL)] ^= left[i][j];
                right[i + 1][min(j + 1, n - 1)] ^= right[i][j];

                pre ^= left[i][j];
                if (pre ^ (c == '1')) {
                    left[i + 1][max(j - 1, 0LL)] ^= 1LL;
                    right[i + 1][min(j + 1, n - 1)] ^= 1LL;
                    ans++;
                }
                pre ^= right[i][j];
            }
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/2056/D" target="_blank">Codeforces - Unique Median</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++)
            cin >> a[i];

        int bad = 0;
        for (int med = 1; med <= 10; med++) {
            int j = 0;
            vector<int> pre(n + 1, n), freq(2 * n + 1);
            for (int i = 1; i <= n; i++) {
                if (a[i] == med)
                    while (j < i)
                        freq[pre[j++]]++;

                pre[i] = pre[i - 1] + (a[i] >= med ? 1 : -1);
                bad += freq[pre[i]];
            }
        }

        cout << (n * (n + 1)) / 2 - bad << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/2121/problem/F" target="_blank">Codeforces - Yamakasi</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int t;
    cin >> t;

    while (t--) {
        int n, s, x;
        cin >> n >> s >> x;

        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++)
            cin >> a[i];

        auto solve = [&](int mx) {
            map<int, int> mp;
            int ans = 0, pre = 0;
            for (int i = 1; i <= n; i++) {
                if (a[i] <= mx) {
                    mp[pre]++, pre += a[i];
                    if (mp.find(pre - s) != mp.end())
                        ans += mp[pre - s];
                }
                else mp.clear();
            }

            return ans;
        };

        cout << solve(x) - solve(x - 1) << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/1826/problem/D" target="_blank">Codeforces - Running Miles</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Notice that two of the maximums should be at the ends of the range $[l,r]$, otherwise we can move at least one of the boundaries closer to the other and get a better answer.<br><br>

Formally, we have to compute the value of the expression:

$$
\begin{aligned}
& \max_{1 \le l < i < r \le n}\left(b_l + b_i + b_r - (r-l)\right) \\[6pt]
=\; & \max_{1 < i < n}\left(b_i + \max_{1 \le l < i}(b_l+l) + \max_{i < r \le n}(b_r-r)\right) \\[6pt]
\end{aligned}
$$

Let us define:

<ul>
    <li>$\displaystyle \text{pre}_i = \max_{1 \le j \le i}(b_j + j), \quad \forall \; 1 \le i \le n$.</li>
    <li>$\displaystyle \text{suf}_i = \max_{i \le j \le n}(b_j - j), \quad \forall \; 1 \le i \le n$.</li>
</ul><br>

We can rewrite the above expression as:
$$\max_{1 < i < n}\left(b_i + \text{pre}_{i-1} + \text{suf}_{i+1}\right)$$

To efficiently build the $\text{pre}$ and $\text{suf}$ arrays, use the following relations:

$$
\begin{aligned}
& \text{pre}_1 = b_1 + 1 \\[6pt]
& \text{pre}_i = \max(\text{pre}_{i-1}, b_i+i), \quad \forall \; 1 < i \le n \\[6pt]
& \text{suf}_n = b_n - n \\[6pt]
& \text{suf}_i = \max(\text{suf}_{i+1}, b_i-i), \quad \forall \; 1 \le i < n
\end{aligned}
$$

<b>Time Complexity:</b> $O(\sum{n})$

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

    int t;
    cin >> t;

    while (t--) {
        int n;
        cin >> n;

        vector<int> b(n + 1);
        for (int i = 1; i <= n; i++)
            cin >> b[i];

        vector<int> pre(n + 1);
        pre[1] = b[1] + 1;
        for (int i = 2; i <= n; i++)
            pre[i] = max(pre[i - 1], b[i] + i);

        vector<int> suf(n + 1);
        suf[n] = b[n] - n;
        for (int i = n - 1; i >= 1; i--)
            suf[i] = max(suf[i + 1], b[i] - i);

        int ans = 0;
        for (int i = 2; i <= n - 1; i++)
            ans = max(ans, b[i] + pre[i - 1] + suf[i + 1]);
        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/612/problem/D" target="_blank">Codeforces - The Union of k-Segments</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
We will use the technique of <b>Coordinate Compression</b> to simplify this problem:

<ul>
    <li>Initialize an empty vector $\text{all}$.</li>
    <li>Insert all values of $l_i$ and $r_i$ in $\text{all}$.</li>
    <li>Sort $\text{all}$ and erase duplicates from it.</li>
    <li>Let $m$ be the final size of the vector $\text{all}$</li>
</ul><br>

For each compressed index $i$, there are two distinct parts of points to consider:

<ul>
    <li>The exact point $\text{all}_i$.</li>
    <li>All the points in $(\text{all}_i, \text{all}_{i+1})$.</li>
</ul><br>

We will handle these two parts separately using arrays $\text{end}$ and $\text{mid}$ respectively:

<ul>
    <li>$\displaystyle \text{end}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i \le r_j}}^{n} 1$ : the number of segments $[l_j,r_j]$ containing the point $\text{all}_i, \quad \forall \; 0 \le i < m$.</li>
    <li>$\displaystyle \text{mid}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i \\[3pt]  \text{all}_{i+1} \le r_j}}^{n} 1$ : the number of segments $[l_j,r_j]$ containing all the points in $(\text{all}_i, \text{all}_{i+1}), \quad \forall \; 0 \le i < m-1$.</li>
</ul><br>

To efficiently build the $\text{end}$ and $\text{mid}$ arrays, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every segment $l_i,r_i$, find the indices of $l_i$ and $r_i$ in the array $\text{all}$ using binary search to find their compressed values. Let these values be $L_i$ and $R_i$ respectively, update:
        <ul>
            <li>$\text{end}_{L_i} \gets \text{end}_{L_i}+1$</li>
            <li>$\text{end}_{R_i+1} \gets \text{end}_{R_i+1}-1$</li>
            <li>$\text{mid}_{L_i} \gets \text{mid}_{L_i}+1$</li>
            <li>$\text{mid}_{R_i} \gets \text{mid}_{R_i}-1$</li>
        </ul>
    </li>
    <li>After processing all the segments, replace the $\text{end}$ and $\text{mid}$ arrays by their prefix sum arrays.</li>
</ul><br>

Using the $\text{end}$ and $\text{mid}$ arrays we can easily construct the smallest set of segments which contains all the points that belong at least k segments. For more details, take a look at the implementation.<br><br>

<b>Time Complexity:</b> $O(n \log n)$

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

    vector<int> all;
    vector<array<int, 2>> v(n);
    for (auto &[l, r] : v) {
        cin >> l >> r;
        all.push_back(l), all.push_back(r);
    }

    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());

    int m = size(all);
    vector<int> end(m + 1), mid(m + 1);
    for (auto [l, r] : v) {
        l = lower_bound(all.begin(), all.end(), l) - all.begin();
        r = lower_bound(all.begin(), all.end(), r) - all.begin();
        end[l]++, end[r + 1]--;
        mid[l]++, mid[r]--;
    }

    for (int i = 1; i < m; i++) {
        end[i] += end[i - 1];
        mid[i] += mid[i - 1];
    }

    vector<array<int, 2>> ans;
    for (int i = 0; i < m; i++) {
        if (i && mid[i - 1] >= k)
            ans.back()[1] = all[i];
        else if (end[i] >= k)
            ans.push_back({all[i], all[i]});
    }

    cout << size(ans) << endl;
    for (auto &[l, r] : ans)
        cout << l << " " << r << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/689/E" target="_blank">Codeforces - Mike and Geometry Problem</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
We will use the technique of <b>Coordinate Compression</b> to simplify this problem:

<ul>
    <li>Initialize an empty vector $\text{all}$.</li>
    <li>Insert all values of $l_i$ and $r_i$ in $\text{all}$.</li>
    <li>Sort $\text{all}$ and erase duplicates from it.</li>
    <li>Let $m$ be the final size of the vector $\text{all}$</li>
</ul><br>

For each compressed index $i$, there are two distinct parts of points to consider:

<ul>
    <li>The exact point $\text{all}_i$.</li>
    <li>All the points in $[\text{all}_i+1, \text{all}_{i+1}-1]$.</li>
</ul><br>

We will handle these two parts separately using arrays $\text{end}$ and $\text{mid}$ respectively:

<ul>
    <li>$\displaystyle \text{end}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i \le r_j}}^{n} 1$ : the number of segments $[l_j,r_j]$ containing the point $\text{all}_i, \quad \forall \; 0 \le i < m$.</li>
    <li>$\displaystyle \text{mid}_i = \sum_{\substack{j = 1 \\[3pt] l_j \le \text{all}_i+1 \\[3pt]  \text{all}_{i+1}-1 \le r_j}}^{n} 1$ : the number of segments $[l_j,r_j]$ containing all the points in $[\text{all}_i+1, \text{all}_{i+1}-1], \quad \forall \; 0 \le i < m-1$.</li>
</ul><br>

To efficiently build the $\text{end}$ and $\text{mid}$ arrays, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every segment $l_i,r_i$, find the indices of $l_i$ and $r_i$ in the array $\text{all}$ using binary search to find their compressed values. Let these values be $L_i$ and $R_i$ respectively, update:
        <ul>
            <li>$\text{end}_{L_i} \gets \text{end}_{L_i}+1$</li>
            <li>$\text{end}_{R_i+1} \gets \text{end}_{R_i+1}-1$</li>
            <li>$\text{mid}_{L_i} \gets \text{mid}_{L_i}+1$</li>
            <li>$\text{mid}_{R_i} \gets \text{mid}_{R_i}-1$</li>
        </ul>
    </li>
    <li>After processing all the segments, replace the $\text{end}$ and $\text{mid}$ arrays by their prefix sum arrays.</li>
</ul><br>

Let $\text{ans} = $ the number of points in the intersection of any $k$ of the segments. Notice that if any point $j$ is contained in exactly $i$ segments, then its contribution to the value of $\text{ans}$ will be $\displaystyle \left(\begin{array}{cc} i \\ k \\  \end{array}\right) = \frac{i!}{k!\,(i-k)!}$. This is known as the <b>Contribution Technique</b>.<br><br>

Thus, we can write the expression for $\text{ans}$ as:
$$\sum_{\substack{i=0 \\ \text{end}_i \ge k}}^{m-1}\left(\begin{array}{cc} \text{end}_i \\ k \\  \end{array}\right) + \sum_{\substack{i=0 \\ \text{mid}_i \ge k}}^{m-2}\left(\begin{array}{cc} \text{mid}_i \\ k \\  \end{array}\right)\cdot (\text{all}_{i+1}-\text{all}_i-1)$$

<b>Time Complexity:</b> $O(n \log n)$

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
const int mod = (int)1e9 + 7;

int mexp(int a, int n) {
    int res = 1;
    while (n) {
        if (n & 1LL) res = (res * a) % mod;
        a = (a * a) % mod, n >>= 1LL;
    }
    return res;
}

signed main() {
    fastio()

    vector<int> fact(N + 1, 1);
    for (int i = 1; i <= N; i++)
        fact[i] = fact[i - 1] * i % mod;

    vector<int> inv(N + 1);
    inv[N] = mexp(fact[N], mod - 2);
    for (int i = N - 1; i >= 0; i--)
        inv[i] = inv[i + 1] * (i + 1) % mod;

    auto nCr = [&](int n, int r) {
        return fact[n] * inv[r] % mod * inv[n - r] % mod;
    };

    int n, k;
    cin >> n >> k;

    vector<int> all;
    vector<array<int, 2>> v(n);
    for (auto &[l, r] : v) {
        cin >> l >> r;
        all.push_back(l), all.push_back(r);
    }

    sort(all.begin(), all.end());
    all.erase(unique(all.begin(), all.end()), all.end());

    int m = size(all);
    vector<int> end(m + 1), mid(m + 1);
    for (auto [l, r] : v) {
        l = lower_bound(all.begin(), all.end(), l) - all.begin();
        r = lower_bound(all.begin(), all.end(), r) - all.begin();
        end[l]++, end[r + 1]--;
        mid[l]++, mid[r]--;
    }

    for (int i = 1; i < m; i++) {
        end[i] += end[i - 1];
        mid[i] += mid[i - 1];
    }

    int ans = 0;
    for (int i = 0; i < m; i++) {
        if (end[i] >= k)
            ans = (ans + nCr(end[i], k)) % mod;
        if (i + 1 < m && mid[i] >= k)
            ans = (ans + nCr(mid[i], k) * (all[i + 1] - all[i] - 1)) % mod;
    }
    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/contest/2179/problem/H" target="_blank">Codeforces - Blackslex and Plants</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{val}_i = \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j}}^qf(i-l_j+1)$: the value of plant $i$ after all $q$ operations.</li>
</ul><br>

Using the definition of $f(x)$, we can rewrite the expression for $\text{val}_i$ as:

$$
\sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j}}^q{(i-l_j+1)\cdot \text{LSSB}_{i-l_j+1}}
$$

where $\text{LSSB}_x$ is the value of the least significant set bit of $x$.<br><br>

Also, $1 \le i-l_j+1 \le n$ $\Rightarrow$ $\text{LSSB}_{i-l_j+1} \in \left\{2^0, 2^1, \ldots, 2^N\right\}$ where $N=\left\lfloor \log n \right\rfloor$. Using the <b>Contribution Technique</b>, we can rewrite the expression for $\text{val}_i$ as:

$$
\begin{aligned}
& \sum_{k=0}^N\sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^q{(i-l_j+1)\cdot 2^k} \\[6pt]
=\; & \sum_{k=0}^N{2^k \cdot \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^q(i-l_j+1)} \\[6pt]
=\; & \sum_{k=0}^N{2^k \cdot \left((i+1)\cdot \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^q1 - \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^ql_j\right)} \\[6pt]
\end{aligned}
$$

Let us define:

<ul>
    <li>$\displaystyle \text{cnt}_{k,i} = \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^q1$: the number of operations $[l_j,r_j]$ such that $l_j \le i \le r_j$ and $\text{LSSB}_{i-l_j+1}=2^k$, $\quad \forall \; 0 \le k \le N, 1 \le i \le n$.</li>
    <li>$\displaystyle \text{sum}_{k,i} = \sum_{\substack{j=1 \\[3pt] l_j \le i \le r_j \\[3pt] \text{LSSB}_{i-l_j+1}=2^k}}^ql_j$: the sum of $l_j$ over all operations $[l_j,r_j]$ such that $l_j \le i \le r_j$ and $\text{LSSB}_{i-l_j+1}=2^k$, $\quad \forall \; 0 \le k \le N, 1 \le i \le n$.</li>
</ul><br>

We can rewrite the expression for $\text{val}_i$ as:
$$\sum_{k=0}^N{2^k \cdot \left((i+1)\cdot \text{cnt}_{k,i} - \text{sum}_{k,i}\right)}$$

<span style="color:Brown;"><b>FACT:</b></span> For any positive integer $x$, $\text{LSSB}_x = 2^k$ $(k \ge 0)$ iff $x$ is an odd multiple of $2^k$; formally $\exists\; m \in {\mathbb{Z}}_{\geq 0}$ such that:
$$x = 2^k \cdot (2\cdot m + 1) = 2^{k+1} \cdot m + 2^k$$

Using this fact, we can say that:

$$
\begin{aligned}
& \text{LSSB}_{i-l_j+1} = 2^k \\[6pt]
\Leftrightarrow\; & i-l_j+1 \in \{2^{k+1}\cdot m+2^k \mid m \in \mathbb{Z}_{\geq 0}\} \\[6pt]
\Leftrightarrow\; & i \in \{2^{k+1}\cdot m+2^k+l_j-1 \mid m \in \mathbb{Z}_{\geq 0}\}
\end{aligned}
$$

This is an arithmetic progression with first term $2^k + l_j-1$ and common difference $2^{k+1}$.<br><br>

From the above analysis we can conclude that for an operation $[l_j,r_j]$, we want to make the following updates efficiently to build the $\text{cnt}$ and $\text{sum}$ arrays:

$$
\begin{aligned}
& \text{cnt}_{k,i} \gets \text{cnt}_{k,i} + 1, \quad \forall \; 0 \le k \le N, i \in \{2^{k+1}\cdot m+2^k+l_j-1 \mid m \in \mathbb{Z}_{\geq 0}\} \cap \{l_j,l_j+1,\ldots,r_j\} \\[6pt]
& \text{sum}_{k,i} \gets \text{sum}_{k,i} + l_j, \quad \forall \; 0 \le k \le N, i \in \{2^{k+1}\cdot m+2^k+l_j-1 \mid m \in \mathbb{Z}_{\geq 0}\} \cap \{l_j,l_j+1,\ldots,r_j\}
\end{aligned}
$$

This is equivalent to adding a fixed value to a set of indices $i$ in range $[l_j,r_j]$ which are part of an arithmetic progression having first term $2^k + l_j - 1$ and common difference $2^{k+1}$.<br><br>

<span style="color:Red;"><b><i>NOTE:</i></b></span>
<i>I recommend you to stop here and think about how to apply the updates efficiently. Since the affected indices form an arithmetic progression with common difference $2^{k+1}$, the updates can be done using the technique of <b>Difference Array</b> along a modulo class.</i><br><br>

To efficiently build the $\text{cnt}$ and $\text{sum}$ arrays, follow the steps:

<ul>
    <li>Initilize the $\text{cnt}$ and $\text{sum}$ arrays with all zeros.</li>
    <li>For every operation $[l_j,r_j]$, for a fixed value of $k$, define $a = 2^k + l_j - 1$ (first term), $d = 2^{k+1}$ (common difference), let $\textbf{st}$ and $\textbf{end}$ be the minimum and maximum values respectively in the range $[l_j,r_j]$ which are part of this arithmetic progression, update:
        <ul>
            <li>$\text{cnt}_{k,st} \gets \text{cnt}_{k,st} + 1, \quad \forall \; 0 \le k \le N$</li>
            <li>$\text{cnt}_{k,end+d} \gets \text{cnt}_{k,end+d} - 1, \quad \forall \; 0 \le k \le N$</li>
            <li>$\text{sum}_{k,st} \gets \text{sum}_{k,st} + l_j, \quad \forall \; 0 \le k \le N$</li>
            <li>$\text{sum}_{k,end+d} \gets \text{sum}_{k,end+d} - l_j, \quad \forall \; 0 \le k \le N$</li>
        </ul>
    </li>
    <li>After processing all the operations, first iterate on $k$ from $0$ to $N$, then iterate on $i$ from $d = 2^{k+1}$ to $n$, update:
        <ul>
            <li>$\text{cnt}_{k,i} \gets \text{cnt}_{k,i} + \text{cnt}_{k,i-d}$</li>
            <li>$\text{sum}_{k,i} \gets \text{sum}_{k,i} + \text{sum}_{k,i-d}$</li>
        </ul>
    </li>
</ul><br>

<b>Time Complexity:</b> $O(\sum((n+q) \log n))$

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

    int t;
    cin >> t;

    while (t--) {
        int n, q;
        cin >> n >> q;

        int N = log2(n);
        vector cnt(N + 1, vector<int>(n + 1));
        vector sum(N + 1, vector<int>(n + 1));
        for (int i = 0; i < q; i++) {
            int l, r;
            cin >> l >> r;

            for (int k = 0; k <= N; k++) {
                int a = (1 << k) + l - 1, d = (1 << (k + 1));
                if (r < a)
                    continue;

                int st = a, end = a + ((r - a) / d) * d;
                cnt[k][st]++, sum[k][st] += l;
                if (end + d <= n)
                    cnt[k][end + d]--, sum[k][end + d] -= l;
            }
        }

        for (int k = 0; k <= N; k++) {
            int d = (1 << (k + 1));
            for (int i = d; i <= n; i++) {
                cnt[k][i] += cnt[k][i - d];
                sum[k][i] += sum[k][i - d];
            }
        }

        for (int i = 1; i <= n; i++) {
            int ans = 0;
            for (int k = 0; k <= N; k++)
                ans += ((1 << k) * ((i + 1) * cnt[k][i] - sum[k][i]));
            cout << ans << " ";
        }
        cout << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/abc438/tasks/abc438_d" target="_blank">AtCoder - Tail of Snake</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Formally, we have to compute the value of the expression:
$$\max_{1 \le l < r < N}\left(\sum_{i=1}^lA_i + \sum_{i=l+1}^rB_i + \sum_{i=r+1}^NC_i\right)$$

Build the prefix sum arrays $\text{pre1}$, $\text{pre2}$, $\text{pre3}$ of the arrays $A$, $B$, $C$ respectively. Now we can rewrite the expression as:

$$
\begin{aligned}
& \max_{1 \le l < r < N}\left(\text{pre1}_l + \text{pre2}_r - \text{pre2}_l + \text{pre3}_N - \text{pre3}_r\right) \\[6pt]
=\; & \max_{2 \le r < N}\left(\text{pre3}_N + \text{pre2}_r - \text{pre3}_r + \max_{1 \le l < r}\left(\text{pre1}_l-\text{pre2}_l\right)\right)
\end{aligned}
$$

To compute this, we can iterate on $r$ from $2$ to $N-1$ and keep track of $\displaystyle \max_{1 \le l < r}\left(\text{pre1}_l-\text{pre2}_l\right)$.<br><br>

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

signed main() {
    fastio()

    int n;
    cin >> n;

    vector<int> pre1(n + 1), pre2(n + 1), pre3(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> pre1[i];
        pre1[i] += pre1[i - 1];
    }
    for (int i = 1; i <= n; i++) {
        cin >> pre2[i];
        pre2[i] += pre2[i - 1];
    }
    for (int i = 1; i <= n; i++) {
        cin >> pre3[i];
        pre3[i] += pre3[i - 1];
    }

    int ans = 0, mx = pre1[1] - pre2[1];
    for (int r = 2; r < n; r++) {
        ans = max(ans, pre3[n] + pre2[r] - pre3[r] + mx);
        mx = max(mx, pre1[r] - pre2[r]);
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/abc356/tasks/abc356_e" target="_blank">AtCoder - Max/Min</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{pre}_i = \sum_{\substack{j=1 \\[3pt] A_j \le i}}^N1$: the number of integers $\le i$ present in the array $A$, $\quad \forall \; 1 \le i \le M$ where $M = 10^6$.</li>
    <li>$\text{freq}_i = \text{pre}_i - \text{pre}_{i-1}$: the number of times integer $i$ is present in the array $A$, $\quad \forall \; 1 \le i \le M$.</li>
</ul><br>

Using the <b>Contribution Technique</b>, we can rewrite the given expression as:

$$
\sum_{i=1}^M{\text{freq}_i\cdot \sum_{j=i+1}^M\left\lfloor \frac{j}{i} \right\rfloor} + \sum_{i=1}^M\left(\begin{array}{cc} \text{freq}_i \\ 2 \\  \end{array}\right)
$$

Using the <b>Contribution Technique</b> again, we can rewrite the given expression as:

$$
\begin{aligned}
& \sum_{i=1}^M{\text{freq}_i\cdot \sum_{k=1}^{\left\lfloor \frac{M}{i} \right\rfloor}\sum_{\substack{j=i+1 \\[3pt] \left\lfloor \frac{j}{i} \right\rfloor = k}}^Mk} + \sum_{i=1}^M\left(\begin{array}{cc} \text{freq}_i \\ 2 \\  \end{array}\right) \\[6pt]
=\; & \sum_{i=1}^M{\text{freq}_i\cdot \sum_{k=1}^{\left\lfloor \frac{M}{i} \right\rfloor}{k \cdot \sum_{\substack{j=i+1 \\[3pt] \left\lfloor \frac{j}{i} \right\rfloor = k}}^M1}} + \sum_{i=1}^M\left(\begin{array}{cc} \text{freq}_i \\ 2 \\  \end{array}\right)
\end{aligned}
$$

We can simplify the floor condition as:

$$
\left\lfloor \frac{j}{i} \right\rfloor = k \quad \Rightarrow k \le \frac{j}{i} < k+1 \quad \Rightarrow i\cdot k \le j \le i\cdot (k+1) - 1
$$

Thus, for the innermost summation, we have the following two inequalities for $j$:

$$
\begin{aligned}
& i+1 \le j \le M \\[6pt]
& i\cdot k \le j \le i\cdot (k+1) - 1
\end{aligned}
$$

Combining these inequalities gives:
$$\max(i+1,i\cdot k) \le j \le \min(M,i\cdot (k+1)-1)$$

Let us define:

<ul>
    <li>$l_{i,k} = \max(i+1,i\cdot k), \quad \forall \; 1 \le i \le M, 1 \le k \le \left\lfloor \frac{M}{i} \right\rfloor$</li>
    <li>$r_{i,k} = \min(M,i\cdot (k+1)-1), \quad \forall \; 1 \le i \le M, 1 \le k \le \left\lfloor \frac{M}{i} \right\rfloor$</li>
</ul><br>

We can rewrite the given expression as:

$$
\begin{aligned}
& \sum_{i=1}^M{\text{freq}_i\cdot \sum_{k=1}^{\left\lfloor \frac{M}{i} \right\rfloor}{k \cdot \sum_{j = l_{i,k}}^{r_{i,k}}1}} + \sum_{i=1}^M\left(\begin{array}{cc} \text{freq}_i \\ 2 \\  \end{array}\right) \\[6pt]
=\; & \sum_{i=1}^M{\text{freq}_i\cdot \sum_{k=1}^{\left\lfloor \frac{M}{i} \right\rfloor}{k \cdot \left(\text{pre}_{r_{i,k}} - \text{pre}_{l_{i,k}-1}\right)}} + \sum_{i=1}^M\left(\begin{array}{cc} \text{freq}_i \\ 2 \\  \end{array}\right)
\end{aligned}
$$

which can be computed in the given time limit as $\displaystyle \sum_{i=1}^M{\left\lfloor \frac{M}{i} \right\rfloor} = O(M \log M)$.<br><br>

<b>Time Complexity:</b> $O(N + M\log M)$

</div>
</details>
<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

const int M = (int)1e6;

signed main() {
    fastio()

    int N;
    cin >> N;

    vector<int> pre(M + 1);
    for (int i = 1; i <= N; i++) {
        int x;
        cin >> x;
        pre[x]++;
    }

    for (int i = 1; i <= M; i++)
        pre[i] += pre[i - 1];

    int ans = 0;
    for (int i = 1; i <= M; i++) {
        int freq = pre[i] - pre[i - 1];
        if(!freq)
            continue;

        for (int k = 1; k <= M / i; k++) {
            int l = max(i + 1, i * k), r = min(M, i * (k + 1) - 1);
            ans += freq * k * (pre[r] - pre[l - 1]);
        }

        ans += (freq * (freq - 1)) / 2;
    }

    cout << ans << endl;

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/abc158/tasks/abc158_e" target="_blank">AtCoder - Divisible Substring</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int n, p;
    cin >> n >> p;

    string s;
    cin >> s;

    if (p == 2 || p == 5) {
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int d = s[i] - '0';
            if (p == 2 && d % 2 == 0)
                ans += i + 1;
            if (p == 5 && (d == 0 || d == 5))
                ans += i + 1;
        }

        cout << ans << endl;
    }

    else {
        vector<int> freq(p);
        freq[0] = 1;

        int ans = 0, suf = 0, pw = 1;
        for (int i = n - 1; i >= 0; i--) {
            int d = s[i] - '0';
            suf = (suf + pw * d) % p;
            ans += freq[suf];
            freq[suf]++, pw = (pw * 10) % p;
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://codeforces.com/problemset/problem/835/C" target="_blank">Codeforces - Star Sky</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{val}_{t,i,j} = \sum_{\substack{k=1 \\[3pt] 1 \le x_k \le i \\[3pt] 1 \le y_k \le j}}^n{s_{k,t}}$: the total brightness of stars lying in the rectangle defined by $(1,1)$ and $(i,j)$ at moment $t$, $\quad \forall \; 0 \le t \le c, 1 \le i,j \le N$ where $N = 10^2$.</li>
</ul><br>

where $s_{k,t}$ denotes the brightness of the $k^{th}$ star at moment $t$, and is equal to $(s_k + t) \bmod (c+1)$.<br><br>

Thus, we can build the $\text{val}$ array as follows:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every star $(x_i, y_i, s_i)$, update $\text{val}_{t,x_i,y_i} \gets \text{val}_{t,x_i,y_i} + (s_i+t) \bmod (c+1), \quad \forall \; 0 \le t \le c$</li>
    <li>Replace the $\text{val}$ array with its prefix sum array.</li>
</ul><br>

First update $t_i \gets t_i \bmod (c + 1)$, then the total brightness of stars lying in the rectangle defined by $(x_{1i},y_{1i})$ and $(x_{2i},y_{2i})$ at moment $t_i$ is given by:
$$\text{pre}_{t_i,x_{2i},y_{2i}} - \text{pre}_{t_i,x_{1i}-1,y_{2i}} - \text{pre}_{t_i,x_{2i},y_{1i}-1} + \text{pre}_{t_i,x_{1i}-1,y_{1i}-1}$$

<b>Time Complexity:</b> $O(c \cdot N^2 + q)$

</div>
</details>
<details>
<summary data-type="code">Code (C++)</summary>

<pre class="spoiler-code"><code class="cpp"><script type="text/plain">#include <bits/stdc++.h>
#define int long long int
#define endl "\n"
#define fastio() ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(__null);

using namespace std;

const int N = 100;

signed main() {
    fastio()

    int n, q, c;
    cin >> n >> q >> c;

    vector val(c + 1, vector(N + 1, vector<int>(N + 1)));
    for (int i = 1; i <= n; i++) {
        int x, y, s;
        cin >> x >> y >> s;
        for (int t = 0; t <= c; t++)
            val[t][x][y] += (s + t) % (c + 1);
    }

    for (int t = 0; t <= c; t++)
        for (int i = 1; i <= N; i++)
            for (int j = 1; j <= N; j++)
                val[t][i][j] += val[t][i - 1][j] + val[t][i][j - 1] - val[t][i - 1][j - 1];

    auto query = [&](int t, int x1, int y1, int x2, int y2) {
        return val[t][x2][y2] - val[t][x1 - 1][y2] - val[t][x2][y1 - 1] + val[t][x1 - 1][y1 - 1];
    };

    for (int i = 1; i <= q; i++) {
        int t, x1, y1, x2, y2;
        cin >> t >> x1 >> y1 >> x2 >> y2;
        cout << query(t % (c + 1), x1, y1, x2, y2) << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://atcoder.jp/contests/abc410/tasks/abc410_f" target="_blank">AtCoder - Balanced Rectangles</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
To be added.
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

    int t;
    cin >> t;

    while (t--) {
        int n, m;
        cin >> n >> m;

        vector a(n, vector<char>(m));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                cin >> a[i][j];

        auto transpose = [&]() {
            vector tr(m, vector<char>(n));
            for (int i = 0; i < n; i++)
                for (int j = 0; j < m; j++)
                    tr[j][i] = a[i][j];
            swap(a, tr), swap(n, m);
        };

        if (n > m) transpose();

        int ans = 0;
        vector<int> freq(2 * n * m + 1);
        for (int i = 0; i < n; i++) {
            vector<int> sum(m);
            for (int j = i; j < n; j++) {
                int pre = n * m;
                freq[pre] = 1;

                for (int k = 0; k < m; k++) {
                    sum[k] += (a[j][k] == '.' ? 1 : -1);
                    pre += sum[k], ans += freq[pre];
                    freq[pre]++;
                }

                pre = n * m;
                for (int k = 0; k < m; k++)
                    pre += sum[k], freq[pre]--;
            }
        }

        cout << ans << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
<li>
<a href="https://www.codechef.com/problems/CENS20A" target="_blank">CodeChef - Cherry and Bits</a>
<button class="solution-toggle-btn" onclick="toggleSolution(this)">Show Solution</button>
<div class="practice-solution-container" style="display: none;">
<details>
<summary data-type="solution">Solution</summary>
<div class="spoiler-content">
Let us define:
<ul>
    <li>$\displaystyle \text{val}_{i,j} = \bigoplus_{\substack{k=1 \\[3pt] x_{1k} \le i \le x_{2k} \\[3pt] y_{1k} \le j \le y_{2k}}}^q1$: the value of $a_{i,j}$ after all $q$ queries assuming that $a_{i,j} = 0$ initially, $\quad \forall \; 1 \le i \le n, 1 \le j \le m$.</li>
</ul><br>

To efficiently build the the $\text{val}$ array, follow the steps:

<ul>
    <li>Initialize with all zeros.</li>
    <li>For every query $x_{1i},y_{1i},x_{2i},y_{2i}$, update:
        <ul>
            <li>$\text{val}_{x_{1i},y_{1i}} \gets \text{val}_{x_{1i},y_{1i}} \oplus 1$</li>
            <li>$\text{val}_{x_{1i},y_{2i}+1} \gets \text{val}_{x_{1i},y_{2i}+1} \oplus 1$</li>
            <li>$\text{val}_{x_{2i}+1,y_{1i}} \gets \text{val}_{x_{2i}+1,y_{1i}} \oplus 1$</li>
            <li>$\text{val}_{x_{2i}+1,y_{2i}+1} \gets \text{val}_{x_{2i}+1,y_{2i}+1} \oplus 1$</li>
        </ul>
    </li>
    <li>After processing all the queries, replace $\text{val}$ array by its prefix xor array.</li>
</ul><br>

After all $q$ queries, the value at cell $(i,j)$ is given by $a_{i,j} \oplus \text{val}_{i,j}$.<br><br>

<b>Time Complexity:</b> $O(n\cdot m + q)$

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

    int n, m;
    cin >> n >> m;

    vector a(n + 1, vector<int>(m + 1));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            char c;
            cin >> c;
            a[i][j] = (c == '1');
        }
    }

    int q;
    cin >> q;

    vector val(n + 2, vector<int>(m + 2));
    while (q--) {
        int x1, y1, x2, y2;
        cin >> x1 >> y1 >> x2 >> y2;

        val[x1][y1] ^= 1;
        val[x1][y2 + 1] ^= 1;
        val[x2 + 1][y1] ^= 1;
        val[x2 + 1][y2 + 1] ^= 1;
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            val[i][j] ^= val[i - 1][j] ^ val[i][j - 1] ^ val[i - 1][j - 1];
            cout << (a[i][j] ^ val[i][j]);
        }
        cout << endl;
    }

    return 0;
}
</script></code></pre>
</details>
</div>
</li>
</ul>
