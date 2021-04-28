import { Application } from '../../../interfaces';
import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

type Props = {
	applicant: Application;
};

export default function HostMatchedApplicantItem(props: Props) {
	const { applicant } = props;
	return (
		<React.Fragment>
			<tr>
				<td>{applicant?.user.nickname || '닉네임'}</td>
				<td>{applicant?.date || '2021-01-01'}</td>
			</tr>
		</React.Fragment>
	);
}
