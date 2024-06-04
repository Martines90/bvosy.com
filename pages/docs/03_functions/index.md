# Functions

## General functions

### addUpdateContact
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

### updateCitizenshipApplicationFee

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

### updateElectionsApplicationFee

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

## Elections

### scheduleNextElections
input props:
- _electionsStartDate (the date (*timestamp) when the next elections starts)
- _electionsEndDate (the date (*timestamp) when the next election ends)

pre execution checks:
- has **ADMINISTRATOR** role
- no unclosed/ongoing elections
- start date is ahead at least 30 days

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