# Formulas - "the math under the hood"

## Voting ##
- [Vote Score Formula](#vote-score-formula)
- [Voting Win Formula](#voting-win-formula)
- [Voting Cycle Formula](#voting-cycle-formula)

## Elections ##
- [Election Winner(s) Formula](#elections-winner-formula)

## Content Check Quiz ##
- [Content Complete Formula](#content-complete-formula)

## Roles ##
- [Citizenship Application Formula](#citizenship-application-formula)
- [Citizenship Grant/Revoke Formula](#citizenship-grant-revoke-formula)
- [Administrator Role Grant/Revoke Formula](#administrator-role-grant-revoke-formula)


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

**Example 1:**
You read the voting content and you read 2 pro article and 1 con article and the related responses then your voting score will be like:

**calculation:**
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



## <div id="voting-win-formula">Voting Win Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**


## <div id="voting-cycle-formula">Voting Cycle Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**

## <div id="elections-winner-formula">Election Winner(s) Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**


## <div id="content-complete-formula">Content Complete Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**

## <div id="citizenship-application-formula">Citizenship Application Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**


## <div id="citizenship-grant-revoke-formula">Citizenship Grant/Revoke Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**

## <div id="citizenship-grant-revoke-formula">Citizenship Grant/Revoke Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**


## <div id="administrator-role-grant-revoke-formula">Administrator Role Grant/Revoke Formula</div>

### Formula:

### Explanation:

**Example 1:**

**Calculation:**

**Example 2:**

**Calculation:**