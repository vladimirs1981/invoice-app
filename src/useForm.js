import { useState, useEffect } from 'react';

const useForm = (validate) => {
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback();
		}
	}, [errors]);

	return { errors, setErrors, setIsSubmitting };
};

export default useForm;
