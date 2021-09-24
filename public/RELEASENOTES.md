## Version 2.0.0 - 2021-09-

### What's New

- ### PatchPerPixMatch Results
  - We have added PatchPerPixMatch results for ~30,000 hemibrain body IDs. These can be viewed
    by searching for a body id of interest and clicking on the "PatchPerPixMatch Results" button.
  - Matches are sorted by rank with one result per line displayed by default. Additional matches
    for each line can be viewed by increasing the number in the "Results per line" filter in the
    "Filters/Sorting" section.
  - For more information on the PPPM results, please see:  
    Lisa Mais, Peter Hirsch, Claire Managan, Kaiyu Wang, Konrad Rokicki, Robert R. Svirskas, Barry J. Dickson, Wyatt Korff, Gerald M. Rubin, Gudrun Ihrke, Geoffrey W. Meissner, Dagmar Kainmueller:  
    PatchPerPixMatch for Automated 3d Search of Neuronal Morphologies in Light Microscopy. bioRxiv. 2021: 2021.07.23.453511. DOI: [10.1101/2021.07.23.453511](https://doi.org/10.1101/2021.07.23.453511)
- ### The Download button on the Matches page is now a menu.
  - The option to download a collection of the images has been added.
  - It is not currently possible to download more than 200 images at a time, but you can
    select the images that you are interested in with their associated checkbox.
  - The csv download has also been modified to use the checkboxes to limit the information
    that is downloaded.
- ### Alignment parameters added to custom search results.
  - If an alignment was performed on the uploaded image, the parameters selected can be viewed
    with the match summary. A red asterisk is appended to each parameter that was changed from
    the site default.
- ### Id / Name filter added to the matches Filters / Sorting menu.
  - Typing a string into the input will perform a case insensitive filter of the results. This
    is an include filter, meaning if the name or id contains the string anywhere within, it will match.
- ### Link to neuronbridger on the help page.
  - If you are an R developer, check out neuronbridger in our tools section of the [help page](/help).
- ### Added option to see more than just two images in image comparison modal.
  - With the addition of the PPPM results, we have expanded the number of images that can be compared in the image comparison modal.
    For PPPM results, up to 6 images can be compared at the same time. This number is configurable, for the cases where you might want
    to focus on only one or two images at a time.
- ### "View Precomputed Search" button moved to links section.
- ### Image actions on the comparison page; download, flip, etc. moved into menu above each image.
  - The increased number of actions & images has lead to the action buttons being placed in a
    dropdown menu above each image in the comparison page.
- ### Sharing the url of a match summary modal will allow others to see the same page.
  - Your selections and choices in the match modal are now stored in the url and can be shared with others. For example:
    [https://neuronbridge.janelia.org/search/skeletons/1537331894/matches/2820604126944034827?m=3&ci=1&ic=112](https://neuronbridge.janelia.org/search/skeletons/1537331894/matches/2820604126944034827?m=3&ci=1&ic=112) will show the gamma corrected color depth MIP for EM body 1537331894.

### Bug Fixes

- Fixed the "mask & Search" button
  - The wrong data was sent to the mask & search backend, resulting in a failure to set up a new search.
- Prevented a lot of failure states, when data fails to load from the server.
- Custom search
  - A few behind the scenes fixes meant that any custom searches performed before the 2.0.0 release of the
    site need to be migrated. If you are affected by this, you will see a "Migrate Data" button on the
    [upload page](/upload).

## Version 1.7.4 - 2021-08-03

### What's New

- Alignment file format limitations
  - Added a note on the upload page to show which file formats are supported by the alignment pipeline.

## Version 1.7.3 - 2021-06-01

### Bug Fixes

- Fixes copyright date and a few typos.

## Version 1.7.2 - 2020-12-07

### What's New

- Site survey
  - Added a link to the site feedback survey

### Bug Fixes

- Development & release fixes, no user facing changes.

## Version 1.7.1 - 2020-11-30

### Bug Fixes

- Fixes 'Mask & Search' button for precomputed images used as a search input.

## Version 1.7.0 - 2020-11-10

### Data Alert

- Due to the large changes made to the alignment and search framework we have had to delete the results of any custom searches run before Nov 10th 2020. We apologise for any inconvenience this may cause.

### What's New

- Image Alignment
  - After you upload an image you will be asked if the image has been aligned already. If it has not you can access the alignment parameters form and start an alignment by unselecting the checkbox.
  - Alignments can take a while, but the page will update as soon as it has finished. From there you can select a channel, mask it for your region of interest and search our image libraries.
- Mask Selection
  - Once an uploaded image has been aligned you can use the mask selection page to draw around the region of interest and set a number of search parameters.
- Searching
  - Once a search has completed you can perform another one from the same upload, by using the "re-select mask" button on the upload page.
  - Clicking on a result thumbnail for one of the matches will show the image comparison pop up. From here you can now mask and search either the input or the match by clicking on the "Mask & Search" button.
  - The "View Precomputed Search" button under the matched image will take you to our precomputed search results for that image.
- Documentation
  - Additional documentation on alignment of uploaded files.
  - Additional documentation on the match precompute algorithm.

## Version 1.6.2 - 2020-10-08

### Bug Fixes

- Adds missing matched pixels score to the Image comparison pop ups in the results. Replaced the "Score" attribute of the result with "Normalized Score" and "Matched Pixel" values.

---

## Version 1.6.1 - 2020-09-23

### Bug Fixes

- Fixes links to the FlyLight Generation 1 MCFO website.

---

## Version 1.6.0 - 2020-09-22

### What's New

- Color Depth MIP Search for your own imagery.
  - Leveraging the power of AWS Lambda functions, you can now upload your own image and then use it to search for matches in our public datasets.
  - Start by clicking on the [Upload](https://neuronbridge.janelia.org/upload) link in the navigation bar at the top of the site.
- "Mirror Mask" button added to the input/match comparison page.
- Added "Matching Pixels" and "Library" columns to the results export. Columns are now:

  ##### EM

  | Number | Body Id | Score | Matched Pixels | Library |

  ##### LM

  | Number | Line Name | Score | Matched Pixels | Library | Slide Code |

---

## Version 1.5.6 - 2020-09-14

### Bug Fixes

- Gets correct data for the Slide Code and Published Name when exporting the matches to a CSV file.
- Sets the correct header, either 'Body Id' or 'Line Name' when exporting EM or LM results. The new column headers are now:

  ##### EM

  | Number | Body Id | Score |

  ##### LM

  | Number | Line Name | Score | Slide Code |

---

## Version 1.5.5 - 2020-09-14

### What's New

- Added a download button to the Matches list. This will generate a .csv file with the following columns:

  | Number | Line Name | Score | Slide Code

### Bug Fixes

- Spacing around the link in the match summary has been reduced.

---

## Version 1.5.4 - 2020-09-11

### What's New

- Matches can now be sorted by either 'Normalized Score' or 'Matched Pixels'.
  - To access the sorting options. Click on the 'Filters/Sorting' button at the top of the matches grid.
- A new tutorial video has been added to the top of the [help page](https://neuronbridge.janelia.org/help)
- Links to [Virtual Fly Brain](http://virtualflybrain.org) have been added for each match.
  - Clicking on an individual match will display a modal with more details of that match. The last section is external links where we link out to [Neuprint](https://neuprint.janelia.org/), one of our Flylight data release websites or Virtual Fly Brain.
