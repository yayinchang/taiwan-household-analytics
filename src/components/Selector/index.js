import React from 'react';
import cx from 'classnames';
import styles from './Selector.module.scss';

export default function Selector({
	label,
	value,
	placeholder = '請選擇',
	isActive = false,
	isDisabled = false,
	onClickEvent,
	classNames,
	children,
}) {
	return (
		<fieldset
			className={cx(styles.selector, classNames, {
				[styles.selector__active]: isActive && !isDisabled,
				[styles.selector__disabled]: isDisabled,
			})}
			onClick={onClickEvent}
		>
			<legend
				className={cx(styles.label, {
					[styles.label__active]: isActive && !isDisabled,
					[styles.label__disabled]: isDisabled,
				})}
			>
				{label}
			</legend>
			<div className={styles.value}>
				<span className={cx({ 'cr-grey': !value })}>
					{value ? value : placeholder}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="13"
					height="6"
					fill="none"
					className={cx(styles.caret, {
						[styles.caret__active]: isActive && !isDisabled,
					})}
				>
					<path d="m6.5 6-6-6h12l-6 6Z" fill="var(--cr-dark-grey)" />
				</svg>
			</div>
			<div
				className={cx(styles.dropdown, {
					[styles.dropdown__active]: isActive && !isDisabled,
				})}
			>
				{children}
			</div>
		</fieldset>
	);
}
