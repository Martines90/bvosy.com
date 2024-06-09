# Formulas - "the math under the hood"

<span class=™nav-menu™>

## Voting ##
- [Vote Score Formula](#vote-score-formula)
- [Voting Win Formula](#voting-win-formula)
- [Voting Cycle Formula](#voting-cycle-formula)

## Elections ##
- [Election Winner(s) Formula](#elections-winner-formula)

</span>

## <div id="vote-score-formula">(balanced) Vote Score Formula</div>

### Formula:

The weight of a vote calculated the following way:

- \(sa\) = number of supportive articles read
- \(oa\) = number of opposing articles read
- \(sc\) = comments made on supportive articles read
- \(oc\) = comments made on opposing articles read

The **Voting Score** is calculated with the formula: 

$$\text{Voting Score} = 5 + \frac{(sa + oa - |sa - oa|)}{2} \times 25 + |sa - oa| \times 5 + \frac{(sc + oc - |sc - oc|)}{2} \times 10 + |sc - oc| \times 2 $$

### Explanation:

Voters have one vote / voting, but the value of their vote depends on the following factors:
- the voting content read (it is the minimum criteria to be eligible to vote)
- the amount of voting related articles (assigned by political actors) they read
- the ratio of pro/con articles
- the amount of article related responses they read


Let's see some examples, how a voter voting score can vary depending on the above applied formula.

<details>
    <summary>Examples</summary>

**Example 1:**

You read the voting content and you read 2 pro article and 1 con article and the related responses then your voting score will be like:

**Calculation:**
$$\text{Voting Score} = $$
$$ 5 \text{(for the reading of the voting content)} $$
$$ + 5 * 5 \text{(for the reading of 1-1 pro and con article)} $$
$$ + 5 \text{(for the reading one more pro article)} $$
$$ + 3 + 3 + 3 \text{(all the 3 responses on the articles)} = 44. $$

**Example 2:**

You read the voting content and you read 4 con articles and one response related to them.

**Calculation:**
$$\text{Voting Score} = $$
$$ 5 \text{(for the reading of the voting content)} $$
$$ + 5 + 5 + 5 + 5 \text{(for the individual con articles)} $$
$$ + 3 \text{(for the one read response)} = 28. $$


**Example 3:**

You read the voting content and you read 2 con and 2 pro articles and all the related responses to them.

**Calculation:**
$$\text{Voting Score} = $$
$$ 5 \text{(for the reading of the voting content)} $$
$$ + 5 * 5 + 5 * 5 \text{(for the 2-2 pro and con articles)} $$
$$ + 3 + 3 + 3 + 3 \text{(for all the responses)} = 67. $$

</details>


## <div id="voting-win-formula">Voting Win Formula</div>

### Formula:

1# voting is valid if:

$$ \text{number of votes} > \text{10\% of CITIZENS} $$

2# Voting win if:

$$ \text{Total amount of voting score on A (yes)} > \text{Total amount of voting score on B (no)} $$


### Explanation:

First the system checks if the total number of votes on the actual finished voting is more than the 10% of the total amount of CITIZENS

<details>
    <summary>Examples</summary>
**Example 1:**

Total number of citizens: 121

- 23 "yes" vote.
- Total "yes" vote score is 1125

- 25 "no" vote
- Total "no" vote score is 985 (This can happen in the case if voters read less articles/responses related to the voting)

**Result:**

- Voting is valid
$$ 23 + 25 > 121 * 0.1 $$

- "yes" vote win
$$ 1125 > 985 $$

**Example 2:**

Total number of citizens: 138651

- 5611 "yes" vote.
- Total "yes" vote score is 89340

- 1103 "no" vote
- Total "no" vote score is 22655

**Result:**

- Voting is invalid
$$ 89340 + 22655 < 138651 * 0.1 $$

</details>

## <div id="voting-cycle-formula">Voting Cycle Formula</div>

### Formula:

$$ \text{Voting cycle count} = \text{Days passed since first voting cycle start date} / 30 $$

### Explanation:

The system divides with 30 days the amount of time passed since the defined first voting cycle start date.

<details>
    <summary>Examples</summary>

**Example 1:**

$$ \text{First voting cycle start date} = 2024.01.01 $$
$$ \text{Present date} = 2026.08.13 $$

$$ \text{Days passed between 2024.01.01 and 2026.08.13} = 955 $$

$$ 955 / 30 = 31. $$

So the actual voting cycle is the 31th one.

</details>

## <div id="elections-winner-formula">Election Winner(s) Formula</div>

### Formula:


$$ \text{Minimum requirement check}: \text{number of votes} > \text{total votes} * 0.1 $$

$$ \text{Credit calculation formula}: \text{number of votes} / \text{total votes} * 10 $$


### Explanation:

The minimum requirement to be elected is to own at least 10% of the total votes. +1 more credit can be gained after every 10% of th owned votes.

<details>
    <summary>Examples</summary>

**Example 1:**

Candidate 1: 133 vote
Candidate 2: 47 vote
Candidate 3: 455 vote

Candidate 1 will gain 
Candidate 2 will not get elected.

**Calculation:**

$$ \text{Total votes}: 133 + 47 + 455 = 635 $$

<br />

$$ \text{Candidate 1 \% of votes}: 133 / 635 * 100 = 20,9\% $$

$$ \text{Candidate 2 \% of votes}: 47 / 635 * 100 = 7,4\% $$

$$ \text{Candidate 3 \% of votes}: 455 / 635 * 100 = 71,6\% $$

<br />

$$ \text{Candidate 1 credits}: 20,9 / 10 = 2 $$
$$ \text{Candidate 3 credits}: 71,6 / 10 = 7 $$

</details>
