## Version 1.7.1 - 2020-11-30

### Bug Fixes
* Fixes 'Mask & Search' button for precomputed images used as a search input.

## Version 1.7.0 - 2020-11-10

### Data Alert
* Due to the large changes made to the alignment and search framework we have had to delete the results of any custom searches run before Nov 10th 2020. We apologise for any inconvenience this may cause.

### Whats New
* Image Alignment
  - After you upload an image you will be asked if the image has been aligned already. If it has not you can access the alignment parameters form and start an alignment by unselecting the checkbox.
  - Alignments can take a while, but the page will update as soon as it has finished. From there you can select a channel, mask it for your region of interest and search our image libraries.
* Mask Selection
  - Once an uploaded image has been aligned you can use the mask selection page to draw around the region of interest and set a number of search parameters.
* Searching
  - Once a search has completed you can perform another one from the same upload, by using the "re-select mask" button on the upload page.
  - Clicking on a result thumbnail for one of the matches will show the image comparison pop up. From here you can now mask and search either the input or the match by clicking on the "Mask & Search" button.
  - The "View Precomputed Search" button under the matched image will take you to our precomputed search results for that image.
* Documentation
  - Additional documentation on alignment of uploaded files.
  - Additional documentation on the match precompute algorithm.

## Version 1.6.2 - 2020-10-08

### Bug Fixes
* Adds missing matched pixels score to the Image comparison pop ups in the results. Replaced the "Score" attribute of the result with "Normalized Score" and "Matched Pixel" values.

---
## Version 1.6.1 - 2020-09-23

### Bug Fixes
* Fixes links to the FlyLight Generation 1 MCFO website.

---
## Version 1.6.0 - 2020-09-22

### Whats New
* Color Depth MIP Search for your own imagery.
  - Leveraging the power of AWS Lambda functions, you can now upload your own image and then use it to search for matches in our public datasets.
  - Start by clicking on the [Upload](https://neuronbridge.janelia.org/upload) link in the navigation bar at the top of the site.
* "Mirror Mask" button added to the input/match comparison page.
* Added "Matching Pixels" and "Library" columns to the results export. Columns are now:

  ##### EM

  | Number | Body Id | Score | Matched Pixels | Library |

  ##### LM

  | Number | Line Name | Score | Matched Pixels | Library | Slide Code |

---
## Version 1.5.6 - 2020-09-14

### Bug Fixes
* Gets correct data for the Slide Code and Published Name when exporting the matches to a CSV file.
* Sets the correct header, either 'Body Id' or 'Line Name' when exporting EM or LM results. The new column headers are now:

  ##### EM

  | Number | Body Id | Score |

  ##### LM

  | Number | Line Name | Score | Slide Code |

---
## Version 1.5.5 - 2020-09-14

### Whats New
* Added a download button to the Matches list. This will generate a .csv file with the following columns:

  | Number | Line Name | Score | Slide Code

### Bug Fixes
* Spacing around the link in the match summary has been reduced.

---
## Version 1.5.4 - 2020-09-11

### Whats New
* Matches can now be sorted by either 'Normalized Score' or 'Matched Pixels'.
  - To access the sorting options. Click on the 'Filters/Sorting' button at the top of the matches grid.
* A new tutorial video has been added to the top of the [help page](https://neuronbridge.janelia.org/help)
* Links to [Virtual Fly Brain](http://virtualflybrain.org) have been added for each match.
  - Clicking on an individual match will display a modal with more details of that match. The last section is external links where we link out to [Neuprint](https://neuprint.janelia.org/), one of our Flylight data release websites or Virtual Fly Brain.

