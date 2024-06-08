# BVS Smart Contract

**Blockchain network:** Solana<br>
**Solidity version:** 0.8.9<br>
**Source code:** [Github link](https://github.com/Martines90/bvs-v0)

### 1. Functions

1.1 Roles
- [constructor](#constructor)
- [checkIfAccountHasRole](#checkIfAccountHasRole)
- [_checkRole](#_checkRole)
- [applyForCitizenshipRole](#applyForCitizenshipRole)
- [grantCitizenRole](#grantCitizenRole)
- [hasRole](#hasRole)
- [revokeAdminRoleApproval](#revokeAdminRoleApproval)
- [_revokeAdminRoleApproval](#_revokeAdminRoleApproval)
- [_revokeRole](#_revokeRole)
- [_setupRole](#_setupRole)
- [sendGrantAdministratorRoleApproval](#sendGrantAdministratorRoleApproval)

1.2 Update/add:
- [addUpdateContact](#addUpdateContact)
- [updateCitizenshipApplicationFee](#updateCitizenshipApplicationFee)
- [updateElectionsApplicationFee](#updateElectionsApplicationFee)

1.3 Elections:
- [scheduleNextElections](#scheduleNextElections)
- [applyForElections](#applyForElections)
- [voteOnElections](#voteOnElections)
- [closeElections](#closeElections)

1.4 Voting:
- [voting](#voting)

1.5 General:
- [getAdminsSize](#getAdminsSize)
- [getCitizensSize](#getCitizensSize)
- [getPoliticalActorsSize](#getPoliticalActorsSize)

1.6 Helpers
- [isEmptyString](#isEmptyString)


### 2. Validators (modifier)

2.1 Roles
- [onlyRole](#onlyRole)
- [minCitizenshipApplicationFeeCovered](#minCitizenshipApplicationFeeCovered)
- [appliedForCitizenRole](#appliedForCitizenRole)
- [hasRoleToModify](#hasRoleToModify)
- [hasCitizenRoleGrantCredit](#hasCitizenRoleGrantCredit)
- [adminRoleGrantApprovalNotSent](#adminRoleGrantApprovalNotSent)


2.2 Elections
- [noUnclosedElections](#noUnclosedElections)
- [validApplication](#validApplication)
- [newElectionsStartDateIs30DaysAhead](#newElectionsStartDateIs30DaysAhead)
- [validVote](#validVote)
- [canCloseElections](#canCloseElections)
- [minCandidateApplicationFeeCovered](#minCandidateApplicationFeeCovered)


2.3 Voting
- [criticisedArticleRelatedToYourVoting](#criticisedArticleRelatedToYourVoting)
- [approveAttempt3DaysBeforeVotingStarts](#approveAttempt3DaysBeforeVotingStarts)
- [contentCheckQuizCompleted](#contentCheckQuizCompleted)
- [criticisedArticleRelatedToYourVoting](#criticisedArticleRelatedToYourVoting)
- [creatorOfVotingRespondedOnArticles](#creatorOfVotingRespondedOnArticles)
- [enoughVotesArrived](#enoughVotesArrived)
- [firstVotingCycleStartDateIsInTheFuture](#firstVotingCycleStartDateIsInTheFuture)
- [newVotingScheduledAtLeast10daysAhead](#newVotingScheduledAtLeast10daysAhead)
- [notVotedYetOnThisVoting](#notVotedYetOnThisVoting)
- [newVotingScheduledMaximum30daysAhead](#newVotingScheduledMaximum30daysAhead)
- [votingApproved](#votingApproved)
- [votingBelongsToSender](#votingBelongsToSender)
- [votingContentQuizIpfsAssigned](#votingContentQuizIpfsAssigned)
- [votingExists](#votingExists)
- [votingIsOngoing](#votingIsOngoing)
- [votingNotFinished](#votingNotFinished)
- [votingNotYetStarted](#votingNotYetStarted)
- [votingPeriodIsActive](#votingPeriodIsActive)
- [votingWon](#votingWon)

2.4 Content
- [articleShouldExists](#articleShouldExists)
- [enoughContentReadQuizAnswerAdded](#enoughContentReadQuizAnswerAdded)
- [hasArticleContentIpfsHashAssigned](#hasArticleContentIpfsHashAssigned)
- [hasArticleResponseAssigned](#hasArticleResponseAssigned)
- [hasArticleResponseContentCheckIpfsHash](#hasArticleResponseContentCheckIpfsHash)
- [hasCreditsLeftToPublishArticle](#hasCreditsLeftToPublishArticle)

### 3. Global variables

3.1 Roles:
- [ADMINISTRATOR](#ADMINISTRATOR)
- [POLITICAL_ACTOR](#POLITICAL_ACTOR)
- [CITIZEN](#CITIZEN)

3.2 Constants:
- [APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT](#APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT)
- [CONTENT_CHECK_ASKED_NUM_OF_QUESTIONS](#CONTENT_CHECK_ASKED_NUM_OF_QUESTIONS)
- [ELECTION_START_END_INTERVAL](#ELECTION_START_END_INTERVAL)
- [MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE](#MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE)
- [MIN_VOTE_SCORE](#MIN_VOTE_SCORE)
- [MINIMUM_PERCENTAGE_OF_ELECTION_VOTES](#MINIMUM_PERCENTAGE_OF_ELECTION_VOTES)
- [MIN_PERCENTAGE_OF_VOTES](#MIN_PERCENTAGE_OF_VOTES)
- [MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED](#MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED)
- [MIN_TOTAL_CONTENT_READ_CHECK_ANSWER](#MIN_TOTAL_CONTENT_READ_CHECK_ANSWER)
- [NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME](#NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME)
- [VOTING_CYCLE_INTERVAL](#VOTING_CYCLE_INTERVAL)
- [VOTING_DURATION](#VOTING_DURATION)

3.3 General:
- [citizenRoleApplicationFee](#citizenRoleApplicationFee)
- [electionsCandidateApplicationFee](#electionsCandidateApplicationFee)
- [firstVotingCycleStartDate](#firstVotingCycleStartDate)


# Functions

## Functions > Roles


### <div id="constructor">constructor</div>
```solidity
constructor() {
    admins.push(msg.sender);
    adminRoleGrantApprovals[msg.sender] = 1;
    citizens.push(msg.sender);
    creationDate = block.timestamp;
    _setupRole(ADMINISTRATOR, msg.sender);
    _setupRole(CITIZEN, msg.sender);
}
```
Assigns deployer account the following roles (**CITIZEN**, **ADMININSTRATOR**) and declares creation date.

### <div id="checkIfAccountHasRole">checkIfAccountHasRole</div>
input props:
- _account: account address
- _role: specific role byte value

```solidity
function checkIfAccountHasRole(
    address _account,
    bytes32 _role
) public view returns (bool) {
    return hasRole(_role, _account);
}
```
Checks if account has the specified role.


### <div id="_checkRole">_checkRole</div>
input props:
- role: specific role byte value
- account: account address

```solidity
function _checkRole(bytes32 role, address account) internal view virtual {
    if (!_hasRole[role][account]) {
        revert PermissionsUnauthorizedAccount(account, role);
    }
}
```
Checks if account has the specified role.


### <div id="applyForCitizenshipRole">applyForCitizenshipRole</div>

input props:
- **_emailPublicKeyCombinedHash**: the unique hash generated from the account personal data for later identification.

validation checks:
- minCitizenshipApplicationFeeCovered: checks if transaction value bigger than the application fee
```solidity
function applyForCitizenshipRole(
    bytes32 _emailPublicKeyCombinedHash
) public payable minCitizenshipApplicationFeeCovered {
    citizenshipApplications[msg.sender] = _emailPublicKeyCombinedHash;
}
```
Registers user citizenship application.

### <div id="grantCitizenRole">grantCitizenRole</div>
input props:
- **_account**: address of a non **CITIZEN**, who applied for citizenship
- **_emailPublicKeyHash**: the generated hash from the applicant personal data
- **_revokeCitizenRole**: it decides if revoke or grant action takes place.

validation checks:
- only **ADMINISTRATOR** role can call
- **hasRoleToModify**: account has a role to remove or not has any role (in grant case).
- **hasCitizenRoleGrantCredit**: **ADMINISTRATOR** has account role modify credits left for the day.
- **appliedForCitizenRole**: account completed the citizenship role application step.

```solidity
function grantCitizenRole(
    address _account,
    bytes32 _emailPublicKeyHash,
    bool _revokeCitizenRole
)
    public
    onlyRole(ADMINISTRATOR)
    hasRoleToModify(_account, _revokeCitizenRole)
    hasCitizenRoleGrantCredit
    appliedForCitizenRole(_account, _emailPublicKeyHash, _revokeCitizenRole)
{
    uint daysPassed = (block.timestamp - creationDate) / 60 / 60 / 24;
    dailyCitizenRoleModifyCredit[msg.sender][daysPassed]++;
    if (!_revokeCitizenRole) {
        _setupRole(CITIZEN, _account);
        citizens.push(_account);
        delete citizenshipApplications[_account];
    } else {
        if (hasRole(CITIZEN, _account)) {
            _revokeRole(CITIZEN, _account);
        }
        delete citizenshipApplications[_account];
        for (uint i; i < citizens.length; i++) {
            if (citizens[i] == _account) {
                delete citizens[i];
                break;
            }
        }
    }
}
```
Grants or revokes citizen role

### <div id="hasRole">hasRole</div>
input props:
- role: specific role bytes value
- account: account address

```solidity
function hasRole(bytes32 role, address account) public view returns (bool) {
    return _hasRole[role][account];
}
```

### <div id="revokeAdminRoleApproval">revokeAdminRoleApproval</div>
input props:
- revokedAccount: **ADMINISTRATOR** account address

validation checks:
- has **ADMINISTRATOR** role
```solidity
function revokeAdminRoleApproval(
    address revokedAccount
) public onlyRole(ADMINISTRATOR) {
    _revokeAdminRoleApproval(msg.sender, revokedAccount);
}
```
Revokes admin role approval.

### <div id="_revokeAdminRoleApproval">_revokeAdminRoleApproval</div>
input props:
- admin: **ADMINISTRATOR** account address
- revokedAccount:  **ADMINISTRATOR** account address

```solidity
function _revokeAdminRoleApproval(
    address admin,
    address revokedAccount
) internal {
    for (uint i = 0; i < adminApprovalSentToAccount[admin].length; i++) {
        if (adminApprovalSentToAccount[admin][i] == revokedAccount) {
            delete adminApprovalSentToAccount[admin][i];
            adminRoleGrantApprovals[revokedAccount]--;
            if (
                (adminRoleGrantApprovals[revokedAccount] * 1000) /
                    admins.length <
                MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED * 10
            ) {
                adminRoleGrantApprovals[revokedAccount]--;
                _revokeRole(ADMINISTRATOR, revokedAccount);
                for (uint u = 0; u < admins.length; u++) {
                    if (admins[u] == revokedAccount) {
                        delete admins[u];
                        admins[u] = admins[admins.length - 1];
                        admins.pop();
                        break;
                    }
                }
                // make sure all the other admins get revoked their approval receieved from this admin
                for (
                    uint k = 0;
                    k < adminApprovalSentToAccount[revokedAccount].length;
                    k++
                ) {
                    _revokeAdminRoleApproval(
                        revokedAccount,
                        adminApprovalSentToAccount[revokedAccount][k]
                    );
                    delete adminApprovalSentToAccount[revokedAccount][k];
                }
                break;
            }
        }
    }
}
```
**ADMINISTRATOR** can add admin role revoke approval. If the number of approvals bigger than 50% then admin role also get revoked.


### <div id="_revokeRole">_revokeRole</div>
input props:
- role: specific role bytes value
- account: account address
```solidity
function _revokeRole(bytes32 role, address account) internal virtual {
    _checkRole(role, account);
    delete _hasRole[role][account];
    emit RoleRevoked(role, account, msg.sender);
}
```
Can revoke any kind of role (only other functions can call)

### <div id="_setupRole">_setupRole</div>
input props:
- role: specific role bytes value
- account: account address
```solidity
function _setupRole(bytes32 role, address account) internal virtual {
    _hasRole[role][account] = true;
    emit RoleGranted(role, account, msg.sender);
}
```
Can grant any kind of role (only other functions can call)


### <div id="sendGrantAdministratorRoleApproval">sendGrantAdministratorRoleApproval</div>
input props:
- _account: account address

validation checks:
- has **ADMINISTRATOR** role
- adminRoleGrantApprovalNotSent: Checks if account already sent his grant approval
```solidity
function sendGrantAdministratorRoleApproval(
    address _account
) public onlyRole(ADMINISTRATOR) adminRoleGrantApprovalNotSent(_account) {
    adminApprovalSentToAccount[msg.sender].push(_account);
    adminRoleGrantApprovals[_account]++;

    if (
        admins.length == 0 ||
        (adminRoleGrantApprovals[_account] * 1000) / admins.length >
        MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED * 10
    ) {
        adminRoleGrantApprovals[_account]++;
        // also new admin has to automatically send his approvals to the already existing admins
        for (uint i = 0; i < admins.length; i++) {
            adminApprovalSentToAccount[_account].push(admins[i]);
            adminRoleGrantApprovals[admins[i]]++;
        }
        _setupRole(ADMINISTRATOR, _account);
        admins.push(_account);
    }
}
```


## Functions > Update/add global variables:

### <div id="addUpdateContact">addUpdateContact</div>
input props: 
- contactKey (refers to the value stored in **contacts** array)
- contactAddress (the value stored in the **contacts** array)

pre execution checks:
- has **ADMINISTRATOR** role

```solidity
function addUpdateContact(
    string memory contactKey,
    string memory contactAddress
) public onlyRole(ADMINISTRATOR) {
    if (isEmptyString(contacts[contactKey])) {
        contactKeys.push(contactKey);
    }
    contacts[contactKey] = contactAddress;
}
```

By calling **addUpdateContact** user can add any kind of new email/phone/website url/ etc contacts.

### <div id="updateCitizenshipApplicationFee">updateCitizenshipApplicationFee</div>

input props:
- _newCitizenshipApplicationFee (the new **citizenRoleApplicationFee**)

pre execution checks:
- has **ADMINISTRATOR** role

```solidity
function updateCitizenshipApplicationFee(
    uint _newCitizenshipApplicationFee
) public onlyRole(ADMINISTRATOR) {
    citizenRoleApplicationFee = _newCitizenshipApplicationFee;
}
```

By calling **updateCitizenshipApplicationFee** user can update the value of the citizenship application fee.

### <div id="updateElectionsApplicationFee">updateElectionsApplicationFee</div>

input props:
- _newElectionsApplicationFee (the new **electionsCandidateApplicationFee**)

pre execution checks:
- has **ADMINISTRATOR** role

```solidity
function updateElectionsApplicationFee(
    uint _newElectionsApplicationFee
) public onlyRole(ADMINISTRATOR) {
    electionsCandidateApplicationFee = _newElectionsApplicationFee;
}
```

By calling **updateElectionsApplicationFee** user can update the value of the elections candidate application fee.

## Functions > Elections

### <div id="scheduleNextElections">scheduleNextElections</div>

input props:
- _electionsStartDate (the date (*timestamp) when the next elections starts)
- _electionsEndDate (the date (*timestamp) when the next election ends)

pre execution checks:
- has **ADMINISTRATOR** role
- **noUnclosedElections**: checks if there is any ongoing elections
- **newElectionsStartDateIs30DaysAhead**: start date is ahead at least 30 days

```solidity
function scheduleNextElections(
    uint256 _electionsStartDate,
    uint256 _electionsEndDate
)
    public
    onlyRole(ADMINISTRATOR)
    noUnclosedElections
    newElectionsStartDateIs30DaysAhead(_electionsStartDate)
{
    electionsStartDate = _electionsStartDate;
    electionsEndDate = _electionsEndDate;

    for (uint i = 0; i < politicalActors.length; i++) {
        _revokeRole(POLITICAL_ACTOR, politicalActors[i]);
        delete politicalActorVotingCredits[politicalActors[i]];
        delete politicalActors[i];
    }
    politicalActors = new address[](0);
}
```

By calling **scheduleNextElections** function user can schedule the next upcoming elections. Also when next elections scheduled, then all the **POLITICAL_ACTOR** roles get revoked and the stored political actor wallet keys and their voting credits will get deleted.

### <div id="applyForElections">applyForElections</div>

pre execution checks:
- has **CITIZEN** role
- **minCandidateApplicationFeeCovered**: the application fee covered by the transaction value
- **validApplication**: the application is 

```solidity
function applyForElections()
    public
    payable
    onlyRole(CITIZEN)
    minCandidateApplicationFeeCovered
    validApplication
{
    electionCandidates.push(msg.sender);
    electionCandidateScores[msg.sender] = 1;
}
```

### <div id="voteOnElections">applyForElections</div>
input props:
- voteOnAddress (the address of the candidate **CITIZEN** votes)

pre execution checks:
- has **CITIZEN** role
- **validVote**: checks if vote is valid

```solidity
function voteOnElections(
    address voteOnAddress
) public onlyRole(CITIZEN) validVote(voteOnAddress) {
    electionVotes[msg.sender] = voteOnAddress;
    electionVoters.push(msg.sender);
    electionCandidateScores[voteOnAddress]++;
}
```

### <div id="closeElections">closeElections</div>
pre execution checks:
- has **ADMINISTRATOR** role
- **canCloseElections**: checks if elections end date passed

```solidity
function closeElections() public onlyRole(ADMINISTRATOR) canCloseElections {
    // assign roles to the winners
    uint256 totalVotes = electionVoters.length;
    for (uint i = 0; i < electionCandidates.length; i++) {
        uint256 votesOwnedPercentage = ((electionCandidateScores[
            electionCandidates[i]
        ] - 1) * 1000) / totalVotes;

        if (votesOwnedPercentage > MINIMUM_PERCENTAGE_OF_ELECTION_VOTES) {
            uint256 votingCycleTotalCredit = (votesOwnedPercentage -
                MINIMUM_PERCENTAGE_OF_ELECTION_VOTES *
                10) /
                100 +
                1;

            _setupRole(POLITICAL_ACTOR, electionCandidates[i]);
            politicalActors.push(electionCandidates[i]);
            politicalActorVotingCredits[
                electionCandidates[i]
            ] = votingCycleTotalCredit;
        }

        delete electionCandidateScores[electionCandidates[i]];
    }

    electionCandidates = new address[](0);
    electionVoters = new address[](0);

    electionsStartDate = 0;
}
```
Decides which candidates have enough number of votes and calculates for them the voting and article publishing credits for the voting cycles and also grants for them **POLITICAL_ACTOR** role.

## Functions > Voting



## Functions > General

### <div id="getAdminsSize">getAdminsSize</div>
```solidity
function getAdminsSize() public view returns (uint) {
    return admins.length;
}
```
Returns the number of **ADMINISTRATORS**

### <div id="getCitizensSize">getCitizensSize</div>
```solidity
function getCitizensSize() public view returns (uint) {
    return citizens.length;
}
```
Returns the number of **CITIZENS**

### <div id="getPoliticalActorsSize">getPoliticalActorsSize</div>
```solidity
function getPoliticalActorsSize() public view returns (uint) {
    return politicalActors.length;
}
```
Returns the number of **POLITICAL_ACTORS**

## Functions > helpers

### <div id="isEmptyString">isEmptyString</div>
input props:
- _string: any string

```solidity
function isEmptyString(string memory _string) public pure returns (bool) {
    return keccak256(bytes(_string)) == keccak256(bytes(""));
}
```
Checks if string is empty.

# Validators (modifiers)

## Validators > Roles

### <div id="onlyRole">onlyRole</div>

```solidity
modifier onlyRole(bytes32 role) {
    _checkRole(role, msg.sender);
    _;
}
```

Checks if account has the role.

### <div id="minCitizenshipApplicationFeeCovered">minCitizenshipApplicationFeeCovered</div>

```solidity
modifier minCitizenshipApplicationFeeCovered() {
    if (msg.value < citizenRoleApplicationFee) {
        revert MinimumApplicationFeeNotCovered();
    }
    _;
}
```

Checks if transaction value (crypto) is more than the minimum citizenship application fee (**citizenRoleApplicationFee**)

### <div id="appliedForCitizenRole">appliedForCitizenRole</div>

```solidity
modifier appliedForCitizenRole(
    address _account,
    bytes32 _emailPublicKeyHash,
    bool _revokeCitizenRole
) {
    if (
        citizenshipApplications[_account] != _emailPublicKeyHash &&
        !_revokeCitizenRole
    ) {
        revert NotAppliedForCitizenRole();
    }
    _;
}
```
Checks if account not yet applied for citizenship.

### <div id="hasRoleToModify">hasRoleToModify</div>

```solidity
modifier hasRoleToModify(address _account, bool isRevoke) {
    if (!isRevoke && hasRole(CITIZEN, _account))
        revert CitizenRoleAlreadyGranted();
    if (isRevoke && !hasRole(CITIZEN, _account))
        revert CitizenRoleAlreadyRevokedOrNotGranted();
    _;
}
```
Checks account has **CITIZEN** role in revoke case and account has not **CITIZEN** role in grant case.

### <div id="hasCitizenRoleGrantCredit">hasCitizenRoleGrantCredit</div>

```solidity
modifier hasCitizenRoleGrantCredit() {
    uint daysPassed = (block.timestamp - creationDate) / 60 / 60 / 24;

    uint maxCitizensCanBeAddPerAdmin = (citizens.length /
        MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE) / admins.length;
    maxCitizensCanBeAddPerAdmin = maxCitizensCanBeAddPerAdmin > 0
        ? maxCitizensCanBeAddPerAdmin
        : 1;

    if (
        dailyCitizenRoleModifyCredit[msg.sender][daysPassed] >=
        maxCitizensCanBeAddPerAdmin
    ) revert RunOutOfDailyCitizenRoleGrantCredit();
    _;
}
```
Checks if **ADMINISTRATOR** can still grant/revoke **CITIZEN** role by having more role modify credits left for the day.

### <div id="adminRoleGrantApprovalNotSent">adminRoleGrantApprovalNotSent</div>

```solidity
modifier adminRoleGrantApprovalNotSent(address _account) {
    bool adminRoleGrantApprovalAlreadySent = false;
    for (
        uint i = 0;
        i < adminApprovalSentToAccount[msg.sender].length;
        i++
    ) {
        if (adminApprovalSentToAccount[msg.sender][i] == _account) {
            adminRoleGrantApprovalAlreadySent = true;
        }
    }

    if (adminRoleGrantApprovalAlreadySent)
        revert AdminRoleGrantApprovalAlreadySent();
    _;
}
```
Checks if admin role grant already applied on account.

## Validators > Elections

### <div id="noUnclosedElections">noUnclosedElections</div>

```solidity
modifier noUnclosedElections() {
    if (electionsStartDate != 0) {
        revert ThereIsAnOngoingElections();
    }
    _;
}
```

Check if the actual elections closed.

### <div id="validApplication">validApplication</div>

```solidity
modifier validApplication() {
    if (electionsStartDate == 0 || electionsStartDate < block.timestamp) {
        revert ElectionsNotScheduledOrAlreadyStarted();
    } else if (electionCandidateScores[msg.sender] > 0) {
        revert AccountAlreadyAppliedForElections();
    }
    _;
}
```
Checks if there is an scheduled elections and new candidate applicant not applied yet

### <div id="newElectionsStartDateIs30DaysAhead">newElectionsStartDateIs30DaysAhead</div>

```solidity
modifier newElectionsStartDateIs30DaysAhead(uint _electionsStartDate) {
    if (
        _electionsStartDate < block.timestamp + ELECTION_START_END_INTERVAL
    ) {
        revert ElectionStartDateHasToBe30DaysAhead();
    }
    _;
}
```
Checks if the next scheduled elections is 30 days (**ELECTION_START_END_INTERVAL**) ahead from now.

### <div id="validVote">validVote</div>

```solidity
modifier validVote(address _voteOnAddress) {
    if (block.timestamp < electionsStartDate || electionsStartDate == 0) {
        revert ThereIsNoOngoingElections();
    } else if (block.timestamp > electionsEndDate) {
        revert ElectionsAlreadyFinished();
    } else if (msg.sender == _voteOnAddress) {
        revert AccountCantVoteOnItself();
    } else if (electionCandidateScores[_voteOnAddress] == 0) {
        revert VoteOnAccountNotBelongToAnyCandidate();
    } else if (electionVotes[msg.sender] != address(0)) {
        revert AccountAlreadyVoted();
    }
    _;
}
```
Checks if the vote on a candidate from a **CITIZEN** is valid. Elections started and not yet finished. The vote is not goes on him/herself. If the targeted candidate exists. If account not voted already.

### <div id="canCloseElections">canCloseElections</div>

```solidity
modifier canCloseElections() {
    if (electionsStartDate == 0) {
        revert ElectionsAlreadyClosedOrNotYetScheduled();
    } else if (electionsEndDate > block.timestamp) {
        revert ElectionsCanOnlyCloseAfterItsEndDate();
    }
    _;
}
```
Checks if elections can be closed by check if not yet closed and end date is passed.

### <div id="minCandidateApplicationFeeCovered">minCandidateApplicationFeeCovered</div>

```solidity
modifier minCandidateApplicationFeeCovered() {
    if (msg.value < electionsCandidateApplicationFee) {
        revert MinimumApplicationFeeNotCovered();
    }
    _;
}
```
Checks if sent value (crypto) is more than the minimum candidate application fee (**electionsCandidateApplicationFee**).

## Validators > Voting

### <div id="approveAttempt3DaysBeforeVotingStarts">approveAttempt3DaysBeforeVotingStarts</div>

```solidity
modifier approveAttempt3DaysBeforeVotingStarts(bytes32 _votingKey) {
    if (
        votings[_votingKey].startDate -
            APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT >
        block.timestamp
    ) {
        revert VotingCanBeApproved3DaysOrLessBeforeItsStart();
    }
    _;
}
```
Checks if voting approve is in the 3 DAYS before the voting start range.


### <div id="contentCheckQuizCompleted">contentCheckQuizCompleted</div>

```solidity
modifier contentCheckQuizCompleted(bytes32 _votingKey) {
    if (!votes[msg.sender][_votingKey].isContentCompleted) {
        revert VotingContentCheckQuizNotCompleted();
    }
    _;
}
```
Checks if voting content assigned quiz is completed

### <div id="criticisedArticleRelatedToYourVoting">criticisedArticleRelatedToYourVoting</div>
```solidity
 modifier criticisedArticleRelatedToYourVoting(
    bytes32 _votingKey,
    bytes32 _proConArticleKey
) {
    if (
        votings[proConArticles[_votingKey][_proConArticleKey].votingKey]
            .creator != msg.sender
    ) revert ArticleNotRelatedToYourVoting();
    _;
}
```
Checks if the creator related to the article is equal with the account who interacted with the contract

### <div id="creatorOfVotingRespondedOnArticles">creatorOfVotingRespondedOnArticles</div>

```solidity
modifier creatorOfVotingRespondedOnArticles(bytes32 _votingKey) {
    bool isRespondedAllTheCritics = true;
    uint articleKeysLength = articleKeys.length;

    for (uint i = 0; i < articleKeysLength; i++) {
        if (proConArticles[_votingKey][articleKeys[i]].isArticleApproved) {
            if (
                !proConArticles[_votingKey][articleKeys[i]]
                    .isResponseApproved
            ) {
                isRespondedAllTheCritics = false;
                break;
            }
        }
    }
    if (!isRespondedAllTheCritics) {
        revert VotingOwnerNotRespondedOnAllArticles();
    }
    _;
}
```
Checks if the **POLITICAL_ACTOR** who scheduled the voting also responded on all the pro/con articles assigned to the voting.

### <div id="enoughVotesArrived">enoughVotesArrived</div>

```solidity
modifier enoughVotesArrived(bytes32 _votingKey) {
    if (
        (votings[_votingKey].voteCount * 100) /
            votings[_votingKey].actualNumberOfCitizens <
        MIN_PERCENTAGE_OF_VOTES
    ) {
        revert NoEnoughVotesReceived();
    }
    _;
}
```

Checks if the number of votes arrived on the voting is bigger than the minimum (**MIN_PERCENTAGE_OF_VOTES**).

### <div id="firstVotingCycleStartDateIsInTheFuture">firstVotingCycleStartDateIsInTheFuture</div>

```solidity
modifier firstVotingCycleStartDateIsInTheFuture(
    uint _firstVotingCycleStartDate
) {
    if (_firstVotingCycleStartDate < block.timestamp) {
        revert FirstVotingCycleStartDateHasToBeInTheFuture();
    }
    _;
}
```

Checks if a new first voting cycle start date is in the future.

### <div id="newVotingScheduledAtLeast10daysAhead">newVotingScheduledAtLeast10daysAhead</div>

```solidity
modifier newVotingScheduledAtLeast10daysAhead(uint _startDate) {
    if (
        _startDate <
        block.timestamp + NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME
    ) {
        revert NewVotingHasToBeScheduled10DaysAhead();
    }
    _;
}
```
Checks if a new scheduled voting is 10 days (**NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME**) ahead.

### <div id="notVotedYetOnThisVoting">notVotedYetOnThisVoting</div>

```solidity
modifier notVotedYetOnThisVoting(bytes32 _votingKey) {
    if (votes[msg.sender][_votingKey].voted) {
        revert AlreadyVotedOnThisVoting();
    }
    _;
}
```

Checks if **CITIZEN** voted already on the particular voting.

### <div id="newVotingScheduledMaximum30daysAhead">newVotingScheduledMaximum30daysAhead</div>

```solidity
modifier newVotingScheduledMaximum30daysAhead(uint _startDate) {
    if (_startDate > block.timestamp + VOTING_CYCLE_INTERVAL) {
        revert NewVotingHasToBeScheduledLessThan30daysAhead();
    }
    _;
}
```
Checks if new voting schedule end date is maximum 30 days (**VOTING_CYCLE_INTERVAL**) ahead.

### <div id="votingApproved">votingApproved</div>

```solidity
modifier votingApproved(bytes32 _votingKey) {
    if (!votings[_votingKey].approved) {
        revert VotingNotApproved();
    }
    _;
}
```

Checks if a voting is approved.

### <div id="votingBelongsToSender">votingBelongsToSender</div>

```solidity
modifier votingBelongsToSender(bytes32 _votingKey) {
    if (getVoting(_votingKey).creator != msg.sender) {
        revert VotingNotBelongsToSender();
    }
    _;
}
```

Checks if the voting belongs to the **CITIZEN** who also executed this function call.

### <div id="votingContentQuizIpfsAssigned">votingContentQuizIpfsAssigned</div>

```solidity
modifier votingContentQuizIpfsAssigned(bytes32 _votingKey) {
    if (isEmptyString(votings[_votingKey].votingContentCheckQuizIpfsHash)) {
        revert VotingContentCheckQuizNotAssigned();
    }
    _;
}
```

Checks if related to the voting content there is an assigned ipfs hash reference what points to the voting content check quiz (assigned by **ADMINISTRATORS**)


### <div id="votingExists">votingExists</div>

```solidity
modifier votingExists(bytes32 _votingKey) {
    if (votings[_votingKey].creator == address(0)) {
        revert VotingNotExists();
    }
    _;
}
```
Checks if the voting is existing by looking at the creator address value.

### <div id="votingIsOngoing">votingIsOngoing</div>

```solidity
modifier votingIsOngoing(bytes32 _votingKey) {
    if (
        votings[_votingKey].startDate > block.timestamp ||
        votings[_votingKey].startDate + VOTING_DURATION < block.timestamp
    ) {
        revert VotingNotYetStartedOrAlreadyFinished();
    }
    _;
}
```
Checks if voting is already started and also not yet finished.

### <div id="votingNotFinished">votingNotFinished</div>

```solidity
modifier votingNotFinished(bytes32 _votingKey) {
    if (votings[_votingKey].startDate + VOTING_DURATION > block.timestamp) {
        revert VotingNotFinished();
    }
    _;
}
```
Checks it voting not finished yet.

### <div id="votingNotYetStarted">votingNotYetStarted</div>

```solidity
modifier votingNotYetStarted(bytes32 _votingKey) {
    if (votings[_votingKey].startDate < block.timestamp) {
        revert VotingAlreadyStarted();
    }
    _;
}
```
Checks if voting not yet started.

### <div id="votingPeriodIsActive">votingPeriodIsActive</div>

```solidity
modifier votingPeriodIsActive() {
    if (
        firstVotingCycleStartDate > block.timestamp ||
        firstVotingCycleStartDate == 0
    ) {
        revert NoOngoingVotingPeriod();
    }
    _;
}
```
Checks if the voting period is declared and also ongoing.

### <div id="votingWon">votingWon</div>

```solidity
modifier votingWon(bytes32 _votingKey) {
    if (!isVotingWon(_votingKey, true)) {
        revert VotingDidNotWon();
    }
    _;
}
```
Checks if voting won by looking at the expected outcome related total voting score.


## Validators > Content

### <div id="articleShouldExists">articleShouldExists</div>
```solidity
modifier articleShouldExists(bytes32 _votingKey, bytes32 _articleKey) {
    if (proConArticles[_votingKey][_articleKey].publisher == address(0)) {
        revert ArticleNotExists();
    }
    _;
}
```
Checks if article is exists by looking at the publisher value.

### <div id="enoughContentReadQuizAnswerAdded">enoughContentReadQuizAnswerAdded</div>
```solidity
modifier enoughContentReadQuizAnswerAdded(
    bytes32[] memory _keccak256HashedAnswers
) {
    if (
        _keccak256HashedAnswers.length < MIN_TOTAL_CONTENT_READ_CHECK_ANSWER
    ) {
        revert NoEnoughContentReadQuizAnswerAdded();
    }
    _;
}
```
Checks if the minimum required ([MIN_TOTAL_CONTENT_READ_CHECK_ANSWER](#MIN_TOTAL_CONTENT_READ_CHECK_ANSWER)) content check quiz answers provided related to the passed answers array.


### <div id="hasArticleContentIpfsHashAssigned">hasArticleContentIpfsHashAssigned</div>
```solidity
modifier hasArticleContentIpfsHashAssigned(
    bytes32 _votingKey,
    bytes32 _articleKey
) {
    if (
        isEmptyString(
            proConArticles[_votingKey][_articleKey]
                .articleContentCheckQuizIpfsHash
        )
    ) {
        revert NoArticleContentCheckIpfsAssignedToThisArticle();
    }
    _;
}
```
Checks if the content check quiz document hash is assigned to the actual article.

### <div id="hasArticleResponseAssigned">hasArticleResponseAssigned</div>
```solidity
modifier hasArticleResponseAssigned(
    bytes32 _votingKey,
    bytes32 _articleKey
) {
    if (
        isEmptyString(
            proConArticles[_votingKey][_articleKey]
                .responseStatementIpfsHash
        )
    ) {
        revert NoArticleResponseAssigned();
    }
    _;
}
```
Checks if any response statement ipfs hash assigned to the article.

### <div id="hasArticleResponseContentCheckIpfsHash">hasArticleResponseContentCheckIpfsHash</div>
```solidity
modifier hasArticleResponseContentCheckIpfsHash(
    bytes32 _votingKey,
    bytes32 _articleKey
) {
    if (
        isEmptyString(
            proConArticles[_votingKey][_articleKey]
                .responseContentCheckQuizIpfsHash
        )
    ) {
        revert NoArticleResponseContentCheckIpfsAssigned();
    }
    _;
}
```
Checks if article related response has an assigned validation quiz document ipfs hash reference.

### <div id="hasCreditsLeftToPublishArticle">hasCreditsLeftToPublishArticle</div>
```solidity
modifier hasCreditsLeftToPublishArticle(bytes32 _votingKey) {
    if (
        publishArticleToVotingsCount[msg.sender][_votingKey] >=
        politicalActorVotingCredits[msg.sender]
    ) {
        revert NoMorePublishArticleCreditsRelatedToThisVoting();
    }
    _;
}
```
Checks if **POLITICAL_ACTOR** has any credit left related to the voting to assign at least one more article to it. 


# Global variables

## Global variables > Roles

### <div id="ADMINISTRATOR">ADMINISTRATOR</div>
```solidity
bytes32 public constant ADMINISTRATOR = keccak256("ADMINISTRATOR");
```

### <div id="POLITICAL_ACTOR">POLITICAL_ACTOR</div>
```solidity
bytes32 public constant POLITICAL_ACTOR = keccak256("POLITICAL_ACTOR");
```

### <div id="CITIZEN">CITIZEN</div>
```solidity
bytes32 public constant CITIZEN = keccak256("CITIZEN");
```

## Global variables > Constants

### <div id="APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT">APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT</div>
```solidity
uint public constant APPROVE_VOTING_BEFORE_IT_STARTS_LIMIT = 3 days;
```
Tells the amount of time when a scheduled voting can start to be approved by **ADMINISTRATORS**

### <div id="CONTENT_CHECK_ASKED_NUM_OF_QUESTIONS">CONTENT_CHECK_ASKED_NUM_OF_QUESTIONS</div>
```solidity
uint public constant CONTENT_CHECK_ASKED_NUM_OF_QUESTIONS = 5;
```
The minimum number of content check question will be asked from the **CITIZENS** during any kind of content read validation process.

### <div id="ELECTION_START_END_INTERVAL">ELECTION_START_END_INTERVAL</div>
```solidity
uint public constant ELECTION_START_END_INTERVAL = 30 days;
```

The amount of time how long an election period will take.

### <div id="MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE">MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE</div>
```solidity
uint public constant MAX_DAILY_NEW_CITIZENS_CAN_ADD_PERCENTAGE = 10;
```
This limitation percentage of the number of daily granted **CITIZEN** roles compared to the actual size of the **CITIZENS** per **ADMINISTRATOR**

### <div id="MIN_VOTE_SCORE">MIN_VOTE_SCORE</div>
```solidity
uint public constant MIN_VOTE_SCORE = 5;
```

The granted minimum voting score every **CITIZEN** has (after content read validated the actual voting topics).

### <div id="MINIMUM_PERCENTAGE_OF_ELECTION_VOTES">MINIMUM_PERCENTAGE_OF_ELECTION_VOTES</div>
```solidity
uint public constant MINIMUM_PERCENTAGE_OF_ELECTION_VOTES = 10;
```

The minimum percentage of votes a candidate has to own at the end of the elections.

### <div id="MIN_PERCENTAGE_OF_VOTES">MIN_PERCENTAGE_OF_VOTES</div>
```solidity
uint public constant MIN_PERCENTAGE_OF_VOTES = 10;
```

### <div id="MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED">MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED</div>
```solidity
uint public constant MIN_PERCENTAGE_GRANT_ADMIN_APPROVALS_REQUIRED = 50;
```
The minimum percentage of common will in crucial decision makings where multiple admin approvals required.

The minimum percentage of number of votes required during a voting process compared to actual number of the **CITIZENS**.

### <div id="MIN_TOTAL_CONTENT_READ_CHECK_ANSWER">MIN_TOTAL_CONTENT_READ_CHECK_ANSWER</div>
```solidity
uint public constant MIN_TOTAL_CONTENT_READ_CHECK_ANSWER = 10;
```

The minimum number of answers has to be assigned to every new content.

### <div id="NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME">NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME</div>
```solidity
uint public constant NEW_VOTING_PERIOD_MIN_SCHEDULE_AHEAD_TIME = 10 days;
```

The minimum amount of time a new voting has to be scheduled ahead.

### <div id="VOTING_CYCLE_INTERVAL">VOTING_CYCLE_INTERVAL</div>
```solidity
uint public constant VOTING_CYCLE_INTERVAL = 30 days;
```

The amount of time how long a voting cycle takes.

### <div id="VOTING_DURATION">VOTING_DURATION</div>
```solidity
uint public constant VOTING_DURATION = 14 days;
```

The amount of time a voting takes.

## Global variables > General


### <div id="citizenRoleApplicationFee">citizenRoleApplicationFee</div>
```solidity
uint public citizenRoleApplicationFee = 10000;
```
The minimum amount of crypto a person has to pay when he/she applies for citizenship.

### <div id="electionsCandidateApplicationFee">electionsCandidateApplicationFee</div>
```solidity
uint public electionsCandidateApplicationFee = 1 ether / 10;
```
The minimum amount of crypto a **CITIZEN** has to pay when he/she want to become a candidate on the upcoming elections.

### <div id="firstVotingCycleStartDate">firstVotingCycleStartDate</div>
```solidity
uint public firstVotingCycleStartDate;
```
Tells when after the elections the first voting cycle has to start.