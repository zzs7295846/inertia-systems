// Boss Fight Framework - HIS Transformation v3.0
export const bossFightLogic = {
  initialHP: 100,
  damagePerClick: 10,
  bossCounterChance: 0.3,
  getBossName: (outcome) => {
    const map = {
      'icd-10': 'ICD-10 編碼混亂怪',
      'billing': '財務對帳迷宮',
      'prediction': '掛號變動風暴',
      'defensive-record': '法規合規審計魔'
    };
    return map[outcome] || '遺留系統幽靈';
  }
};
