import dayjs from 'dayjs';

export function getDate (value) {
  return dayjs(value).format('DD/MM/YYYY HH:mm');
}

export function getDecimal (value) {
  return Number.parseFloat(value).toFixed(2);
}

export function multiply (a, b) {
  return a * b;
}

export function getString (value) {
  return String(value).toString();
}

/**
 * @description Get the price for rates.
 * @export
 * @param {Number} amount
 * @param {Number} p1
 * @param {Number} p2
 * @param {Number} p3
 * @param {Number} p4
 * @param {Number} p5
 * @return
 */
export function getPrice (amount, p1, p2, p3, p4, p5) {
  if (amount >= 100 && amount <= 500) {
    return p1;
  } else if (amount >= 501 && amount <= 1000) {
    return p2;
  } else if (amount >= 1001 && amount <= 1500) {
    return p3;
  } else if (amount >= 1501 && amount <= 2000) {
    return p4;
  } else if (amount >= 2001 && amount <= 10000) {
    return p5;
  }
}

export function getType (v) {
	if (v === 'sell') {
		return 'ขาย';
	} else if (v === 'buy') {
		return 'ซื้อ';
	} else {
		return '';
	}
}

export function getTitle (v) {
	if (v === 'paypals') {
		return 'PayPal';
	} else if (v === 'webmonies') {
		return 'Web Money';
	} else if (v === 'perfectmonies') {
		return 'Perfect Money';
	} else if (v === 'netellers') {
		return 'Neteller';
	} else if (v === 'skrills') {
		return 'Skrill';
	} else {
		return '';
	}
}

export function getStatus (v) {
	if (v === 'Pending') {
		return 'รอดำเนินการ';
	} else if (v === 'Processing') {
		return 'กำลังดำเนินการ';
	} else if (v === 'Success') {
		return 'เรียบร้อย';
	} else if (v === 'Canceled') {
		return 'ยกเลิก';
	} else if (v === 'Failed') {
		return 'ล้มเหลว';
	} else {
		return '';
	}
}

export function getBankName (v) {
	if (v === 'KBANK') {
		return 'กสิกรไทย';
	} else if (v === 'BBL') {
		return 'กรุงเทพฯ';
	} else if (v === 'KTB') {
		return 'กรุงไทย';
	} else if (v === 'KKP') {
		return 'เกียรตินาคินภทร';
	} else if (v === 'BOA') {
		return 'กรุงศรีอยุธยา';
	} else if (v === 'SCB') {
		return 'ไทยพานิชย์';
	} else if (v === 'TTB') {
		return 'ทหารไทยธนชาติ';
	} else if (v === 'GSB') {
		return 'ออมสิน';
	} else if (v === 'CIMB') {
		return 'ซีไอเอ็มบี';
	} else if (v === 'UOB') {
		return 'ยูโอบีฯ';
	} else if (v === 'BAAC') {
		return 'ธ.ก.ส.';
	} else {
		return '';
	}
}

export function getBankStatus (value) {
	if (value === 'request') {
		return 'โปรดเพิ่มบัญชีธนาคาร';
	} else if (value === 'checking') {
		return 'กำลังตรวจสอบ';
	} else if (value === 'verified') {
		return 'ยืนยันแล้ว';
	} else {
		return '';
	}
}
