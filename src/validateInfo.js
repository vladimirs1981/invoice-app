export default function validateInfo(newInvoice) {
	let errors = {};

	// if (!newInvoice.clientAddress.street.trim()) {
	// 	errors.clientAddress.street = "can't be empty";
	// }

	// if (!newInvoice.clientAddress.city.trim()) {
	// 	errors.clientAddress.city = "can't be empty";
	// }

	// if (!newInvoice.clientAddress.postCode.trim()) {
	// 	errors.clientAddress.postCode = "can't be empty";
	// }

	// if (!newInvoice.clientAddress.country.trim()) {
	// 	errors.clientAddress.country = "can't be empty";
	// }

	// if (!newInvoice.senderAddress.street.trim()) {
	// 	errors.senderAddress.street = "can't be empty";
	// }

	// if (!newInvoice.senderAddress.city.trim()) {
	// 	errors.senderAddress.city = "can't be empty";
	//}

	if (!newInvoice.createdAt.trim()) {
		errors.createdAt = "can't be empty";
	}

	// if (!newInvoice.senderAddress.postCode.trim()) {
	// 	errors.senderAddress.postCode = "can't be empty";
	// }

	// if (!newInvoice.senderAddress.country.trim()) {
	// 	errors.senderAddress.country = "can't be empty";
	// }

	if (!newInvoice.clientEmail) {
		errors.clientEmail = "can't be empty";
	} else if (!/\S+@\S+\.\S+/.test(newInvoice.clientEmail)) {
		errors.clientEmail = 'invalid email format';
	}

	if (!newInvoice.clientName.trim()) {
		errors.clientName = "can't be empty";
	}

	if (!newInvoice.description.trim()) {
		errors.description = "can't be empty";
	}

	if (!newInvoice.createdAt) {
		errors.createdAt = "can't be empty";
	}

	if (!newInvoice.paymentDue) {
		errors.paymentDue = "can't be empty";
	}

	return errors;
}
