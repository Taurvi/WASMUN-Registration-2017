'use strict';
RegistrationModule = angular.module('RegistrationModule');
RegistrationModule.controller('AdminController', ['mySocket', '$scope', function(mySocket, $scope) {
    var askForData = function() {
        $("#info").html('<div class="text-center"><i class="fa fa-5x fa-fw fa-refresh fa-spin"></i></div>')
            .promise()
            .done(function() {
                mySocket.emit('requestData');
            });
    };

    $("#data-btn").on("click", askForData)
        .mouseup(function(){
            $(this).blur();
        });

    mySocket.on('getData', function(data) {
        $("#info").html("");

        $.each(data, function(index, element) {
            var row = $('<div></div>').addClass("row");
            var col = $('<div></div>').addClass('registration col-xs-12 col-sm-10 col-md-6 col-lg-8 col-centered');
            var table = $('<table></table>').addClass('table table-responsive table-striped');
            $('#info').append(row);
            row.append(col.append(table));

            var schoolInfo = element["_schoolInfo"];
            var register = $('<thead></thead>');
            var registerRow = $('<tr></tr>');
            var name = $('<th scope="row"></th>').text(schoolInfo["_name"]);
            var date = $('<td></td>').text((new Date(element['date'])).toString());
            register.append(registerRow.append(name, date));

            var body = $('<tbody></tbody>');
            var schoolRow = $('<tr></tr>');
            var schoolHead = $('<td scope="row"></td>').text("Address");
            var schoolCell = $('<td></td>').text(schoolInfo["_address"]);
            body.append(schoolRow.append(schoolHead, schoolCell));

            var delegationContacts = element["_delegationContacts"];
            var advisor = delegationContacts["_advisor"];
            var advisorRow = $('<tr></tr>');
            var advisorHead = $('<td scope="row"></td>').text("Advisor");
            var advisorCell = $('<td></td>').html(advisor['_name'] + "<br>" + advisor['_email'] + "<br>" + advisor['_phone']);
            body.append(advisorRow.append(advisorHead, advisorCell));

            var headDelegates = delegationContacts["_headDelegates"];
            for (var i = 0; i < headDelegates.length; i++) {
                var headDel = headDelegates[i];
                var delRow = $('<tr></tr>');
                var delHead = $('<td scope="row"></td>').text("Head Delegate " + (i+1));
                var delCell = $('<td></td>').html(headDel['_name'] + "<br>" + headDel['_email'] + "<br>" + headDel['_phone']);
                body.append(delRow.append(delHead, delCell));
            }

            var countrySelect = element["_countrySelection"];
            if (countrySelect) {
                var selections = countrySelect['_selections'];
                var countryRow = $('<tr></tr>');
                var countryHead = $('<td scope="row"></td>').text("Country Selections");
                var countryCell = $('<td></td>');
                var countryDiv = $('<div></div>').addClass('country');

                var html = "";
                for (var j = 0; j < selections.length; j++) {
                    var committees = selections[j]['_committees'];
                    html += "<h5>" + selections[j]['_name'] + "<br><small>" + committees[0];
                    for (var k = 1; k < committees.length; k++) {
                        html += " | " + committees[k];
                    }
                    html += "</small></h5><hr>";
                }
                countryDiv.html(html);
                body.append(countryRow.append(countryHead, countryCell.append(countryDiv)));
            }

            var sizeRow = $('<tr></tr>');
            var sizeHead = $('<td scope="row"></td>').text("Delegation Size");
            var sizeCell = $('<td></td>').html(element["_delegationInfo"]["_size"]);
            body.append(sizeRow.append(sizeHead, sizeCell));

            table.append(register).append(body).append($("<br><br>"));

        });
    });

    askForData();

}]);