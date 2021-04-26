import { PreviousApplicant } from '../../../interfaces';
import React from 'react';

type Props = {
	applicant?: PreviousApplicant;
};
export default function HostPreviousApplicantItem({ applicant }: Props) {
	return (
		<React.Fragment>
			<tr>
				<td>{applicant?.date || '2021-04-26'}</td>
				<td>{applicant?.place.name || '월드메르디앙'}</td>
				<td>{applicant?.user.name || '황인종'}</td>
				<td>{applicant?.date || '2021-01-01'}</td>
			</tr>
		</React.Fragment>
	);
}
