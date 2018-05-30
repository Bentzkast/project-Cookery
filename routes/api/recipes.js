const express = require('express');
const router = express.Router();

const Recipe = require('../../models/Recipe');

const passport = require('passport');
const validateRecipeInput = require('../../validation/recipe');
const validateCommentInput = require('../../validation/comment');

// @route   GET api/recipes
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => res.json({ posts: 'posts works' }));

// @route   POST api/recipes
// @desc    Test posts route
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const body = req.body;
    const newRecipe = {
      user: req.user.id,
      createdBy: req.user.username,
      creatorPicture: req.user.picture,
      title: body.title,
      ingredients: body.ingredients,
      directions: body.directions
    };
    if (body.tags) newRecipe.tags = body.tags;
    if (body.taste) newRecipe.taste = body.taste;
    if (body.tips) newRecipe.tips = body.tips;
    if (Array.isArray(body.nutritions)) newRecipe.nutritions = body.nutritions;

    new Recipe(newRecipe)
      .save()
      .then(recipe => res.json(recipe))
      .catch(err => {
        console.log(err);
        return res.status(500).end();
      });
  }
);

// @route   GET api/recipes
// @desc    get all recipe
// @access  Public

router.get('/', (req, res) => {
  Recipe.find()
    .sort({ posted: -1 })
    .then(recipes => {
      if (!recipes) {
        return res.status(404).json({ recipes: 'no recipes found' });
      }
      return res.json(recipes);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).end();
    });
});

// @route   GET api/recipes/:od
// @desc    get recipe by id
// @access  Public

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      if (!recipe)
        return res.status(404).json({ recipe: 'no such recipe found' });
      return res.json(recipe);
    })
    .catch(err => {
      console.log(err);
      return res.status(404).json({ recipe: 'no such recipe found' });
    });
});

// @route   DELETE api/recipes/:id
// @desc    delete recipe by id
// @access  Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe)
          return res.status(404).json({ recipe: 'no such recipe found' });
        if (recipe.user.id.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'user not authorized' });
        }
        recipe.remove().then(() => res.json({ success: 'true' }));
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ recipe: 'no such recipe found' });
      });
  }
);

// @route   POSR api/recipes/like/:id
// @desc    Like a recipe with user id
// @access  Private

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (
          recipe.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ like: 'User already liked this post' });
        }
        recipe.likes.unshift({ user: req.user.id });
        recipe
          .save()
          .then(recipe => res.json(recipe))
          .catch(err => {
            console.log(err);
            return res.status(500).end();
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ recipe: 'No such recipe found' });
      });
  }
);

// @route   DELETE api/recipes/like/:id
// @desc    Unlike a recipe with user id
// @access  Private

router.delete(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe)
          return res.status(404).json({ recipe: 'No such recipe found' });
        const index = recipe.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);
        if (index === -1) {
          return res
            .status(400)
            .json({ notlike: 'User have not liked this post' });
        }
        if (likes[index].user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'user not authorized' });
        }
        recipe.likes.splice(index, 1);

        recipe
          .save()
          .then(recipe => res.json(recipe))
          .catch(err => {
            console.log(err);
            return res.status(500).end();
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ recipe: 'No such recipe found' });
      });
  }
);

// @route   POST api/recipes/:id
// @desc    Like a recipe with user id
// @access  Private

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe)
          return res.status(404).json({ recipe: 'No such recipe found' });

        const newCommment = {
          user: req.user.id,
          text: req.body.text,
          username: req.user.username,
          picture: req.user.picture
        };
        recipe.comments.unshift(newCommment);
        recipe
          .save()
          .then(recipe => res.json(recipe))
          .catch(err => {
            console.log(err);
            return res.status(500).end();
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ recipe: 'No such recipe found' });
      });
  }
);

// @route   DELETE api/recipes/comment/:id/:commentId
// @desc    delete a comment with its id
// @access  Private

router.delete(
  '/comment/:id/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.params.commentId);
    Recipe.findById(req.params.id)
      .then(recipe => {
        if (!recipe)
          return res.status(404).json({ recipe: 'No such recipe found' });
        const index = recipe.comments
          .map(comment => comment.id.toString())
          .indexOf(req.params.commentId);
        if (index === -1) {
          return res.status(400).json({ comment: 'there no such comment' });
        }
        if (recipe.comments[index].user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: 'user not authorized' });
        }

        recipe.comments.splice(index, 1);

        recipe
          .save()
          .then(recipe => res.json(recipe))
          .catch(err => {
            console.log(err);
            return res.status(500).end();
          });
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ recipe: 'No such recipe found' });
      });
  }
);

module.exports = router;
