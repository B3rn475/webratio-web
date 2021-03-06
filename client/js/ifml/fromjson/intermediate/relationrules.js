// Copyright (c) 2018, the IFMLEdit.org project authors. Please see the
// AUTHORS file for details. All rights reserved. Use of this source code is
// governed by the MIT license that can be found in the LICENSE file.
/*jslint node: true, nomen: true */
"use strict";

var almost = require('almost'),
    createRule = almost.createRule;

module.exports = [
    createRule(
        function (relation, model) {
            return model.isHierarchicalRelation(relation);
        },
        function (relation) {
            return {
                elements: [{
                    id: relation.child,
                    parent: relation.parent
                }, {
                    id: relation.parent,
                    embeds: relation.child
                }]
            };
        }
    ),
    createRule(
        function (relation, model) {
            return model.isSourceRelation(relation);
        },
        function (relation) {
            return {
                elements: [{
                    id: relation.flow,
                    parent: relation.source,
                    source: {
                        id: relation.source
                    }
                }, {
                    id: relation.source,
                    embeds: relation.flow
                }]
            };
        }
    ),
    createRule(
        function (relation, model) {
            return model.isTargetRelation(relation);
        },
        function (relation) {
            return {
                elements: {
                    id: relation.flow,
                    target: {
                        id: relation.target
                    }
                }
            };
        }
    )
];
