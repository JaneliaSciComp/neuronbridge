## VERSION 3.1.0

### Bug fixes

- ### Standardized various terminology like "neuron ID" and "driver line" across the site

## VERSION 3.0.0 - 2022-12-08

#### [Source](https://github.com/JaneliaSciComp/neuronbridge/releases/tag/v3.0.0)

### What's New

- ### Data model 3.0

  - see our [data release notes](/releasenotes/DATA)

- ### Anatomical Area filtering of search results

  - A new "Filter" button has been added above the right side of the search results list. This button will allow the filtering of different anatomical areas from the results. The filtering will remain as selected even after a reload of the site.

- ### Gen1-GAL4 expression images displayed where available

  - Any time we have a Gen1-GAL4 expression image available for a match, the image will be added to the match details page as an additional comparison.

- ### Alignment Score and Quality Check Movie added to custom search results

  - The alignment score value has been added below the alignment thumbnail. This score can range from -1.0 to +1.0, with the higher value indicating a better alignment. In addition to the score there is also a link to an movie file that shows a "slice view" of the alignment that can be used to do a visual quality check.

- ### Uploaded Data Usage and Retention Policy

  - We have added an uploaded data usage and retention policy document to the site that must be read and acknowledged before continued use of the custom search feature.

- ### Help Page Table of contents

  - We added a table of contents to quickly get you to the information you are looking for.

- ### URLs to the matches page have been simplified

  - The input type is no longer required in the URL to access a match. Old URLs will redirect to the new format. eg:
    - /search/skeletons/1077847238/matches/2945073140338782219
    - /matches/cdm/2945073140338782219

- ### Fast algorithm switching on matches page

  - There is now a tab menu at the top of results pages when both CDM and PPPM results are available for an input image. This allows one to quickly switch between the results without having to return to the previous search results page.

- ### "Cite this match" tab added to individual match modals

  - This tab shows references for the input and matching images.

- ### Github link

  - View the source code for NeuronBridge by following the link to github in the site footer.

### Bug fixes

- ### Search results sorting for EM results

  - In order to show the most recent data first, the sorting of the EM search results is done by:
    - ascending dataset name
    - ascending bodyid
    - descending version number

- ### Mirror/Unmirror Button moved for VNC imagery

  - The mirror button was causing the vertical VNC images to be out of alignment when the image was mirrored, because the button was too wide to fit on the same row as the image selection drop down. To keep all the images aligned, the mirror buttons have been permanently moved to a second row when the images are narrow and vertical.

- ### Viewin3D button is disabled if required files are missing

  - There are some matches that do not have the required h5j or swc files used by our 3D volume viewer. When those cases arise, the Viewin3D will be disabled.

- ### Button text changes on the list view for matches

  - When using the list view instead of the grid view for a match set, the buttons have been changed from "Download" to "Add to Download" and from "Select" to "View Match". These new labels better define what the buttons do.

- ### Removed alignment parameters for VNC uploads

  - The current alignment algorithm does not allow parameters for VNC images yet.

- ### Downloads limit pop up is no longer covered by the option menu

- ### Error message and result

  - Fixed a case where the search page could show both a result display and an error message after a failed search was followed by a successful one.

- ### Disabled image export when matches list is empty

  - The image export link will no longer download an empty file if the matches list is empty.

- ### Fixed links to match modal tabs

  - It is now possible to link to the downloadi or citations tab for a match, eg:
    - <https://neuronbridge.janelia.org/matches/cdm/2988247192221823107/download?m=2>

- ### Only display link to CDSResults if they exist

  - Prior to this all lines would show a link to CDS Results, even if there were none to show.

- ### Changed "View Precomputed Search" buttons to "View Precomputed Matches"

  - These buttons were found in the meta data for an input image or a match. The would originally link to search results for the name of the line or EM body. Now they link directly to the matches, so one no longer has to search through a list of lines to find the correct one.

## VERSION 2.6.0 - 2022-06-30

#### [Source](https://github.com/JaneliaSciComp/neuronbridge/releases/tag/v2.6.0)

### What's New

- ### Added Gender Icons to the match grid

  - All the thumbnail images in the match grid now have a (M/F) icon in the bottom left corner to indicate the gender of the matched body id or line.

- ### Gender filter

  - The Filters / Sorting menu now has a section to filter the results by gender.

### Bug fixes

- ### Virtual Fly Brain links

  - The links to the Virtual Fly Brain website were broken when using a slide code as an identifier

## VERSION 2.5.0 - 2022-06-23

#### [Source](https://github.com/JaneliaSciComp/neuronbridge/releases/tag/v2.5.0)

### What's New

- ### In browser 3D volume viewer

  - We have added a link to our browser based volume viewer [neuronbridge-vol-viewer.janelia.org](https://neuronbridge-vol-viewer.janelia.org). The ["View in 3D"](/search/lines/MB543B/matches/2711777703895236619?m=2&ci=3&ic=021) button can now be found on the CDM summary tab of a match, just above the image comparison. This button will load the image viewer and pre-populate it with the volumes of the current match. We also included the button in the "Download 3D Files" tab, for convenience.

### Bug fixes

- ### Incorrect default image mirroring

  - In release 2.3.0 we added default mirroring to the image comparison modal, if the mirror match was superior. The mirroring algorithm didn't take into account the input image and mirrored all the images, including the EM - Matched CDM. This image should not be mirrored by default and this has been corrected in this release.

## VERSION 2.4.0 - 2022-03-28

#### [Source](https://github.com/JaneliaSciComp/neuronbridge/releases/tag/v2.4.0)

### What's New

- ### Download 3D files

  - We have added a "Download 3D Files" tab to the image comparison modal. On this tab you can download the EM Skeleton in SWC format and the LM image stack in H5J format. The tab also includes instructions for downloading and installing VVD viewer, our recommended software for viewing the 3D files.

- ### More metadata has been added to the matches export feature

  - For LM matches, we have added Channel, Magnification, Gender, Alignment Space, Mounting Protocol, and Anatomical Area information.
  - For EM matches, we have added Gender, Alignment Space, Anatomical Area, Neuron Type and Neuron Instance information.

- ### Added twitter icon and link to site footer

  - Follow our [twitter account](https://twitter.com/NeuronBridge) for data and feature release announcements.

### Bug fixes

- ### Image mirroring button is no longer in a dropdown menu

  - In release 2.3.0 we added default mirroring to the image comparison modal, if the mirror match was superior. However, there was no indicator when mirroring was turned on for an image. To fix this we have moved the "Mirror" button out of the dropdown menu associated with each image and placed it next to the image type dropdown. This will make it more obvious when an image has been mirrored by default.

## VERSION 2.3.1 - 2022-03-10

#### [Source](https://github.com/JaneliaSciComp/neuronbridge/releases/tag/v2.3.1)

### What's New

- ### Added fileType information to File Upload Step of a custom search

  - This summary text on the neuronbridge.janelia.org/upload page shows either '2D CDM' or '3D stack' to indicate which type of file was uploaded to initiate the search / alignment.

- ### Added search duration to color depth search step of a custom search

  - Provides a quick indication as to the duration of the CDM search step. This does not include the duration of the alignment.

- ### Placed segmented image before default image match

  - The Segmented or Generated images in the list of images for comparison have been moved to the second item in the list and will now be show before the original CDM imagery.

- ### Added confirmation for deleting a search

  - The delete icon in the "Your Searches" list now asks for confirmation before removing the search result.

### Bug fixes

- ### Fixed download issues in safari browser

  - The Download action for images in the image comparison list was not working correctly in the safari browser.

- ### Fixed download name for custom search uploads

  - The custom search upload file was incorrectly named when downloaded. This fixes the name and file extension, so that it can be opened correctly.

- ### Improved error message when submitting too many alignments

  - The previous error message simply stated that there was an error with the backend servers. The updated error message now indicates that the maximum number of concurrent searches has been reached if that is the case.

- ### Added 'Search' to mask selection step title

  - The "Mask Selection" step on the "Your Searches" list has been renamed to "Search Mask Selection".

## VERSION 2.3.0 - 2022-02-23

### What's New

- ### Images in the image comparison modal are now displayed mirrored by default, if the mirror match was superior

  - When CDM searches are precomputed, they are searched against both the input image and a mirrored copy of that input image. This is also the default when uploading an image, but can be turned off by unselecting the 'mirror mask' option when selecting the search parameters. If the result shown was a match against the mirrored input, then
    the match images will be flipped to make comparisons between them easier. The image can be reverted to the other orientation by clicking on the action
    button just above it, to the right of the image name.

- ### Added a "View in 3D" tab to each result summary modal

  - This provides links to the VVD viewer, instructions on how to use it and links to the 3D files for the match and mask images.

### Bug fixes

- ### The PPPM images on the matches screen are now using smaller "thumbnail" images

  - This should help with load times on slower connections.

## VERSION 2.2.1 - 2022-02-01

### What's New

- ### Added additional inline help when an alignment job fails

- ### Added mailing list preferences, which can be accessed at [https://neuronbridge.janelia.org/account](https://neuronbridge.janelia.org/account)

## VERSION 2.2.0 - 2022-01-20

### What's New

- ### Added expected image dimensions to the search upload form. This should people figure out the size of the image they should be using in a search

### Bug fixes

- ### There were some cases where the displayed images would break out of their modal windows on small screens

- ### The "Tell us more about your image" form now uses a radio button to indicate if the uploaded image is already aligned

## VERSION 2.1.3 - 2022-01-11

### Bug fixes

- ### Backend fixes to improve site configuration and deployment

## VERSION 2.1.2 - 2022-01-07

### What's New

- ### Added a link to the help forum in the site footer

### Bug fixes

- ### A link to the MIP data README on open.quiltdata.com was added to the help page

## Version 2.1.1 - 2021-12-14

### Bug fixes

- ### Links to flylight websites now use slide codes instead of line name

  - This should make it easier to identify the images of interest on the flylight website.

## Version 2.1.0 - 2021-12-13

### What's New

- ### Added a download button on mask selection

  - This allows people to download the channels after alignment, but before
    they have been masked and searched.

- ### Added an announcements archive page

  - All past announcements that have been made on the site will now be shown
    in an archive, that can be reached from a link in the site footer.

- ### New button to collapse Match meta information

  - The button removes almost all of the match meta information from the
    modal pop up when looking at individual matches. The data remains hidden
    until the button is used to toggle the data back on.

- ### Custom contextMenu for comparison images

  - This replaces the default browser contextMenu when right clicking on images
    in the image comparison modal. The custom menu provides the same options as the
    actions button above the image.

- ### Account Preferences page

  - Clicking on your username at the top right of the page will access the account page,
    which lists communication preferences and provides an option to reset the site to
    its' default state.

- ### Adds support for future VNC release

### Bug Fixes

- ### External links to neuPrint have been fixed

  - ensuring the correct dataset is loaded

- ### Renamed 'View EM Matches' & 'View Color Depth MIP Results' buttons

  - These have been renamed to 'Color Depth Search Results' to provide a
    more consistent user interface.

- ### Added reference to the PatchPerPixMatch algorithm

- ### Internal pppRanks replaced with whole number values

  - The internal pppRanks were intended for use only within the algorithm
    and did not match the values used in the publication pdf.

- ### Removed "Mask & Search" option from PPPM images

  - These images can not be reliably searched with the CDM algorithm, so
    the option to do so has been removed.

- ### Image loading updated to use placeholders

  - The placeholders will prevent the page from jumping around as content
    is replaced or reloaded.

- ### Adds "Flip" to the PatchPerPixMatch Images

  - The images can now be flipped around the y axis.

- ### Various behind the scenes fixes to improve DX & UX

## Version 2.0.0 - 2021-09-30

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

- ### The Download button on the Matches page is now a menu

  - The option to download a collection of the images has been added.
  - It is not currently possible to download more than 200 images at a time, but you can
    select the images that you are interested in with their associated checkbox.
  - The csv download has also been modified to use the checkboxes to limit the information
    that is downloaded.

- ### Alignment parameters added to custom search results

  - If an alignment was performed on the uploaded image, the parameters selected can be viewed
    with the match summary. A red asterisk is appended to each parameter that was changed from
    the site default.

- ### Id / Name filter added to the matches Filters / Sorting menu

  - Typing a string into the input will perform a case insensitive filter of the results. This
    is an include filter, meaning if the name or id contains the string anywhere within, it will match.

- ### Link to neuronbridger on the help page

  - If you are an R developer, check out neuronbridger in our tools section of the [help page](/help).

- ### Added option to see more than just two images in image comparison modal

  - With the addition of the PPPM results, we have expanded the number of images that can be compared in the image comparison modal.
    For PPPM results, up to 6 images can be compared at the same time. This number is configurable, for the cases where you might want
    to focus on only one or two images at a time.

- ### "View Precomputed Search" button moved to links section

- ### Image actions on the comparison page; download, flip, etc. moved into menu above each image

  - The increased number of actions & images has lead to the action buttons being placed in a
    dropdown menu above each image in the comparison page.

- ### Sharing the url of a match summary modal will allow others to see the same page

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
