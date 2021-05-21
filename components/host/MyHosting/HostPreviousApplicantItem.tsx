import { PreviousApplication } from '../../../interfaces';
import React from 'react';
import Rating from '../../reuse/Rating';

type Props = {
	applicant: PreviousApplication;
};
export default function HostPreviousApplicantItem({ applicant }: Props) {
	return (
		<React.Fragment>
			<tr>
				<td>{applicant.date}</td>
				<td>{applicant!.place!.formatted_address}</td>
				<td>{applicant.user.nickname}</td>
				<td className='Rating' style={{ color: 'rgba(33,33,33,.6)' }}>
					{applicant.review ? (
						<Rating
							rating={applicant?.review.rating as number}
							isFilled={true}
						/>
					) : (
						'후기가 아직 없네요..'
					)}
				</td>
			</tr>
		</React.Fragment>
	);
}
