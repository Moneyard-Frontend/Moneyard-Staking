// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MoneyStaking {
    address public owner;
    uint256 public commissionRate = 15; // 15% commission
    
    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public stakes;
    mapping(string => bool) public usedReferralCodes;

    event Deposited(address indexed user, uint256 amount, string referralCode);
    event Withdrawn(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 _amount, string memory _referralCode) external payable {
        require(_amount >= 15 ether, "Minimum deposit 15 USDT");
        
        if (bytes(_referralCode).length > 0 && !usedReferralCodes[_referralCode]) {
            uint256 commission = (_amount * commissionRate) / 100;
            _amount += commission;
            usedReferralCodes[_referralCode] = true;
        }

        stakes[msg.sender] = Stake({
            amount: _amount,
            startTime: block.timestamp
        });

        emit Deposited(msg.sender, _amount, _referralCode);
    }

    function withdraw(uint256 _amount) external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= _amount, "Insufficient balance");
        
        userStake.amount -= _amount;
        payable(msg.sender).transfer(_amount);
        
        emit Withdrawn(msg.sender, _amount);
    }

    function getBalance(address _user) external view returns (uint256) {
        return stakes[_user].amount;
    }

    function setCommissionRate(uint256 _newRate) external {
        require(msg.sender == owner, "Only owner");
        commissionRate = _newRate;
    }
}
