Feature: Itch.io Game Search and Purchase

  Background:
    Given I am on the main page

  Scenario: Game search validation
    When I type "Tennis World Tour" in the search field
    And I click the search button
    Then The header contains the search query
    And The 1 game name matches with search query
    And The 1 game Author is "Plug In Digital"
    And The 1 game Genre is "Sports"

    When I open the 1 game from the search results
    And I expand the More information section in the game page
    Then The "Author" matches with those from the search results
    And The "Genre" matches with those from the search results

    When I return to the previous page using browser navigation
    Then The 1 game should match the initial search result

  Scenario: Game price validation
    When I type "Tennis World Tour" in the search field
    And I click the search button
    Then The 1 game name matches with search query

    When I open the 1 game from the search results
    Then The game price matches with the price shown on the search results page

    When I click the Buy button
    Then The game price matches with the price shown on the game page
    And The same price should be inserted in the price text field

    When I click "$5.00" button to support the developers
    Then The price field increases accordingly