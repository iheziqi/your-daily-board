import { MensaID, mensaInfo } from '../database/mensa';

function emailSkeleton(): string {
	const emailSkeleton = `<!DOCTYPE html>
<html
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
>
	<head>
		<title> </title>
		<!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<!--<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<style type="text/css">
			#outlook a {
				padding: 0;
			}
			body {
				margin: 0;
				padding: 0;
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
			}
			table,
			td {
				border-collapse: collapse;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
			}
			img {
				border: 0;
				height: auto;
				line-height: 100%;
				outline: none;
				text-decoration: none;
				-ms-interpolation-mode: bicubic;
			}
			p {
				display: block;
				margin: 13px 0;
			}
		</style>
		<!--[if mso]>
			<noscript>
				<xml>
					<o:OfficeDocumentSettings>
						<o:AllowPNG />
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
			</noscript>
		<![endif]-->
		<!--[if lte mso 11]>
			<style type="text/css">
				.mj-outlook-group-fix {
					width: 100% !important;
				}
			</style>
		<![endif]-->

		<!--[if !mso]><!-->
		<link
			href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
			rel="stylesheet"
			type="text/css"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900"
			rel="stylesheet"
			type="text/css"
		/>
		<style type="text/css">
			@import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
			@import url(https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;900);
		</style>
		<!--<![endif]-->

		<style type="text/css">
			@media only screen and (min-width: 480px) {
				.mj-column-per-100 {
					width: 100% !important;
					max-width: 100%;
				}
			}
		</style>
		<style media="screen and (min-width:480px)">
			.moz-text-html .mj-column-per-100 {
				width: 100% !important;
				max-width: 100%;
			}
		</style>

		<style type="text/css">
			@media only screen and (max-width: 480px) {
				table.mj-full-width-mobile {
					width: 100% !important;
				}
				td.mj-full-width-mobile {
					width: auto !important;
				}
			}
		</style>
		<style type="text/css">
			body {
				background-color: #faf098;
			}
			.bg-none {
				background: none !important;
			}
			.gutter {
				padding-left: 20px !important;
				padding-right: 20px !important;
			}
			@media (min-width: 480px) {
				.gutter {
					padding-left: 32px !important;
					padding-right: 32px !important;
				}
			}

			/* Utility classes */
			.no-wrap {
				white-space: nowrap;
			}
			.hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}
			.lg-hidden {
				display: none;
				max-width: 0px;
				max-height: 0px;
				overflow: hidden;
				mso-hide: all;
			}

			@media (min-width: 480px) {
				/* Utility classes */
				.sm-hidden {
					display: none;
					max-width: 0px;
					max-height: 0px;
					overflow: hidden;
					mso-hide: all;
				}
				.lg-hidden {
					display: block !important;
					max-width: none !important;
					max-height: none !important;
					overflow: visible !important;
					mso-hide: none !important;
				}
			}
		</style>
	</head>
	<body style="word-spacing: normal; background-color: #faf098">

		<div style="background-color: #faf098">
   
		</div>

	</body>
</html>
`;
	return emailSkeleton;
}

function emailTitle() {
	const emailTitle = `
<!-- EMAIL TITLE -->
<table
				align="center"
				border="0"
				cellpadding="0"
				cellspacing="0"
				role="presentation"
				style="width: 100%"
			>
				<tbody>
					<tr>
						<td>
							<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

							<div style="margin: 0px auto; max-width: 600px">
								<table
									align="center"
									border="0"
									cellpadding="0"
									cellspacing="0"
									role="presentation"
									style="width: 100%"
								>
									<tbody>
										<tr>
											<td
												style="
													direction: ltr;
													font-size: 0px;
													padding: 32px 20px;
													text-align: center;
												"
											>
												<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:560px;" width="560" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

												<div
													class="gutter"
													style="margin: 0px auto; max-width: 560px"
												>
													<table
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style="width: 100%"
													>
														<tbody>
															<tr>
																<td
																	style="
																		direction: ltr;
																		font-size: 0px;
																		padding: 0px;
																		text-align: center;
																	"
																>
																	<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->

																	<div
																		class="mj-column-per-100 mj-outlook-group-fix"
																		style="
																			font-size: 0px;
																			text-align: left;
																			direction: ltr;
																			display: inline-block;
																			vertical-align: top;
																			width: 100%;
																		"
																	>
																		<table
																			border="0"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			width="100%"
																		>
																			<tbody>
																				<tr>
																					<td
																						style="
																							vertical-align: top;
																							padding: 0px;
																						"
																					>
																						<table
																							border="0"
																							cellpadding="0"
																							cellspacing="0"
																							role="presentation"
																							style=""
																							width="100%"
																						>
																							<tbody>
																								<tr>
																									<td
																										align="center"
																										style="
																											font-size: 0px;
																											padding: 0px;
																											word-break: break-word;
																										"
																									>
																										<div
																											style="
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 42px;
																												font-weight: 700;
																												line-height: 120%;
																												text-align: right;
																												color: #111111;
																											"
																										>
																											Your Daily Board
																										</div>
																									</td>
																								</tr>
                                                <tr>
																									<td
																										align="center"
																										style="
																											font-size: 0px;
																											padding: 0px;
																											word-break: break-word;
																										"
																									>
																										<div
																											style="
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 20px;
																												font-weight: 200;
																												line-height: 120%;
																												text-align: right;
																												color: #111111;
																											"
																										>
                                                    Menu and More...
																										</div>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>

																	<!--[if mso | IE]></td></tr></table><![endif]-->
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<!--[if mso | IE]></td></tr></table><![endif]-->
						</td>
					</tr>
				</tbody>
			</table>
<!-- END OF EMAIL TITLE -->
`;
	return emailTitle;
}

function blankSpace() {
	const blankSpace = `
<!-- BLANK SPACE -->
<!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

			<div style="margin: 0px auto; max-width: 600px">
				<table
					align="center"
					border="0"
					cellpadding="0"
					cellspacing="0"
					role="presentation"
					style="width: 100%"
				>
					<tbody>
						<tr>
							<td
								style="
									direction: ltr;
									font-size: 0px;
									padding: 0px;
									text-align: center;
								"
							>
								<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

								<div
									class="mj-column-per-100 mj-outlook-group-fix"
									style="
										font-size: 0px;
										text-align: left;
										direction: ltr;
										display: inline-block;
										vertical-align: top;
										width: 100%;
									"
								>
									<table
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										width="100%"
									>
										<tbody>
											<tr>
												<td style="vertical-align: top; padding: 0px">
													<table
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style=""
														width="100%"
													>
														<tbody>
															<tr>
																<td
																	class="lg-hidden"
																	style="
																		font-size: 0px;
																		padding: 0px;
																		word-break: break-word;
																	"
																>
																	<div style="height: 24px; line-height: 24px">
																		&#8202;
																	</div>
																</td>
															</tr>

															<tr>
																<td
																	class="sm-hidden"
																	style="
																		font-size: 0px;
																		padding: 0px;
																		word-break: break-word;
																	"
																>
																	<div style="height: 24px; line-height: 24px">
																		&#8202;
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<!--[if mso | IE]></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
<!-- END OF BLANK SPACE -->
`;
	return blankSpace;
}

function menuJumpLink() {
	const menuJumpLink = `
<!-- MENU JUMP LINKS -->
			<!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
			<div class="gutter" style="margin: 0px auto; max-width: 600px">
				<table
					align="center"
					border="0"
					cellpadding="0"
					cellspacing="0"
					role="presentation"
					style="width: 100%"
				>
					<tbody>
						<tr>
							<td
								style="
									border: 1px solid #111;
									direction: ltr;
									font-size: 0px;
									padding: 0px;
									text-align: center;
								"
							>
								<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:598px;" width="598" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

								<div
									class="gutter"
									style="
										background: #ffffff;
										background-color: #ffffff;
										margin: 0px auto;
										border-radius: 0px;
										max-width: 598px;
									"
								>
									<table
										align="center"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											background: #ffffff;
											background-color: #ffffff;
											width: 100%;
											border-radius: 0px;
										"
									>
										<tbody>
											<tr>
												<td
													style="
														direction: ltr;
														font-size: 0px;
														padding: 0px;
														text-align: center;
													"
												>
													<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:598px;" ><![endif]-->

													<div
														class="mj-column-per-100 mj-outlook-group-fix"
														style="
															font-size: 0px;
															text-align: left;
															direction: ltr;
															display: inline-block;
															vertical-align: top;
															width: 100%;
														"
													>
														<table
															border="0"
															cellpadding="0"
															cellspacing="0"
															role="presentation"
															width="100%"
														>
															<tbody>
																<tr>
																	<td
																		style="
																			vertical-align: top;
																			padding: 0px;
																			padding-top: 40px;
																			padding-bottom: 40px;
																		"
																	>
																		<table
																			border="0"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style=""
																			width="100%"
																		>
																			<tbody>
																				<tr>
																					<td
																						align="left"
																						class="lg-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 24px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 30px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								color: #111111;
																							"
																						>
																							Where do you go today?
																						</div>
																					</td>
																				</tr>

																				<tr>
																					<td
																						align="left"
																						class="sm-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 24px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 30px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								color: #111111;
																							"
																						>
																							Where do you go today?
																						</div>
																					</td>
																				</tr>

																				<tr>
																					<td
																						align="left"
																						vertical-align="middle"
																						style="
																							font-size: 0px;
																							padding-bottom: 10px;
																							word-break: break-word;
																						"
																					>
																						<table
																							border="0"
																							cellpadding="0"
																							cellspacing="0"
																							role="presentation"
																							style="
																								border-collapse: separate;
																								width: 100%;
																								line-height: 100%;
																							"
																						>
																							<tbody>
																								<tr>
																									<td
																										align="center"
																										bgcolor="#FFFFFF"
																										role="presentation"
																										style="
																											border: 1px solid #111;
																											border-radius: 0px;
																											cursor: auto;
																											mso-padding-alt: 20px 32px;
																											background: #ffffff;
																										"
																										valign="middle"
																									>
																										<a
																											href="#"
																											style="
																												display: inline-block;
																												background: #ffffff;
																												color: #475cf6;
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 18px;
																												font-weight: 500;
																												line-height: 115%;
																												margin: 0;
																												text-transform: uppercase;
																												padding: 10px 20px;
																												mso-padding-alt: 0px;
																												border-radius: 0px;
																											"
																										>
																											Mensa XXX
																										</a>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>

                                        <tr>
																					<td
																						align="left"
																						vertical-align="middle"
																						style="
																							font-size: 0px;
																							padding-bottom: 10px;
																							word-break: break-word;
																						"
																					>
																						<table
																							border="0"
																							cellpadding="0"
																							cellspacing="0"
																							role="presentation"
																							style="
																								border-collapse: separate;
																								width: 100%;
																								line-height: 100%;
																							"
																						>
																							<tbody>
																								<tr>
																									<td
																										align="center"
																										bgcolor="#FFFFFF"
																										role="presentation"
																										style="
																											border: 1px solid #111;
																											border-radius: 0px;
																											cursor: auto;
																											mso-padding-alt: 20px 32px;
																											background: #ffffff;
																										"
																										valign="middle"
																									>
																										<a
																											href="#"
																											style="
																												display: inline-block;
																												background: #ffffff;
																												color: #475cf6;
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 18px;
																												font-weight: 500;
																												line-height: 115%;
																												margin: 0;
																												text-transform: uppercase;
																												padding: 10px 20px;
																												mso-padding-alt: 0px;
																												border-radius: 0px;
																											"
																										>
                                                    Mensa XXX
																										</a>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>

																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>

													<!--[if mso | IE]></td></tr></table><![endif]-->
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
      <!-- END OF MENU JUMP LINKS -->
`;
	return menuJumpLink;
}

function footer() {
	const footer = `
<!-- FOOTER -->
<!--[if mso | IE]></td></tr></table><![endif]-->
			<table
				align="center"
				border="0"
				cellpadding="0"
				cellspacing="0"
				role="presentation"
				style="background: #111111; background-color: #111111; width: 100%"
			>
				<tbody>
					<tr>
						<td>
							<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#111111" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

							<div style="margin: 0px auto; max-width: 600px">
								<table
									align="center"
									border="0"
									cellpadding="0"
									cellspacing="0"
									role="presentation"
									style="width: 100%"
								>
									<tbody>
										<tr>
											<td
												style="
													direction: ltr;
													font-size: 0px;
													padding: 0px;
													text-align: center;
												"
											>
												<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

												<div
													class="gutter"
													style="margin: 5px auto; max-width: 600px"
												>
													
												</div>

												<!--[if mso | IE]></td></tr></table></td></tr><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

												<div
													class="gutter"
													style="margin: 0px auto; max-width: 600px"
												>
													<table
														align="center"
														border="0"
														cellpadding="0"
														cellspacing="0"
														role="presentation"
														style="width: 100%"
													>
														<tbody>
															<tr>
																<td
																	style="
																		direction: ltr;
																		font-size: 0px;
																		padding: 0px;
																		padding-bottom: 32px;
																		text-align: center;
																	"
																>
																	<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

																	<div
																		class="mj-column-per-100 mj-outlook-group-fix"
																		style="
																			font-size: 0px;
																			text-align: left;
																			direction: ltr;
																			display: inline-block;
																			vertical-align: top;
																			width: 100%;
																		"
																	>
																		<table
																			border="0"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			width="100%"
																		>
																			<tbody>
																				<tr>
																					<td
																						style="
																							vertical-align: top;
																							padding: 0px;
																						"
																					>
																						<table
																							border="0"
																							cellpadding="0"
																							cellspacing="0"
																							role="presentation"
																							style=""
																							width="100%"
																						>
																							<tbody>
																								<tr>
																									<td
																										align="left"
																										style="
																											font-size: 0px;
																											padding: 0px;
																											padding-bottom: 12px;
																											word-break: break-word;
																										"
																									>
																										<div
																											style="
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 14px;
																												font-weight: 500;
																												line-height: 140%;
																												text-align: center;
																												color: #ffffff;
																											"
																										>
																											Your daily board v1.0.2 is brought to you by Ziqi.
																										</div>
																									</td>
																								</tr>

																								<tr>
																									<td
																										align="left"
																										style="
																											font-size: 0px;
																											padding: 0px;
																											word-break: break-word;
																										"
																									>
																										<div
																											style="
																												font-family: 'Albert Sans',
																													-apple-system,
																													BlinkMacSystemFont,
																													'Segoe UI', Roboto,
																													sans-serif;
																												font-size: 14px;
																												font-weight: 500;
																												line-height: 140%;
																												text-align: center;
																												color: #ffffff;
																											"
																										>
																											Have a lovely day!
																										</div>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</div>

																	<!--[if mso | IE]></td></tr></table><![endif]-->
																</td>
															</tr>
														</tbody>
													</table>
												</div>

												<!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<!--[if mso | IE]></td></tr></table><![endif]-->
						</td>
					</tr>
				</tbody>
			</table>
<!-- END OF FOOTER -->
`;
	return footer;
}

function menuLoader(id: MensaID, menuText: string): string {
	const { name, picture } = mensaInfo[id];
	const menuContainer = `<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

      <!-- MENSA CONTAINER -->
			<div class="gutter" style="margin: 0px auto; max-width: 600px">
				<table
					align="center"
					border="0"
					cellpadding="0"
					cellspacing="0"
					role="presentation"
					style="width: 100%"
				>
					<tbody>
						<tr>
							<td
								style="
									border: 1px solid #111;
									direction: ltr;
									font-size: 0px;
									padding: 0px;
									text-align: center;
								"
							>
								<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:598px;" width="598" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

								<div
									class="gutter"
									style="
										background: #ffffff;
										background-color: #ffffff;
										margin: 0px auto;
										border-radius: 0px;
										max-width: 598px;
									"
								>
									<table
										align="center"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											background: #ffffff;
											background-color: #ffffff;
											width: 100%;
											border-radius: 0px;
										"
									>
										<tbody>
											<tr>
												<td
													style="
														direction: ltr;
														font-size: 0px;
														padding: 0px;
														text-align: center;
													"
												>
													<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:598px;" ><![endif]-->

													<div
														class="mj-column-per-100 mj-outlook-group-fix"
														style="
															font-size: 0px;
															text-align: left;
															direction: ltr;
															display: inline-block;
															vertical-align: top;
															width: 100%;
														"
													>
														<table
															border="0"
															cellpadding="0"
															cellspacing="0"
															role="presentation"
															width="100%"
														>
															<tbody>
																<tr>
																	<td
																		style="
																			vertical-align: top;
																			padding: 0px;
																			padding-top: 40px;
																			padding-bottom: 40px;
																		"
																	>
																		<table
																			border="0"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style=""
																			width="100%"
																		>
																			<tbody>
                                        <!-- MENSA TITLE -->
																				<tr>
																					<td
																						align="left"
																						class="lg-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 32px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 30px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								color: #111111;
                                                text-transform: capitalize;
																							"
																						>
                                            ${name}
																						</div>
																					</td>
																				</tr>
                                        <!-- END OF MENSA TITLE -->

																				<tr>
																					<td
																						align="left"
																						class="sm-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 32px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 30px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								color: #111111;
                                                text-transform: capitalize;
																							"
																						>
                                            ${name}
																						</div>
																					</td>
																				</tr>
                                        
                                        <!-- MENSA PIC -->
																				<tr>
																					<td
																						align="center"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 28px;
																							word-break: break-word;
																						"
																					>
																						<table
																							border="0"
																							cellpadding="0"
																							cellspacing="0"
																							role="presentation"
																							style="
																								border-collapse: collapse;
																								border-spacing: 0px;
																							"
																						>
																							<tbody>
																								<tr>
																									<td style="width: 536px">
																										<img
																											height="auto"
                                                      src="${picture}"
																											style="
																												border: 0;
																												display: block;
																												outline: none;
																												text-decoration: none;
																												height: auto;
																												width: 100%;
																												font-size: 16px;
																											"
																											width="536"
																										/>
																									</td>
																								</tr>
																							</tbody>
																						</table>
																					</td>
																				</tr>
                                        <!-- END OF MENSA PIC -->

                                        <!-- MENSA MENU CONTENT-->
																				<tr>
																					<td
																						align="left"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-top: 20px;
																							padding-bottom: 32px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 18px;
																								font-weight: 500;
																								line-height: 155%;
																								text-align: left;
																								color: #111111;
																							"
																						>
                                            ${menuText}
																						</div>
																					</td>
																				</tr>
                                        <!-- END OF MENSA MENU CONTENT-->

																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>

													<!--[if mso | IE]></td></tr></table><![endif]-->
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
      <!-- END OF MENSA CONTAINER -->
      ${blankSpace()}
`;
	return menuContainer;
}

function exchangeRateLoader(exchangeRate: string) {
	const exchangeRateContainer = `
<!-- EXCHANGE RATE -->
<!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
			<div class="gutter" style="margin: 0px auto; max-width: 600px">
				<table
					align="center"
					border="0"
					cellpadding="0"
					cellspacing="0"
					role="presentation"
					style="width: 100%"
				>
					<tbody>
						<tr>
							<td
								style="
									border: 1px solid #111;
									direction: ltr;
									font-size: 0px;
									padding: 0px;
									text-align: center;
								"
							>
								<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="gutter-outlook" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="gutter-outlook" role="presentation" style="width:598px;" width="598" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

								<div
									class="gutter"
									style="
										background: #ffffff;
										background-color: #ffffff;
										margin: 0px auto;
										border-radius: 0px;
										max-width: 598px;
									"
								>
									<table
										align="center"
										border="0"
										cellpadding="0"
										cellspacing="0"
										role="presentation"
										style="
											background: #ffffff;
											background-color: #ffffff;
											width: 100%;
											border-radius: 0px;
										"
									>
										<tbody>
											<tr>
												<td
													style="
														direction: ltr;
														font-size: 0px;
														padding: 0px;
														text-align: center;
													"
												>
													<!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:598px;" ><![endif]-->

													<div
														class="mj-column-per-100 mj-outlook-group-fix"
														style="
															font-size: 0px;
															text-align: left;
															direction: ltr;
															display: inline-block;
															vertical-align: top;
															width: 100%;
														"
													>
														<table
															border="0"
															cellpadding="0"
															cellspacing="0"
															role="presentation"
															width="100%"
														>
															<tbody>
																<tr>
																	<td
																		style="
																			vertical-align: top;
																			padding: 0px;
																			padding-top: 40px;
																			padding-bottom: 40px;
																		"
																	>
																		<table
																			border="0"
																			cellpadding="0"
																			cellspacing="0"
																			role="presentation"
																			style=""
																			width="100%"
																		>
																			<tbody>
																				<tr>
																					<td
																						align="left"
																						class="lg-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 24px;
																							padding-left: 8px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 16px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								text-transform: uppercase;
																								color: #111111;
																							"
																						>
																							exchange rate
																						</div>
																					</td>
																				</tr>

																				<tr>
																					<td
																						align="left"
																						class="sm-hidden"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							padding-bottom: 24px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 16px;
																								font-weight: 900;
																								line-height: 115%;
																								text-align: left;
																								text-transform: uppercase;
																								color: #111111;
																							"
																						>
																							exchange rate
																						</div>
																					</td>
																				</tr>

																			

																				<tr>
																					<td
																						align="left"
																						style="
																							font-size: 0px;
																							padding: 0px;
																							word-break: break-word;
																						"
																					>
																						<div
																							style="
																								font-family: 'Albert Sans',
																									-apple-system,
																									BlinkMacSystemFont, 'Segoe UI',
																									Roboto, sans-serif;
																								font-size: 18px;
																								font-weight: 500;
																								line-height: 155%;
																								text-align: center;
																								color: #111111;
																							"
																						>
																							EUR to CNY: ${exchangeRate}
																							
																			
																						</div>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>

													<!--[if mso | IE]></td></tr></table><![endif]-->
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
<!-- END OF EXCHANGE RATE -->
`;
	return exchangeRateContainer;
}

export {
	emailSkeleton,
	emailTitle,
	menuLoader,
	blankSpace,
	exchangeRateLoader,
	menuJumpLink,
	footer,
};
